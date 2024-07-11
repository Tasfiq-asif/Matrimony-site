import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


const EditBiodata = () => {
    const {user,loading,setLoading} = useAuth()
    const axiosSecure = useAxiosSecure()

    const [exists,setExists] = useState(false)
    const [biodata,setBioData] = useState({})
  
    useEffect(() => {
      const fetchData = async () => {
        if (user?.email) {
          try {
            const { data } = await axiosSecure.get(`/my-biodata/${user.email}`);
            if (data && data.length > 0) {
              setExists(true);
              setBioData(data[0]);
              setLoading(false)
            }
          } catch (error) {
            console.error("Error fetching biodata:", error);
          }
        }
      };

      fetchData();
    }, [axiosSecure, user?.email]);

    const {mutateAsync: createBiodata} = useMutation({
      mutationFn: async biodata =>{
        const data =  await axiosSecure.post('/biodata',biodata)
        return data
      },
      onSuccess:()=>{
        console.log('Data Saved Successfully')
        toast.success('BioData Added Successfully!')
        setLoading(false);
      }
    })

    
    const {mutateAsync: updateBiodata} = useMutation({
      mutationFn: async biodata =>{
        const data =  await axiosSecure.patch(`biodata/${user?.email}`,biodata)
        return data
      },
      onSuccess:()=>{
        console.log('Data Updated Successfully')
      toast.success('BioData Updated Successfully!')
      setLoading(false);
      }
    })



    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const dob = form.dob.value;
      const height = form.height.value;
      const weight = form.weight.value;
      const occupation = form.occupation.value;
      const race = form.race.value;
      const gender = form.gender.value;
      const father = form.father.value;
      const mother = form.mother.value;
      const presentDiv = form.presentDiv.value;
      const permanentDiv = form.permanentDiv.value;
      const exheight = form.exheight.value;
      const exweight = form.exweight.value;
      const phone = form.phone.value;
      const image = form.image.files[0];
      const userData = {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      };
      
      let imageUrl = biodata?.imageUrl || ''; 

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
         try {
          setLoading(true);
           // Upload the image
           const { data } = await axios.post(
               `https://api.imgbb.com/1/upload?key=${
                 import.meta.env.VITE_IMGBB_API_KEY
               }`,
               formData
              );
              console.log(data)
             imageUrl = data.data.url;
         } catch (error) {
           console.error("Error uploading image:", error);
           setLoading(false);
           return;
         }
      }

     

      
      // Create the object to send to MongoDB
      const newbiodata = {
        name,
        email,
        dob,
        height,
        weight,
        occupation,
        race,
        gender,
        father,
        mother,
        presentDiv,
        permanentDiv,
        exheight,
        exweight,
        phone,
        userData,
        imageUrl // Add the image URL here
      };

      try {
        setLoading(true);

        //check if the user already has a biodata
        const existingBiodata = await axiosSecure.get(
          `/my-biodata/${user?.email}`
        );

        if (existingBiodata && existingBiodata.data.length > 0) {
          await updateBiodata(newbiodata);
        } else {
          await createBiodata(newbiodata);
        }
      } catch (error) {
        console.error(
          "Error  submitting the form:",
          toast.error(error.message)
        );
        setLoading(false);
      }
    };

    
  
    return (
      <div>
        <h1 className="text-xl font-semibold text-darkPurple mx-auto text-center my-10 mb-10">
          {exists ? "Edit Biodata" : "Add Biodata"}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className="md:px-10 mx-auto mt-4">
            <label
              htmlFor="username"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Username
            </label>

            <input
              name="name"
              type="text"
              defaultValue={!loading && exists ? biodata.name : ""}
              placeholder="Name"
              className="block bg-gray-50  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </div>
          {/* image */}
          <div className="md:px-10 mx-auto mt-4 ">
            <label
              htmlFor="Image"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Image
            </label>
            {!loading && exists && biodata?.imageUrl && (
              <div className="mt-2">
                <img
                  src={biodata.imageUrl}
                  alt="Current"
                  className="block h-[100px]  max-w-xs rounded-lg"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              placeholder="Upload Your Image"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full border  bg-white px-5 py-2.5 text-gray-700 focus:border-lightPink focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
            />
          </div>
          {/* DOB */}
          <div className="md:px-10 mx-auto mt-4">
            <label
              htmlFor="Birthday"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Birthday
            </label>

            <input
              type="date"
              name="dob"
              defaultValue={!loading && exists ? biodata.dob : ""}
              placeholder="John Doe"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>
          {/* Row break */}
          <div className="md:flex ">
            {/* Height */}
            <div className="md:px-10 mx-auto mt-4 md:w-1/2">
              <label
                htmlFor="height"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-4"
              >
                Height (cm)
              </label>

              <select
                name="height"
                defaultValue={!loading && exists ? biodata.height : ""}
                className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Select your height
                </option>
                {Array.from({ length: 81 }, (_, i) => {
                  const startHeight = 140 + i;
                  const endHeight = startHeight + 1;
                  return (
                    <option
                      key={startHeight}
                      value={`${startHeight}-${endHeight}`}
                      selected={
                        biodata.height === `${startHeight}-${endHeight}`
                      }
                    >
                      {startHeight} cm - {endHeight} cm
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Weight */}
            <div className="md:px-10 mx-auto mt-4 md:w-1/2">
              <label
                htmlFor="height"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-4"
              >
                Weight (kg)
              </label>

              <select
                name="weight"
                className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Select your weight
                </option>
                <option value="41-50" selected={biodata.weight === "41-50"}>
                  41-50 Kilogram
                </option>
                <option value="51-60" selected={biodata.weight === "51-60"}>
                  51-60 Kilogram
                </option>
                <option value="61-70" selected={biodata.weight === "61-70"}>
                  61-70 Kilogram
                </option>
                <option value="71-80" selected={biodata.weight === "71-80"}>
                  71-80 Kilogram
                </option>
                <option value="81-90" selected={biodata.weight === "81-90"}>
                  81-90 Kilogram
                </option>
              </select>
            </div>
          </div>
          {/* row break */}
          <div className="md:flex">
            {/* Occupation */}
            <div className="md:px-10 mx-auto mt-4 md:w-1/3">
              <label
                htmlFor="occupation"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Occupation
              </label>

              <select
                name="occupation"
                defaultValue={!loading && exists ? biodata.occupation : ""}
                className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Select Occupation
                </option>
                <option
                  value="Software Engineer"
                  selected={biodata.occupation === "Software Engineer"}
                >
                  Software Engineer
                </option>
                <option
                  value="Doctor"
                  selected={biodata.occupation === "Doctor"}
                >
                  Doctor
                </option>
                <option
                  value="Teacher"
                  selected={biodata.occupation === "Teacher"}
                >
                  Teacher
                </option>
                <option
                  value="Lawyer"
                  selected={biodata.occupation === "Lawyer"}
                >
                  Lawyer
                </option>
                <option
                  value="Artist"
                  selected={biodata.occupation === "Artist"}
                >
                  Artist
                </option>
                <option
                  value="Businessperson"
                  selected={biodata.occupation === "Businessperson"}
                >
                  Businessperson
                </option>
                <option value="Nurse" selected={biodata.occupation === "Nurse"}>
                  Nurse
                </option>
                <option
                  value="Engineer"
                  selected={biodata.occupation === "Engineer"}
                >
                  Engineer
                </option>
                <option
                  value="Accountant"
                  selected={biodata.occupation === "Accountant"}
                >
                  Accountant
                </option>
                <option value="Chef" selected={biodata.occupation === "Chef"}>
                  Chef
                </option>
                <option
                  value="Freelancer"
                  selected={biodata.occupation === "Freelancer"}
                >
                  Freelancer
                </option>
                <option
                  value="Office Executive"
                  selected={biodata.occupation === "Office Executive"}
                >
                  Office Executive
                </option>
                <option
                  value="Marketeer"
                  selected={biodata.occupation === "Marketeer"}
                >
                  Marketeer
                </option>
                <option value="Other" selected={biodata.occupation === "Other"}>
                  Other
                </option>
              </select>
            </div>

            {/* Race */}
            <div className="md:px-10 mx-auto mt-4 md:w-1/3">
              <label
                htmlFor="race"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Race
              </label>

              <select
                name="race"
                // defaultValue={!loading && exists ? biodata.race : ""}
                className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              >
                <option value="" disabled selected={!exists}>
                  Select Race
                </option>
                <option
                  value="Christianity"
                  selected={biodata.race === "Christianity"}
                >
                  Christianity
                </option>
                <option value="Islam" selected={biodata.race === "Islam"}>
                  Islam
                </option>
                <option value="Hinduism" selected={biodata.race === "Hinduism"}>
                  Hinduism
                </option>
                <option value="Buddhism" selected={biodata.race === "Buddhism"}>
                  Buddhism
                </option>
                <option value="Judaism" selected={biodata.race === "Judaism"}>
                  Judaism
                </option>
                <option value="Sikhism" selected={biodata.race === "Sikhism"}>
                  Sikhism
                </option>
                <option value="Atheism" selected={biodata.race === "Atheism"}>
                  Atheism
                </option>
                <option
                  value="Agnosticism"
                  selected={biodata.race === "Agnosticism"}
                >
                  Agnosticism
                </option>
                <option value="Other" selected={biodata.race === "Other"}>
                  Other
                </option>
              </select>
            </div>
            {/* Gender */}
            <div className="md:px-10 mx-auto mt-4 md:w-1/3">
              <label
                htmlFor="gender"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Gender
              </label>

              <select
                name="gender"
                defaultValue={!loading && exists ? biodata.gender : ""}
                className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male" selected={biodata.gender === "male"}>
                  Male
                </option>
                <option value="female" selected={biodata.gender === "female"}>
                  Female
                </option>
              </select>
            </div>
          </div>

          {/* Fathers Name */}
          <div className="md:px-10 mx-auto mt-4 ">
            <label
              htmlFor="father"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Father Name
            </label>

            <input
              name="father"
              type="text"
              defaultValue={!loading && exists ? biodata.father : ""}
              placeholder="Father's Name"
              className="block bg-gray-50  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </div>

          {/* Mother's Name */}
          <div className="md:px-10 mx-auto mt-4">
            <label
              htmlFor="mother"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Mother Name
            </label>

            <input
              name="mother"
              type="text"
              defaultValue={!loading && exists ? biodata.mother : ""}
              placeholder="Mother's Name"
              className="block bg-gray-50  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </div>
          {/* row break */}

          <div className="md:flex">
            {/* Current Division  */}
            <div className="md:px-10 mx-auto mt-4 md:w-1/2">
              <label
                htmlFor="presentDiv"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Present Division Name
              </label>

              <select
                name="presentDiv"
                defaultValue={!loading && exists ? biodata.presentDiv : ""}
                className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Select your division
                </option>
                <option
                  value="Dhaka"
                  selected={biodata.presentDiv === "Dhaka"}
                >
                  Dhaka
                </option>
                <option
                  value="Rajshahi"
                  selected={biodata.presentDiv === "Rajshahi"}
                >
                  Rajshahi
                </option>
                <option
                  value="Chattagram"
                  selected={biodata.presentDiv === "Chattagram"}
                >
                  Chattagram
                </option>
                <option
                  value="Rangpur"
                  selected={biodata.presentDiv === "Rangpur"}
                >
                  Rangpur
                </option>
                <option
                  value="Barisal"
                  selected={biodata.presentDiv === "Barisal"}
                >
                  Barisal
                </option>
                <option
                  value="Khulna"
                  selected={biodata.presentDiv === "Khulna"}
                >
                  Khulna
                </option>
                <option
                  value="Mymensingh"
                  selected={biodata.presentDiv === "Mymensingh"}
                >
                  Mymensingh
                </option>
                <option
                  value="Sylhet"
                  selected={biodata.presentDiv === "Sylhet"}
                >
                  Sylhet
                </option>
              </select>
            </div>

            {/* Permanent Division Name */}
            <div className="md:px-10 mx-auto mt-4 md:w-1/2">
              <label
                htmlFor="permanentDiv"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Permanent Division Name
              </label>

              <select
                name="permanentDiv"
                defaultValue={
                  !loading && exists ? biodata.permanentDiv : ""
                }
                className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Select your division
                </option>
                <option
                  value="Dhaka"
                  selected={biodata.permanentDiv === "Dhaka"}
                >
                  Dhaka
                </option>
                <option
                  value="Rajshahi"
                  selected={biodata.permanentDiv === "Rajshahi"}
                >
                  Rajshahi
                </option>
                <option
                  value="Chattagram"
                  selected={biodata.permanentDiv === "Chattagram"}
                >
                  Chattagram
                </option>
                <option
                  value="Rangpur"
                  selected={biodata.permanentDiv === "Rangpur"}
                >
                  Rangpur
                </option>
                <option
                  value="Barisal"
                  selected={biodata.permanentDiv === "Barisal"}
                >
                  Barisal
                </option>
                <option
                  value="Khulna"
                  selected={biodata.permanentDiv === "Khulna"}
                >
                  Khulna
                </option>
                <option
                  value="Mymensingh"
                  selected={biodata.permanentDiv === "Mymensingh"}
                >
                  Mymensingh
                </option>
                <option
                  value="Sylhet"
                  selected={biodata.permanentDiv === "Sylhet"}
                >
                  Sylhet
                </option>
              </select>
            </div>
          </div>

          {/* Row break */}

          {/* Row break */}
          <div className="md:flex ">
            {/*Expected Height */}
            <div className="md:px-10 mx-auto mt-4 md:w-1/2">
              <label
                htmlFor="height"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-4"
              >
                Preferred Height Of Partner (cm)
              </label>

              <select
                name="exheight"
                className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Select preferred height
                </option>
                {Array.from({ length: 8 }, (_, i) => {
                  const startHeight = 140 + i * 10;
                  const endHeight = startHeight + 9;
                  return (
                    <option
                      key={startHeight}
                      value={`${startHeight}-${endHeight}`}
                      selected={
                        biodata.preferredPartnerHeight ===
                        `${startHeight}-${endHeight}`
                      }
                    >
                      {startHeight} cm - {endHeight} cm
                    </option>
                  );
                })}
              </select>
            </div>

            {/*Expected Weight */}
            <div className="md:px-10 mx-auto mt-4 md:w-1/2">
              <label
                htmlFor="height"
                className="block text-sm text-gray-500 dark:text-gray-300 mt-4"
              >
                Preferred Weight Of Partner (kg)
              </label>

              <select
                name="exweight"
                className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Select preferred weight
                </option>
                <option
                  value="41-50"
                  selected={biodata.preferredPartnerWeight === "41-50"}
                >
                  41-50 Kilogram
                </option>
                <option
                  value="51-60"
                  selected={biodata.preferredPartnerWeight === "51-60"}
                >
                  51-60 Kilogram
                </option>
                <option
                  value="61-70"
                  selected={biodata.preferredPartnerWeight === "61-70"}
                >
                  61-70 Kilogram
                </option>
                <option
                  value="71-80"
                  selected={biodata.preferredPartnerWeight === "71-80"}
                >
                  71-80 Kilogram
                </option>
                <option
                  value="81-90"
                  selected={biodata.preferredPartnerWeight === "81-90"}
                >
                  81-90 Kilogram
                </option>
              </select>
            </div>
          </div>

          {/* Email */}
          <div className="md:px-10 mx-auto mt-4">
            <label
              htmlFor="username"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Email
            </label>

            <input
              name="email"
              type="text"
              value={user?.email}
              readOnly
              disabled
              placeholder="Name"
              className="block bg-gray-50  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </div>

          {/* Phone */}
          <div className="md:px-10 mx-auto mt-4">
            <label
              htmlFor="Phone"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Phone Number(required)
            </label>

            <input
              name="phone"
              type="number"
              placeholder="Phone Number"
              defaultValue={!loading && exists ? biodata.phone : ""}
              required
              className="block bg-gray-50  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </div>
          <div className="md:px-10 mx-auto mt-4 w-full ">
            <button
              className=" w-full md:px-10 mx-auto mt-4 text-white  rounded-lg py-3 px-3 my-4"
              type="submit "
            >
              Confirm & Publish
            </button>
          </div>
        </form>
      </div>
    );
};

export default EditBiodata;