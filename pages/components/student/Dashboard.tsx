import React, { useEffect } from "react";
import Status from "../../api/getUserStatus" 

const Dashboard = () => {
  const [data , setData] = React.useState({
    approve: "",
    pending : "",
  })

  const getStatus = async()=>
  {
    try {

      const token = localStorage.getItem("token")
      const response = await Status.update(token)

    if(response.status)
    {
      setData(response.response)
      console.log(response.response , " kk")
    }
    else
    {
      console.log( " error")

    }
    } catch (error) {
      console.log( " error")
      
    }
    
  }

  useEffect(()=>
  {
    getStatus()
  },[])
  return (
    <div className=" h-screen mt-10 flex justify-center  ">
      <div className="">
        <p className=" border-2 p-5 rounded-md font-bold bg-slate-400 text-white ">
          Cashier Dashboard 
        </p>

        <div className=" flex gap-10 my-10">
        <div className="box-content h-32 w-96 text-white  p-4  border-4 bg-slate-800  rounded-2xl">
            <p>Approve Request</p>
            <p className="pt-5">{data.approve}</p>
            
          </div>
          <div className="box-content h-32 w-96  text-white  p-4  border-4 bg-slate-800  rounded-2xl">
            <p>Pending Request</p>
            <p className="pt-5">{data.pending}</p>

           
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Dashboard;
