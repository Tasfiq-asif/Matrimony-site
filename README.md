# MatchMaker Website

This project is a comprehensive matrimonial website designed to help users create, manage, and view biodatas. It includes various functionalities such as user registration, login, profile management, and premium features. Additionally, it provides an admin dashboard for managing users and biodata.

## Live Demo
Check out the live demo of the website: [Matchmaker Live](https://matchmaker-36ccf.web.app/)
## Features

### Public Pages
- **Biodatas Page**: Displays a list of all created biodatas with filtering options.
  - **Filter Options**: Filter by age range, gender (male/female), and division (Dhaka, Chattagram, Rangpur, Barisal, Khulna, Maymansign, Sylhet).
  - **Biodata Information**: Each biodata includes:
    - Biodata ID
    - Biodata Type (Male/Female)
    - Profile Image
    - Permanent Division Name
    - Age
    - Occupation
    - "View Profile" Button
  - **Profile Viewing**: Detailed biodata information is available on a private route that requires user login.

### User Authentication
- **Login Page**: Users can log in using email/password or Google Sign-in. Includes a link to the registration page.
- **Registration Page**: Users can register by providing their name, email, password, and an optional photo URL.

### Private Routes
- **Biodata Details Page**: Displays detailed biodata information, excluding contact information (only visible to premium members). Includes:
  - Add to Favourites button.
  - Request Contact Information button for normal users (redirects to the checkout page).

- **Checkout Page**: Users can request contact information by filling out a form and paying a fee. The request is sent to the admin for approval. Fields include:
  - Biodata ID (readonly)
  - User's Email (readonly)
  - Stripe Card Number Input
  - Submit Button

### User Dashboard (Private Route)
- **Dashboard Routes**:
  - **Edit Biodata**: Users can create/edit their biodata information. Fields include:
    - Biodata Type (Male/Female)
    - Name
    - Profile Image Link or Image Input
    - Date of Birth
    - Height
    - Weight
    - Age
    - Occupation
    - Race
    - Father's Name
    - Mother's Name
    - Permanent Division Name
    - Present Division Name
    - Expected Partner Age
    - Expected Partner Height
    - Expected Partner Weight
    - Contact Email (readonly)
    - Mobile Number
  - **View Biodata**: Users can view their biodata information.
  - **My Contact Requests**: Shows all contact request information.
  - **Favourites Biodata**: Displays all favourite biodatas.
  - **Logout**: Button to log out.

### Admin Dashboard (Private Route)
- **Admin Dashboard**: Overview of biodata counts and total revenue.
  - **Manage Users**: Displays all users with options to make admin or premium.
  - **Approved Premium**: Shows premium approval requests.
  - **Approved Contact Requests**: Shows contact request approvals.

## Note
- **Private Routes**: Access to detailed biodata information, contact requests, and user dashboards require login.
- **Premium Features**: Contact information is only visible to premium members.
- **Admin Functions**: Admins can approve premium requests and contact requests.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Google Sign-In
- **Payment Gateway**: Stripe

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables for database connection, authentication, and Stripe.
4. Run the backend server using `npm start`.
5. Run the frontend server using `npm run client`.



## License
This project is licensed under the MIT License.

---

### Author
[Your Name]
