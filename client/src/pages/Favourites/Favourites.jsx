import { useNavigate, useParams } from "react-router-dom"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import LoadingSpinner from "../../components/LoadingSpinner"


function Favourites() {
    const {email} = useParams()
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    
    const {data:favourites,isLoading} = useQuery({
      queryKey:['favourites'],
      queryFn: async () => {
        const {data} = await axiosSecure.get(`/favourites/${email}`)
        return data
      }
    })

    const { mutateAsync: deleteFavourite } = useMutation({
      mutationFn: async (id) => {
        const { data } = await axiosSecure.delete(`/favouriteDelete/${id}`);
        return data;
      },
      onSuccess: ()=>{
      queryClient.invalidateQueries('favourites');}
    });



    const handleDelete = async (id) => {
       deleteFavourite(id)
    }

   

    const handleDetails = async (id) => {
      
      navigate(`/biodatas/${id}`)
    }

    if (isLoading) return <LoadingSpinner/> 
    console.log(favourites)
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl mt-2 mx-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption
          className="p-5 text-xl font-semibold text-center my-10
         rtl:text-right text-customPurple bg-white dark:text-white dark:bg-gray-800"
        >
          My favourites
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Biodata Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Permanent Address
            </th>
            <th scope="col" className="px-6 py-3">
              Occupation
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">View details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((data) => (
            <tr
              key={data._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.biodata.biodataId}
              </th>
              <td className="px-6 py-4">{data.biodata.name}</td>
              <td className="px-6 py-4">{data.biodata.permanentDiv}</td>
              <td className="px-6 py-4">{data.biodata.occupation}</td>
              <td className="px-6 py-4 text-right">
                <a
                  onClick={() => handleDetails(data.biodata._id)}
                  href="#"
                  className="font-medium text-darkPurple hover:underline"
                >
                  Details
                </a>
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  onClick={() => handleDelete(data.biodata._id)}
                  href="#"
                  className="font-medium text-red-700 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Favourites