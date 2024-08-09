import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, SmallLoadingSVG } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError(""); //errors should be gone before submitting
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center grow justify-center">
      <h2 className="text-4xl mb-5">Log in to your account</h2>
      <p className="mb-5">
        Dont have an account?{" "}
        <Link to="/signup">
          <span className="underline">Sign up</span>
        </Link>
      </p>
      {error && <p className="mb-8">{error}</p>}
      <form
        onSubmit={handleSubmit(login)}
        className="bg-[#242629] flex flex-col rounded-3xl p-16"
      >
        <Input
          type="email"
          label="Email: "
          placeholder="enter your email"
          className="rounded-lg text-black my-4"
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
          className="rounded-lg text-black my-4"
          label="Password"
          type="password"
          placeholder="enter your password: "
          {...register("password", {
            required: true,
          })}
        />
        <Button
          type="submit"
          className={`mt-6 ${loading ? "flex justify-center" : null}`}
          disabled={loading}
        >
          {loading ? <SmallLoadingSVG /> : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
