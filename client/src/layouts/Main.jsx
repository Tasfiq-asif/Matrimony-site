
import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";



function Main() {
  return (
    <div className="bg-red-50">
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-350px)]">
        <Outlet />
      </div>
      <Footer/>
       
    </div>
  );
}

export default Main