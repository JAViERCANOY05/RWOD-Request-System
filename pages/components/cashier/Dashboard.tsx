import React, { useEffect } from "react";
import Status from "./../../api/getAllStatatus";

const Dashboard = () => {
  const [data, setData] = React.useState({
    approve: "",
    pending: "",
    waitingForApproval: "",
    waitingForPayment: "",
    totalAmount: "",
  });

  const getStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await Status.update(token);

      if (response.status) {
        setData(response.response);
        console.log(response.response, " kk");
      } else {
        console.log(" error");
      }
    } catch (error) {
      console.log(" error");
    }
  };
  const totalAmountNumber = parseFloat(data.totalAmount);
  const formattedAmount = new Intl.NumberFormat("en-US").format(
    totalAmountNumber
  );

  useEffect(() => {
    getStatus();
  }, []);
  return (
    <div className=" h-screen mt-10 flex justify-center  ">
      <div className=" flex flex-col gap-6">
        <p className=" border-2 p-5 rounded-md font-bold bg-slate-400 text-white ">
          Cashier Dashboard
        </p>

        <div className="  flex gap-5 items-end ">
          <p className=" text-lg">Total Amount</p>
          <p className="text-2xl">
            {formattedAmount} <span>&#8369;</span>
          </p>
        </div>
        <div className=" flex gap-10">
          <div className="box-content h-32 w-96  text-white  p-4  border-4 bg-red-500  rounded-2xl">
            <p>Pending Request</p>
            <p className="pt-5">{data.pending}</p>
          </div>
          <div
            className="box-content h-32 w-96 text-white  p-4  border-4 bg-green-500
          rounded-2xl"
          >
            <p>Approve Request</p>
            <p className="pt-5">{data.approve}</p>
          </div>
        </div>
        <div className=" flex gap-10">
          <div
            className="box-content h-32 w-96 text-white  p-4  border-4 bg-yellow-500
          
          rounded-2xl"
          >
            <p>Waiting for Approval</p>
            <p className="pt-5">{data.approve}</p>
          </div>
          <div className="box-content h-32 w-96  text-white  p-4  border-4 bg-blue-500  rounded-2xl">
            <p>Waiting for Payment</p>
            <p className="pt-5">{data.waitingForPayment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
