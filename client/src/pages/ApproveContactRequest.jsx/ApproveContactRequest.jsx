import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


function ApproveContactRequest() {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();

    const styles = {
      container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      },
      heading: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
      },
      table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
      },
      th: {
        borderBottom: "2px solid #ddd",
        padding: "10px",
        textAlign: "left",
        backgroundColor: "#f2f2f2",
      },
      tr: {
        borderBottom: "1px solid #ddd",
      },
      td: {
        padding: "10px",
      },
      button: {
        padding: "5px 10px",
        backgroundColor: "#FFD700", // Yellow color for the approve button
        color: "white",
        border: "none",
        borderRadius: "3px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      },
      disabledButton: {
        backgroundColor: "#4CAF50",
        color: "#fff",
        cursor: "not-allowed",
      },
    };

  const fetchRequest = async () => {
    const response = await axiosSecure.get('/contactRequests')
    return response.data
  }

  const approveContactRequest =  async ({biodataId}) => {
    const response = await axiosSecure.patch('/approveContactRequest',
      {
        biodataId,
    })
    return response.data
  }
  const {
    data: contactRequests,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: fetchRequest,
  });
  
  const mutation = useMutation({
    mutationFn: approveContactRequest,
    onSuccess:()=>{
      toast.success("Request updated")
      queryClient.invalidateQueries(['contactRequests']);
    }
  })

  const handleApprove = (contactRequestId, biodataId) => {
    mutation.mutate({ contactRequestId, biodataId });
  };

  console.log(contactRequests)
  if (error) return `Error: ${error.message}`;

     if (isLoading) {
       return <LoadingSpinner />;
     }
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Requests</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            {[
              "Biodata Id",
              "Name",
              "Email",
              "Phone",
              "Approved Contact Request",
            ].map((header) => (
              <th key={header} style={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contactRequests.map((request, index) => (
            <tr key={index} style={styles.tr}>
              <td style={styles.td}>{request.biodataId}</td>
              <td style={styles.td}>{request.name}</td>
              <td style={styles.td}>{request.email}</td>
              <td style={styles.td}>{request.phone}</td>
              <td style={styles.td}>
                {request.status === "approved" ? (
                  <button
                    style={{ ...styles.button, ...styles.disabledButton }}
                    disabled
                  >
                    Approved
                  </button>
                ) : (
                  <button
                    style={styles.button}
                    onClick={() =>
                      handleApprove(request._id, request.biodataId)
                    }
                    disabled={mutation.isLoading}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApproveContactRequest