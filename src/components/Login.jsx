import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError(""); //errors should be gone before submitting
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <div>
          <span>
            <Logo width="100%" />
          </span>
        </div>
        <h2>sign in to your account?</h2>
        <p>
          dont have any account? <Link to="/signup">sign up</Link>
        </p>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div>
            <Input
              type="email"
              label="email: "
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
              label="password"
              type="password"
              placeholder="enter your password: "
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
