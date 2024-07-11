import { Link, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import toast from "react-hot-toast"
import axios from "axios"
import logo from '../../assets/logo.png'
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet"
import Navbar from "../../components/Shared/Navbar/Navbar"
import Footer from "../../components/Shared/Footer/Footer"
import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function SignUp() {
  const navigate = useNavigate();

  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
    user
  } = useAuth();
  
   useEffect(() => {
     if (user) {
       navigate("/");
     }
   }, [user, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      //upload the image
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      console.log(data.data);

      //2.user Regestration
      const result = await createUser(email, password);
      console.log(result);

      //3. Save username and photoURL in firbase
      await updateUserProfile(name, data.data.display_url);
      navigate("/");
      toast.success("SignUp Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //handle google sign in

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("SignIn Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const[imageName, setImageName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
    }
  };
  return (
    <div>
      <Navbar />
      <Helmet>
        <title>Matchmaker | Sign Up</title>
      </Helmet>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-[calc(100vh-350px)] px-6 mx-auto">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-[4rem]" src={logo} alt="Logo" />
            </div>

            <div className="flex items-center justify-center mt-6">
              <h1 className="w-1/3 pb-4 text-center text-darkPurple font-bold text-2xl capitalize border-b-2 border-darkPink dark:border-blue-400 dark:text-white">
                sign up
              </h1>
            </div>

            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>

              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
                name="name"
                id="name"
              />
            </div>

            <div>
              <label
                htmlFor="dropzone-file"
                className="flex items-center px-3 py-3 mx-auto mt-6 text-center text-gray-700 bg-white border border-gray-500   rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-4 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>

                {imageName || <h2 className=" text-gray-400">Profile Photo</h2>}

                <input
                  required
                  type="file"
                  id="dropzone-file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
              />
            </div>

            <div className="mt-6">
              <button
                disabled={loading}
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                ) : (
                  "Sign Up"
                )}
              </button>
              <button
                disabled={loading}
                onClick={handleGoogleSignIn}
                className="disabled:cursor-not-allowed mx-auto bg-transparent hover:bg-gray-200 flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer rounded-lg w-full"
              >
                <FcGoogle size={32} />

                <p>Continue with Google</p>
              </button>

              <div className="mt-6 text-center ">
                <Link
                  to={"/login"}
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Already have an account? Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default SignUp