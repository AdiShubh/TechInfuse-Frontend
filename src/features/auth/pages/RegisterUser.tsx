import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/hooks/useAuth";

type RegisterFormInputs = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

const BaseURL = import.meta.env.VITE_API_BASE_URL;

export default function RegisterUser() {

  const navigate = useNavigate() 
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const response = await axios.post(`${BaseURL}/auth/register`, data);
      console.log("Registration successful:", response.data);
      toast.success("Registration Successful");
      login(response.data);
      navigate("/")
      reset();
    } catch (error :any) {
      console.error("Registration failed:", error);

    if (error.response?.status === 400 && error.response.data.message === "Email already exists") {
      toast.error("This email is already registered. Try logging in.");
    } else if (error.response?.status === 409 && error.response.data.message === "Username already taken") {
      toast.error("This username is already taken. Please choose another.");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  }
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-base-200 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-3xl font-extrabold text-center text-base-content mb-6">
          Register
        </h2>

        <div className="form-control">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-sm text-error mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="form-control">
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
          />
          {errors.username && (
            <p className="text-sm text-error mt-1">{errors.username.message}</p>
          )}
        </div>

        <div className="form-control">
          <input
            {...register("email")}
            type="text"
            placeholder="Email Address"
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-sm text-error mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="form-control">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-sm text-error mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="form-control">
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-error mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Registering..." : "Register now"}
        </button>
      </form>
    </div>
  );
}
