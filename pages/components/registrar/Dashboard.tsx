import React from "react";

const Dashboard = () => {
  return (
    <div className=" flex justify-center my-20 ">
      <div className="">
        <p className=" border-2 p-5 rounded-md font-bold ">Dashboard</p>

        <div className=" flex gap-10 my-10">
          <div className="box-content h-32 w-96 p-4  border-4 rounded-md">
            <p>Number of total request</p>
            <p className="pt-5">2</p>

            <div className=" flex justify-center mt-5">
              <button
                type="button"
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                View
              </button>
            </div>
          </div>
          <div className="box-content h-32 w-96  p-4 border-4 ... rounded-md">
            <p>Waiting for Approval</p>
            <p className="pt-5">2</p>

            <div className=" flex justify-center mt-5">
              <button
                type="button"
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                View
              </button>
            </div>
          </div>
        </div>
        <div className=" flex gap-10 my-10">
          <div className="box-content h-32 w-96  p-4 border-4 ... rounded-md">
            <p>Releasing</p>
            <p className="pt-5">2</p>

            <div className=" flex justify-center mt-5">
              <button
                type="button"
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                View
              </button>
            </div>
          </div>
          <div className="box-content h-32 w-96  p-4 border-4 ... rounded-md">
            <p>Completed</p>
            <p className="pt-5">2</p>
            <div className=" flex justify-center mt-5">
              <button
                type="button"
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
