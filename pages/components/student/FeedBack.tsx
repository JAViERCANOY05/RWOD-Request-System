import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@material-tailwind/react";
import getFeed from "../../api/getFeed"
import { notifySuccess } from '@/pages/Notifications';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Inputs = {
    comment: string
  }

function App() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> = async (data) => 
{
    try {
        const token = localStorage.getItem("token");
    const response = await getFeed.add(token,data)
        if(response.status)
        {
            reset()
            notifySuccess("Thank you for your Feedback : ) ")
            console.log("goods na na add na ! ")
        }else
        {
            console.log("error ! ")

        }
    } catch (error) {
        console.log("error ! ")
        
    }

}
      
      


  return (
   
    <div className="flex justify-center items-center ">
      <div>
        <div className="grid min-h-full w-auto place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Waiting for your feedback.</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Can we hear a feedback from you ?</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <div className=' flex justify-center mt-8 w-96'>
        <div>
        <input {...register("comment", { required: true }) } placeholder='Comment here.' className=' border-2 rounded-md px-40 py-10' />
        <div>
      {errors.comment && <span className=' text-red-500'>This field is required</span>}

        </div>
      {/* errors will return when field validation fails  */}
        </div>

   
      </div>
      
<div className=' flex justify-center my-5'>
<Button placeholder color="blue" type="submit"  className=' px-5'>Submit</Button>

</div>
    </form>
      </div>
      
      </div>
        {/* Your content goes here */}
        
     
      <ToastContainer />
    </div>



  );
}

export default App;
