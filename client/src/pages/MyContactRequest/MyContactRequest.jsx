

import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import Header from "../../components/Header/Header";



function MyContactRequest() {
  const {email} = useParams()
  
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error,refetch } = useQuery({
    queryKey: ["request", email],
    queryFn: async () => {
      const response = await axiosSecure(`/contactRequests/${email}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/contactRequests/${id}`);
      
      refetch(); // Refetch the data after deletion
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };

   if (!data || data.length === 0) {
     return (
       <div>
         <Header title={"No contact requests found"} />
       </div>
     );
   }
console.log(data)
  return (
    <div className="p-4">
      <Header title={"My Contact Request"}/>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-r border-gray-200">Name</th>
            <th className="py-2 px-4 border-r border-gray-200">Biodata Id</th>
            <th className="py-2 px-4 border-r border-gray-200">Status</th>
            <th className="py-2 px-4 border-r border-gray-200">Mobile No</th>
            <th className="py-2 px-4 border-r border-gray-200">Email</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request) => (
            <tr key={request._id}>
              <td className="py-2 px-4 text-center border-t border-r border-gray-200">
                {request.name}
              </td>
              <td className="py-2 px-4 text-center border-t border-r border-gray-200">
                {request.biodataId}
              </td>
              <td className="py-2 px-4 text-center border-t border-r border-gray-200">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    request.status === "Approved"
                      ? "bg-green-500"
                      : "bg-yellow-300"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="py-2 px-4 text-center border-t border-r border-gray-200">
                {request.status === "approved" ? request.phone : "Requested"}
              </td>
              <td className="py-2 px-4 text-center border-t border-r border-gray-200">
                {request.status === "approved"
                  ? request.RequestedUser.email
                  : "Requested"}
              </td>
              <td className="py-2 px-4 text-center border-t border-gray-200">
                <button
                  onClick={() => handleDelete(request._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyContactRequest