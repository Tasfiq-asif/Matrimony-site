import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import LoadingSpinner from "../../../components/LoadingSpinner"
import toast from "react-hot-toast"



function ManageUser() {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();
    
    const {data:users,isLoading} = useQuery({
        queryKey:['users'],
        queryFn: async () => {
        const {data}= await axiosSecure('/users')
        return data        
    }
    })
  const { mutateAsync } = useMutation({
        mutationKey: ["biodata"],
        mutationFn: async ({ reqRole, email }) => {
          const { data } = await axiosSecure.patch(`/userrole/${email}`, {
            role: reqRole,
          });
          return data;
        },
        onSuccess: (data, variables) => {
          console.log(data);
          toast.success("Role updated Successfully");
          queryClient.invalidateQueries(["biodata", variables.email]);
          queryClient.invalidateQueries(["users"]);
        },
        onError: (error) => {
          console.error("Error updating role:", error);
          toast.error("Failed to send request. Please try again.");
        },
      });

      const handleRoleUpdate = async (role, email) => {
        await mutateAsync({ reqRole: role, email });
      };

    if (isLoading) {
      return <LoadingSpinner/>;
    }
    
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl mt-2 mx-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption
          className="p-5 text-xl font-semibold text-center my-10
         rtl:text-right text-customPurple bg-white dark:text-white dark:bg-gray-800"
        >
          All Users
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-lightPink dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only"></span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((data) => (
            <tr
              key={data._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{data.name}</td>
              <td className="px-6 py-4">{data.email}</td>
              <td>
                <span
                  className={`px-1 py-1 rounded-lg text-center ${
                    data.role === "Requested"
                      ? "bg-yellow-300 text-white px-2"
                      : ""
                  }`}
                >
                  {data.role}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  onClick={() => handleRoleUpdate("admin", data.email)}
                  href="#"
                  className="font-medium text-blue-400 hover:underline"
                >
                  Make admin
                </a>
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  onClick={() => handleRoleUpdate("premium", data.email)}
                  href="#"
                  className="font-medium text-green-400 hover:underline"
                >
                  Make Premium
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUser