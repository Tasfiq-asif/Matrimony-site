const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const port = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174','https://matchmaker-36ccf.web.app'],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.onhj8vc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const biodataCollection = client.db('matchmaker').collection('biodatas');
    const usersCollection = client.db('matchmaker').collection('users');
    const favouriteCollection = client.db('matchmaker').collection('favourites');
    const ContactReqCollection = client.db('matchmaker').collection('contact_requests');
    const PaymentCollection = client.db('matchmaker').collection('payments');
    

async function generateBiodataId(req, res, next) {
    try {
        const lastBiodata = await biodataCollection.findOne({}, { sort: { biodataId: -1 } });
        const newBiodataId = (lastBiodata && lastBiodata.biodataId !== undefined) ? lastBiodata.biodataId + 1 : 1;

        req.body.biodataId = newBiodataId;
        next();
    } catch (error) {
        console.error("Error generating biodata ID:", error);
        res.status(500).send("Error generating biodata ID");
    }
}

    

    // Middleware to check if user already has a biodata
    async function checkExistingBioData(req, res, next) {
      try {
        const existingBiodata = await biodataCollection.findOne({ email: req.body.email });
        if (existingBiodata) {
          return res.status(400).json({ message: 'Biodata already exists. Please edit your existing biodata.' });
        }
        next();
      } catch (error) {
        console.error("Error checking existing biodata:", error);
        res.status(500).send("Error checking existing biodata");
      }
    }

    //verify token middleware
    const verifyToken = async (req, res, next) => {
      const token = req.cookies?.token
      console.log(token)
      if(!token){
        return res.status(401).send({mesage:'unauthorised access'})
      }
      jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
        if(err){
          console.log(err)
          return res.status(401).send({ message: 'unauthorized access' })
        }
        req.user = decoded
        next()
      })
    }

    //verify admin middleware

    const verifyAdmin = async (req, res,next) => {
      const user = req.user
      const query = {email:user?.email}
      const result = await usersCollection.findOne(query)
      if (!result || result?.role !== 'admin')
        return res.status(401).send({ message: 'unauthorized access!!' })

      next()

    }


    // User-related APIs
    // Save user data in db
    app.put('/user', async (req, res) => {
      const user = req.body;
      // Check if user is already present
      const query = { email: user?.email };

      const isExists = await usersCollection.findOne(query);
      if (isExists) {
        return res.send(isExists);
      }

      const option = { upsert: true };
      const updateDoc = {
        $set: {
          ...user,
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc, option);
      res.send(result);
    });

    // Get all user data
    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // Get user info by email
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      res.send(result);
    });

    // Auth-related APIs
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '365d',
      });
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
    });

    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true });
        console.log('Logout successful');
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Biodata-related APIs
    // Save a biodata in the database
    app.post('/biodata', generateBiodataId, async (req, res) => {
      const biodata = req.body;
      console.log("Biodata to be inserted:", biodata); // Debugging statement
      try {
        const result = await biodataCollection.insertOne(biodata);
        res.send(result);
      } catch (error) {
        console.error("Error creating biodata:", error);
        res.status(500).send("Error creating biodata");
      }
    });

    //Get all bioDatas
     app.get('/biodatas', async (req, res) => {
      const biodatas = req.body
      const result = await biodataCollection.find().toArray();
      res.send(result);
     })

    // Get my-biodata
    app.get('/my-biodata/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await biodataCollection.find(query).toArray();
      res.send(result);
    });

    // Get biodata using _Id

    app.get('/biodata/:id', async (req, res)=>{
      const id = req.params.id;
      const query = { _id : new ObjectId(id)}
      const result = await biodataCollection.findOne(query);
      res.send(result);
    })

    // Update my-biodata
    app.patch('/biodata/:email', async (req, res) => {
      const email = req.params.email;
      const biodata = req.body;
      try {
        const result = await biodataCollection.updateOne(
          { "userData.email": email },
          { $set: { ...biodata } }
        );
        res.send(result);
      } catch (error) {
        console.error("Error updating biodata:", error);
        res.status(500).send("Error updating biodata");
      }
    });

    //Role change APIs
    //changing rol

    app.patch('/userrole/:email',async (req, res) => {
      const email = req.params.email;
      const role=req.body.role;
      const query = {email:email}
      const updateDoc = {
        $set:{role:role}
      }
      const result = await usersCollection.updateOne(query, updateDoc)
      res.send(result);
    })

    //Favourite Related API

    //Add to favorite item
        app.post('/favourite', async (req, res) => {
            const favoriteBio = req.body;
            const result = await favouriteCollection.insertOne(favoriteBio);
            res.send(result)
        })

      //get favorite data 
      
       app.get('/favourite/:id', async (req, res) => {
            const id = req.params.id;
            const query = { 'biodata._id': id };
            const result = await favouriteCollection.findOne(query);
            res.send(result)
        })

        app.get('/favourites/:email',async (req, res) => {
          const email = req.params.email
          const query = { 'userEmail': email };
          const result = await favouriteCollection.find(query).toArray();;
         
          res.send(result)
        })


      //Delete from Favorite Biodata
        app.delete('/favouriteDelete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { 'biodata._id': id };
            const result = await favouriteCollection.deleteOne(query);
            res.send(result);
        });
        
        //Stripe Related API
        app.post('/create-payment-intent', async (req, res) => {
          const price= req.body.price
          const priceInCent = parseFloat(price) * 100
          if (!price || priceInCent < 1) return

          const paymentIntent = await stripe.paymentIntents.create({
            amount: priceInCent,
            currency: 'usd',
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
            enabled: true,
        },
          })
          //generate clientSecret
          //send client secret as response
          res.send({ clientSecret: paymentIntent.client_secret })

        })

        //Contact Request API

        app.post('/contactRequest', async (req, res) => {
          const contact_requests = req.body
          try{
              const existingRequest = await ContactReqCollection.findOne({ 
            "RequestedUser.name": contact_requests.RequestedUser.name,
            biodataId: contact_requests.biodataId
        })
        if (existingRequest) {
            return res.status(400).send({ error: "Request Already Sent" });

        }
        const payment = {
            price:contact_requests.price,
            email:contact_requests.RequestedUser.email,
            name:contact_requests.RequestedUser.name
          }
          const paymentSuccess =await PaymentCollection.insertOne(payment) 
          const result = await ContactReqCollection.insertOne(contact_requests)
          res.send(result)
          }catch(err){console.log(err)
            res.status(500).send({ error: "An error occurred while processing the contact request." });
          }
          
        })

        // get contact requests by email

        app.get('/contactRequests/:email',async (req, res) => {
          const email = req.params.email
          const query = { 'RequestedUser.email': email}
          const result = await ContactReqCollection.find(query).toArray()
          res.send(result)
        }
      )
      //get contact all contact requests
      app.get('/contactRequests',async (req, res) => {
        const  result = await ContactReqCollection.find().toArray()
        res.send(result)
      })

      //patch contact requests
        app.patch('/approveContactRequest', async(req,res) => {
          const {biodataId} = req.body
          const query = { biodataId :biodataId }
          const biodata = await biodataCollection.findOne(query)
          const query2 = { biodataId}
          const updataOne = {
            $set:{
              status:"approved",
              email:biodata.email,
              phone:biodata.phone,
            }
          }
          const result = await ContactReqCollection.updateOne(query2, updataOne)
          res.send(result)
        })

      //contact requests delete
      app.delete('/contactRequests/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id)} 
        const result = await ContactReqCollection.deleteOne(query)
        res.send(result)
      }
      )

      //get all payments

      app.get('/payments', async (req, res) => {
        const result = await PaymentCollection.find().toArray()
        res.send(result)
      })

      //premium user
      app.get('/premium-users-biodata', async (req, res) => {
        try {
          const result = await biodataCollection.aggregate([
            {
              $lookup: {
                from: 'users', // Reference to users collection
                localField: 'email', // Field in biodataCollection
                foreignField: 'email', // Field in usersCollection
                as: 'user'
              }
            },
            {
              $unwind: '$user' // Unwind the array from the lookup
            },
            {
              $match: {
                'user.role': 'premium' // Match only premium users
              }
            },
            {
              $project: {
                _id: 1, // Include biodata _id
                name: 1,
                email: 1,
                dob: 1,
                height: 1,
                weight: 1,
                occupation: 1,
                race: 1,
                gender: 1,
                father: 1,
                mother: 1,
                presentDiv: 1,
                permanentDiv: 1,
                exheight: 1,
                exweight: 1,
                phone: 1,
                userData: 1,
                imageUrl: 1,
                biodataId: 1,
                'user.email': 1, // Include user email
                'user.role': 1 // Include user role
              }
            }
          ]).toArray();

          res.json(result);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).send('Internal Server Error');
        }
      });
      ;






    // Send a ping to confirm a successful connection
    // await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from Matchmaker Server..');
});

app.listen(port, () => {
  console.log(`Matchmaker is running on port ${port}`);
});
