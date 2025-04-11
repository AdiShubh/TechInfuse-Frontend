import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/hooks/useAuth";

import { Link } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginUser() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const BaseURL = import.meta.env.VITE_API_BASE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const loginUser = async (data: LoginFormData) => {
    try {
      const response = await axios.post(`${BaseURL}/auth/login`, data);
      const userData = response.data;
      //console.log(userData);
      login(userData);
      toast.success("Login successful 🎉");
      navigate("/");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow">
      <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Login
        </h2>

        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-sm text-error">{errors.email.message}</p>
        )}

        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        {errors.password && (
          <p className="text-sm text-error">{errors.password.message}</p>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>

        <div className="text-center mt-2">
          <a
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <div className="text-center mt-2">
          <span className="text-sm">
            Don’t have an account?
            <Link to="/register" className="text-primary hover:underline ml-2">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
