import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Input, Button, SmallLoadingSVG } from "./index";

export default function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const Signup = async (data) => {
    setError("");
    setLoading(true);
    try {
      const newUser = await authService.createAccount(data);
      if (newUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        }
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl mb-5">Sign up for an account</h2>
      <p className="mb-5">
        Already have an account?{" "}
        <Link to="/login">
          <span className="underline">Log in</span>
        </Link>
      </p>
      {error && <p className="mb-8">{error}</p>}
      <form
        onSubmit={handleSubmit(Signup)}
        className="bg-[#242629] flex flex-col rounded-3xl p-16"
      >
        <Input
          label="name: "
          placeholder="enter your full name"
          className="rounded-lg text-black my-4"
          {...register("name", { required: true })}
        />
        <Input
          type="email"
          label="email: "
          className="rounded-lg text-black my-4"
          placeholder="enter your email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(value) ||
                "email address must be a valid address",
            },
          })}
        />
        <Input
          type="password"
          label="password: "
          placeholder="enter your password"
          className="rounded-lg text-black my-4"
          {...register("password", { required: true })}
        />
        <Button
          type="submit"
          className={`mt-6 ${loading ? "flex justify-center" : null}`}
          disabled={loading}
        >
          {loading ? <SmallLoadingSVG /> : "Create account"}
        </Button>
      </form>
    </div>
  );
}
