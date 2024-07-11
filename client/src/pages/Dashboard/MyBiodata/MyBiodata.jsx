import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useAuth from "../../../hooks/useAuth"
import LoadingSpinner from "../../../components/LoadingSpinner"
import Header from "../../../components/Header/Header"
import { FaBirthdayCake, FaFemale, FaMale } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { FaBriefcase, FaLocationDot, FaLocationPinLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { PiHandsPrayingFill } from "react-icons/pi";
import { GiWeight } from "react-icons/gi";
import { FaPhone } from "react-icons/fa6";
import useRole from "../../../hooks/useRole"
import toast from "react-hot-toast"
import PremiumButton from "./PremiumButton"


function MyBiodata() {
    const {user} = useAuth()
    const axiosSecure= useAxiosSecure()
    const [role]  = useRole()
    const QueryClient = useQueryClient();
 

    console.log(role)

    const {data,isLoading} = useQuery({
        queryKey: ['my-biodata',user?.email],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/my-biodata/${user?.email}`)
           
            return data
        },
       enabled:true
    })
       const { mutateAsync} = useMutation({
         mutationKey: ["biodata", user?.email],
         mutationFn: async (reqRole) => {
           const { data } = await axiosSecure.patch(
             `/userrole/${user?.email}`,
             reqRole
           );
           return data;
         },
         onSuccess: (data) => {
           console.log(data);
          
           toast.success("Request Sent Successfully");
           QueryClient.invalidateQueries(["biodata", user?.email]);
         },
         onError: (error) => {
           console.error("Error updating role:", error);
           toast.error("Failed to send request. Please try again.");
         },
       });

    const handlePremium = async()=>{
      mutateAsync({role: 'Requested'})
      
    }
    

    if(isLoading){
        return<LoadingSpinner/>
    }


    
  return (
    <div>
      <Header title={"My Biodata"} />
      <div className="w-full  2xl:w-1/3  xl:w-2/3 lg:w-2/3  mx-auto  overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className=" w-full max-h-[calc(100vh*4/5)] overflow-hidden">
          <img
            className="object-cover  object-center w-full h-auto]"
            src={data[0].imageUrl}
            alt="avatar"
          />
        </div>

        <div className="flex items-center justify-between px-6 py-3 bg-gray-900">
          {data[0].gender === "male" ? (
            <FaMale size={20} color="white" />
          ) : (
            <FaFemale size={20} color="white" />
          )}
          <div className="flex gap-3">
            <FaBirthdayCake size={20} color="white" />
            <p className="text-white">{data[0].dob}</p>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {data[0].name}
            </h1>
            <PremiumButton role={role} handlePremium={handlePremium} />
          </div>
          <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-200">
            <FaBriefcase size={20} />
            {data[0].occupation}
          </div>
          <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-200">
            <FaPhone size={20} />
            {data[0].phone}
          </div>
          <h1 className=" text-md mt-4 mb-2 font-semibold text-gray-800 dark:text-white">
            Father: {data[0].father}
          </h1>
          <h1 className="text-md font-semibold text-gray-800 dark:text-white">
            Mother: {data[0].mother}
          </h1>

          <div className="grid gap-2 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2">
            <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-200">
              <GiBodyHeight size={20} />
              {data[0].height} cm
            </div>

            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <MdEmail size={20} />

              <h1 className="px-2 text-sm">{data[0].email}</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <GiWeight size={20} />

              <h1 className="px-2 text-sm">{data[0].weight} KG</h1>
            </div>

            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <FaLocationDot size={20} />

              <h1 className="px-2 text-sm">{data[0].presentDiv}</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <FaLocationPinLock size={20} />

              <h1 className="px-2 text-sm">{data[0].permanentDiv}</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <PiHandsPrayingFill size={20} />

              <h1 className="px-2 text-sm">{data[0].race}</h1>
            </div>
          </div>
          <hr className="my-6" />

          <h1 className=" text-lg mt-6 font-bold text-darkPurple">
            {" "}
            Preferences
          </h1>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-200">
              <GiBodyHeight size={20} />
              {data[0].exheight} cm
            </div>

            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <GiWeight size={20} />

              <h1 className="px-2 text-sm">{data[0].exweight} KG</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBiodata