import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import Header from "../../components/Header/Header";


function AdminHome() {
     const [biodataCount, setBiodataCount] = useState(0);
     const [maleCount, setMaleCount] = useState(0);
     const [femaleCount, setFemaleCount] = useState(0);
     const [premiumCount, setPremiumCount] = useState(0);
     const [totalRevenue, setTotalRevenue] = useState(0);

     const axiosSecure = useAxiosSecure()
     useEffect(() => {
       const fetchData = async () => {
         try {
           const biodataResponse = await axiosSecure.get("/biodatas");
           const paymentResponse = await axiosSecure.get("/payments");
           const usersResponse = await axiosSecure.get("/users");
           
           const biodata = biodataResponse.data;
           const payments = paymentResponse.data;
           const users = usersResponse.data;

           const totalBiodata = biodata.length;
           const maleBiodata = biodata.filter(
             (item) => item.gender === "male"
           ).length;
           const femaleBiodata = biodata.filter(
             (item) => item.gender === "female"
           ).length;
           const premiumBiodata = users.filter(
             (item) => item.role === 'premium'
           ).length;
           const totalRevenue = payments.reduce(
             (sum, payment) => sum + parseFloat(payment.price),
             0
           );

           setBiodataCount(totalBiodata);
           setMaleCount(maleBiodata);
           setFemaleCount(femaleBiodata);
           setPremiumCount(premiumBiodata);
           setTotalRevenue(totalRevenue);
         } catch (error) {
           console.error("Error fetching data", error);
         }
       };

       fetchData();
     }, [axiosSecure]);

     const data = [
       { name: "Total", count: biodataCount },
       { name: "Male", count: maleCount },
       { name: "Female", count: femaleCount },
       { name: "Premium", count: premiumCount },
     ];

     const revenueData = [{ name: "Total Revenue", value: totalRevenue }];

     const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Header title={"Dashboard"} />
      <div className="flex flex-col lg:flex-row mx-auto gap-4 mb-8">
        <div className="w-full md:w-1/2 lg:w-1/4 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Biodata Counts</h2>
          <ul>
            <li>Total Biodata: {biodataCount}</li>
            <li>Male Biodata: {maleCount}</li>
            <li>Female Biodata: {femaleCount}</li>
            <li>Premium Biodata: {premiumCount}</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          <p>Total Revenue: ${totalRevenue}</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:gap-20 mx-auto gap-4">
        <div className="w-full md:w-1/2 lg:w-1/2 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Biodata Counts Chart</h2>
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Revenue Chart</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={revenueData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {revenueData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default AdminHome