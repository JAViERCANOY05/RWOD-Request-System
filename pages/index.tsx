import * as React from "react";
import Image from "next/image";
import Logo from "../styles/image/download-removebg-preview.png";
import { useRouter } from "next/navigation"; // Correct import
import LoginAPI from "./api/login_api";
import { notifyError } from "./Notifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Example() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userAccount = {
      email: formData.email,
      password: formData.password,
    };
    console.log("Submitted credentials:", userAccount);
    try {
      const response = await LoginAPI.logIn(userAccount);
      console.log("response", response.user.role);
      if (response.user.role === "registrar") {
        localStorage.setItem("token", response.token);
        router.push("/components/registrar/Drawer");
        console.log("role", response.user.role);
      } else if (response.user.role === "cashier") {
        localStorage.setItem("token", response.token);
        router.push("/components/cashier");
        console.log("role", response.existUser.role);
      } else if (response.user.role === "student") {
        localStorage.setItem("token", response.token);

        console.log("role", response.user.role);
        router.push("/components/registrar/Student_Drawer");
      }
    } catch (err: any) {
      notifyError("Wrong credentials");
      console.log("Wrong credentials");
    }
  };
  return (
    <div className="">
      <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center sm:py-12">
        <div className=" flex justify-center mb-20 ">
          <div className=" text-2xl text-white font-bold border-b-2 py-5">
            Registrar Web-based Online Document Request System
          </div>
        </div>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-white shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

          <div className="relative px-4 py-10  shadow-lg bg-gradient-to-r from-cyan-400 to-sky-500 sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className=" flex justify-center">
                <Image src={Logo} width={100} height={120} alt="Bisu Logo" />
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 "
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 "
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        value={formData.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-accent text-white px-5 py-2"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
