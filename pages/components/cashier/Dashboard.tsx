import React from "react";

const Dashboard = () => {
  return (
    <div className=" h-screen mt-10 flex justify-center  ">
      <div className="">
        <p className=" border-2 p-5 rounded-md font-bold bg-slate-400 text-white ">
          Cashier Dashboard 
        </p>

        <div className=" flex gap-10 my-10">
          <div className="box-content h-32 w-96  p-4  text-white  border-4 bg-slate-800  rounded-2xl">
            <p>Payment Received</p>
            <p className="pt-5">0</p>

            <div className=" flex justify-center mt-5">
              <button className="btn text-white btn-success">View</button>
            </div>
          </div>
          <div className="box-content h-32 w-96  text-white  p-4  border-4 bg-slate-800  rounded-2xl">
            <p>Waiting for Approval</p>
            <p className="pt-5">0</p>

            <div className=" flex justify-center mt-5">
              <button className="btn text-white btn-success">View</button>
            </div>
          </div>
        </div>
        <div className=" flex  my-10 justify-center">
          <div className="box-content h-32 w-96 text-white  p-4  border-4 bg-slate-800  rounded-2xl">
            <p>Number of Complete Request</p>
            <p className="pt-5">0</p>

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
