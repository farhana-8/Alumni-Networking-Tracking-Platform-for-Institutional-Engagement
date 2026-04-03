import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import Button from "../../components/Button";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      const token = res.data.token;

      const decoded = jwtDecode(token);

      const role = decoded.role;

      const userObj = {
        name: decoded.name || decoded.email,
        email: decoded.email
      };

      login({
        token,
        role,
        user: userObj
      });

      if(role === "ADMIN"){
        navigate("/admin/dashboard");
      }else{
        navigate("/alumni/dashboard");
      }

    }catch(err){

      setError(
        err?.response?.data?.message ||
        "Invalid email or password"
      );

    }finally{
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500">

      {/* CARD */}

      <div className="w-full max-w-md">

        <form
          onSubmit={handleLogin}
          className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10"
        >

          {/* HEADER */}

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Alumni Portal
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Connect with your alumni network
            </p>

          </div>


          {/* ERROR MESSAGE */}

          {error && (

            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
              {error}
            </div>

          )}


          {/* EMAIL */}

          <div className="mb-4">

            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="mb-6">

            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>


          {/* LOGIN BUTTON */}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-lg"
            disabled={loading}
          >

            {loading ? "Logging in..." : "Login"}

          </Button>


          {/* EXTRA LINKS */}

          <div className="text-center mt-6 text-sm text-gray-600">

            <p>
              Forgot password?
              <span className="text-indigo-600 ml-1 cursor-pointer">
                Reset
              </span>
            </p>

          </div>

        </form>

      </div>

    </div>

  );
}

export default Login;