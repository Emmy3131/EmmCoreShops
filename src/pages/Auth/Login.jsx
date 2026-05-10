import { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-3">

      {/* LOGIN CARD */}
      <div className="bg-white w-full max-w-md rounded-lg shadow-md">

        {/* TITLE */}
        <h2 className="text-center text-2xl font-semibold py-5 border-b">
          Login
        </h2>

        <div className="p-6">

          {/* SOCIAL LOGIN */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 border rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50">
              <FaGoogle className="text-red-500" />
              Login with Google
            </button>

            <button className="flex-1 border rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50">
              <FaApple />
              Login with Apple
            </button>
          </div>

          {/* OR */}
          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1" />
            <span className="text-sm text-gray-400">OR</span>
            <hr className="flex-1" />
          </div>

          {/* FORM */}
          <form className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-sm">
                Email Address or Phone Number
              </label>
              <input
                type="text"
                placeholder="example@email.com"
                className="w-full border rounded-md px-3 py-3 mt-1 outline-none focus:ring-2 focus:ring-[#ED017F]"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between text-sm">
                <label>Password</label>
                <button
                  type="button"
                  className="text-[#ED017F]"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full border rounded-md px-3 py-3 mt-1 outline-none focus:ring-2 focus:ring-[#ED017F]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-4 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="bg-gray-50 text-center p-6 rounded-b-lg">
          <p className="text-sm text-gray-500 mb-3">
            Don't have an Account?
          </p>

          <Link to="/signup" className="border  block bg-[#ED017F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#790743] hover:text-white transition">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;