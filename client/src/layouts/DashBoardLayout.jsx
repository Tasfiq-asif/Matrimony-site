

import { Outlet } from 'react-router-dom';

import SideBar from '../pages/Dashboard/SideBar/SideBar';


const DashBoardLayout = () => {
    return (
      <div className="relative min-h-screen md:flex">
        <SideBar />
        <div className="flex-1 md:ml-72 ">
          <div className='p-5'>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default DashBoardLayout;