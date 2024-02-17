import React from "react";

const Dashboard = () => {
  return (
    <div className=" h-screen flex justify-center my-20 ">
      <div className="">
        <p className=" border-2 p-5 rounded-md font-bold bg-slate-400 text-white ">
          Student Dashboard
        </p>

        <div className=" flex gap-10 my-10">
          <div className="box-content h-32 w-96 p-4  border-4 bg-slate-800  rounded-2xl">
            <p className=" text-white">Pending Request</p>
            <p className="pt-5 text-white">2</p>

            <div className=" flex justify-center mt-5">
              <button className="btn text-white btn-success">View</button>
            </div>
          </div>
          <div className="box-content h-32 w-96 bg-slate-800  p-4 border-4  rounded-2xl">
            <p className=" text-white">Processing</p>
            <p className="pt-5 text-white">2</p>

            <div className=" flex justify-center mt-5">
              <button className="btn text-white btn-success">View</button>
            </div>
          </div>
        </div>
        <div className=" flex gap-10 my-10">
          <div className="box-content h-32 w-96  p-4  border-4 bg-slate-800  rounded-2xl">
            <p className=" text-white">Releasing</p>
            <p className="pt-5 text-white">2</p>

            <div className=" flex justify-center mt-5">
              <button className="btn text-white btn-success">View</button>
            </div>
          </div>
          <div className="box-content h-32 w-96  p-4  border-4 bg-slate-800  rounded-2xl">
            <p className=" text-white">Completed</p>
            <p className="pt-5 text-white">2</p>
            <div className=" flex justify-center mt-5">
              <button className="btn text-white btn-success">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
