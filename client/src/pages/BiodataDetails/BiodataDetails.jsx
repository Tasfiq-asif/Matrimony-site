import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import { GiBodyHeight, GiWeight } from "react-icons/gi";
import { PiHandsPrayingFill } from "react-icons/pi";
import { FaLocationDot, FaLocationPinLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import {
  FaBirthdayCake,
  FaBriefcase,
  FaFemale,
  FaHeart,
  FaMale,
  FaPhone,
  FaRegHeart,
} from "react-icons/fa";
import Header from "../../components/Header/Header";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useState } from "react";
import RequestModal from "../../components/Modal/RequestModal";


function BiodataDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  
  const [role] = useRole();
 const queryClient = useQueryClient();


  const [isOpen, setIsOpen] = useState(false);
   const closeModal = () => {
     setIsOpen(false);
   };


  const { data: biodata = {}, isLoading } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata/${id}`);
      return data;
    },
  });


  // fetch initial favourite status using useQuery
  const { data: isFavourite, isLoading: favouriteLoading } = useQuery({
    queryKey: ["favouriteStatus", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/favourite/${id}`);
      return data;
    },
  });
 
 
  // Mutation to add to favorites
  const { mutateAsync: addToFavorites } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.post("/favourite",{userEmail: user?.email,biodata:biodata});
      return data.data;
    },
    onSuccess: () => {
      toast.success("Favourite biodata added successfully");
      queryClient.invalidateQueries(["favouriteStatus", id]);
    },
  });

  // Mutation to delete from favorites
  const { mutateAsync: deleteFromFavorites } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.delete(`/favouriteDelete/${id}`);
      return data.data;
    },
    onSuccess: () => {
      toast.success("Biodata removed from the favorites");
      queryClient.invalidateQueries(["favouriteStatus", id]);
    },
  });

  const handleFavourite = () => {
    if (isFavourite === "") {
      addToFavorites();
    } else {
      deleteFromFavorites();
    }
  };

  if (isLoading || favouriteLoading) return <LoadingSpinner />;
  console.log(biodata)

  return (
    <div>
      <Header title={"Biodata"} />
      <div className="md:max-w-[900px] w-full sm:max-w-[400px] flex-1 md:flex px-4 mx-auto x-5 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="md:w-1/2">
          <div className="w-full h-[400px] overflow-hidden">
            <img
              className="object-cover object-center w-full h-auto object-fit rounded-lg"
              src={biodata.imageUrl}
              alt="avatar"
            />
          </div>
          <div className="flex items-center justify-between px-6 py-3 bg-gray-900">
            {biodata.gender === "male" ? (
              <FaMale size={20} color="white" />
            ) : (
              <FaFemale size={20} color="white" />
            )}
            <div className="flex gap-3">
              <FaBirthdayCake size={20} color="white" />
              <p className="text-white">{biodata.dob}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 md:w-1/2">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {biodata.name}
            </h1>
            <button
              onClick={handleFavourite}
              className="p-0 bg-white hover:bg-white"
            >
              {isFavourite ? (
                <FaHeart size={20} color="red" />
              ) : (
                <FaRegHeart size={20} color="black" />
              )}
            </button>
          </div>
          <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-200">
            <FaBriefcase size={20} />
            {biodata.occupation}
          </div>
          <h1 className="text-md mt-4 mb-2 font-semibold text-gray-800 dark:text-white">
            Father: {biodata.father}
          </h1>
          <h1 className="text-md font-semibold text-gray-800 dark:text-white">
            Mother: {biodata.mother}
          </h1>
          <div className="grid gap-2 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2">
            <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-200">
              <GiBodyHeight size={20} />
              {biodata.height} cm
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <GiWeight size={20} />
              <h1 className="px-2 text-sm">{biodata.weight} KG</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <FaLocationDot size={20} />
              <h1 className="px-2 text-sm">{biodata.presentDiv}</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <FaLocationPinLock size={20} />
              <h1 className="px-2 text-sm">{biodata.permanentDiv}</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <PiHandsPrayingFill size={20} />
              <h1 className="px-2 text-sm">{biodata.race}</h1>
            </div>
          </div>
          <hr className="my-6" />
          <h1 className="text-lg mt-6 font-bold text-darkPurple">
            Preferences
          </h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-200">
              <GiBodyHeight size={20} />
              {biodata.exheight} cm
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <GiWeight size={20} />
              <h1 className="px-2 text-sm">{biodata.exweight} KG</h1>
            </div>
          </div>
          <div className="flex">
            {role === "guest" ? (
              <>
                <button
                  onClick={() => setIsOpen(true)}
                  className=" py-1 mt-4 px-2 rounded-lg bg-darkPink text-white hover:bg-lightPink"
                >
                  Request contact Details
                </button>
                <RequestModal
                  isOpen={isOpen}
                  closeModal={closeModal}
                  requestInfo={{
                    ...biodata,
                    price: 5,
                    RequestedUser: {
                      name: user?.displayName,
                      email: user?.email,
                    },
                  }}
                />
              </>
            ) : (
              <>
                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                  <MdEmail size={20} />
                  <h1 className="px-2 text-sm">{biodata.email}</h1>
                </div>
                <div className="flex gap-2 items-center mt-4 text-gray-700 dark:text-gray-200">
                  <FaPhone size={20} />
                  {biodata.phone}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BiodataDetails;
