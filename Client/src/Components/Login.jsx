import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';



const Login = () => {

  const {signInSuccess, currentUser} = useAppContext()
  const navigate = useNavigate()


const [formData, setFormData] = useState({
        email: "",
        password: "",
  });






  // Login Functionality 
    const handlesubmit = async (e) => {
    e.preventDefault();

    if (
      !(
       formData.email ||
       formData.password 
        
      )
    ) {
      toast.error(" fill all the fields");
      return; // jooji function-ka halkan
    }

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      toast.error("Fill all the fields");
      return;
    }

    const data = await res.json();
    signInSuccess(data)

    toast.success("Login successful!");
    navigate("/")

  };





















  return (
    <div>
         <div
      className="flex items-center justify-center"
    >
      {/* Stop closing when clicking form */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <form
        onSubmit={handlesubmit}
          class="bg-white rounded-lg shadow-xl text-sm text-gray-500 border border-gray-200 p-8 py-12 w-80 sm:w-[352px]"
        >
          <p class="text-2xl font-medium text-center">
            <span class="text-red-500">User</span>{" "}
             Sign Up
          </p>

           

          <div class="relative group mb-3 mt-4">
            <input
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
              type="email"
              id="reg-email-two"
              class="block w-full px-4 py-3 text-gray-900 bg-transparent border-2 border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-colors"
              placeholder=" "
            />
            <label
              for="reg-email"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
            >
              Email Email
            </label>
          </div>

          <div class="relative group mb-3">
            <input
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
              type="password"
              id="password"
              class="block w-full px-4 py-3 text-gray-900 bg-transparent border-2 border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-colors"
              placeholder=" "
            />
            <label
              for="reg-email"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
            >
              Email Password
            </label>
          </div>

            <p>
              Already have acount?{" "}
              <Link to="/signUp"
              
                className="text-red-500 cursor-pointer"
              >
                Click here{" "}
              </Link>
            </p>
           

          <button
            type="submit"
            class="bg-red-500 hover:bg-red-600 transition-all text-white w-full py-2 rounded-md mt-4 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
      
    </div>
  )
}

export default Login  