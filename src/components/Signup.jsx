import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Input, Button } from "./index";

export default Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const Signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const user = await authService.getCurrentUser();
        if (user) dispatch(login(user));
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
        <form onSubmit={handleSubmit(Signup)}>
          <div>
            <Input
              label="name: "
              placeholder="enter your full name"
              {...register("name", { required: true })}
            />
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
              type="password"
              label="password: "
              placeholder="enter your password"
              {...register("password", { required: true })}
            />
            <Button type="submit">create account</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
