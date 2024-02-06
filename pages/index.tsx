import Link from "next/link";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";
import Image from "next/image";
import Logo from "../public/bisu-logo.png";
import { useRouter } from "next/navigation"; // Correct import

// import DiamondIcon from "@mui/icons-material/Diamond";
const Home = () => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted credentials:", formData.email);
    if (formData.email === "student@gmail.com") {
      router.push("/components/registrar/Student_Drawer");
    } else if (formData.email === "registrar@gmail.com") {
      router.push("/components/registrar/Drawer");
    }
  };
  return (
    <div className=" h-screen bg-blue-400     ">
      <div className=" h-screen   justify-center ">
        <div className=" bg-blue-600 py-8">
          <p className=" text-center text-white text-lg font-bold">
            Registrar Web-based Online Document Request System
          </p>
        </div>
        <div className=" mt-40 sm:mx-auto sm:w-full sm:max-w-sm  bg-blue-600 rounded-md ">
          <div className="   px-10 rounded-md py-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="mx-auto flex  justify-center text-white h-10 w-auto">
                <Image src={Logo} width={90} height={90} alt="Bisu Logo" />
              </div>
              <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Login
              </h2>
            </div>
            <form
              className="space-y-6 "
              onSubmit={handleSubmit}
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-white hover:text-[#FF892E]"
                    >
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    value={formData.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full font-bold px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                {/* <Link href="/components/registrar/Drawer"> */}
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#FF892E] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
                {/* </Link> */}
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              <a
                href="#"
                className="font-semibold leading-6 text-white hover:text-black"
              >
                Dont have an Account ? Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
