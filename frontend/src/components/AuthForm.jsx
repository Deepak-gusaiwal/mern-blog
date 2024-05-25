import React, { useState } from "react";
import { Button, Input } from "./helper";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// fonts
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineGoogle,
  AiTwotoneEye,
  AiTwotoneEyeInvisible,
} from "react-icons/ai";
import { AnimationWrapper } from "./index";
import { Axios } from "../utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggleIsLoading } from "../redux/basicSlice";
import { storeInSession } from "../utils/session";
import { storeLogin } from "../redux/userSlice";

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const eyeClick = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const formSubmitHandler = async (data) => {
    const { name, email, password } = data;
    try {
      dispatch(toggleIsLoading(true));
      if (type == "login") {
        //1. handle login routes
        const { data } = await Axios.post("/login", { email, password });
        if (data.success) {
          toast.success("you have login successfully");
          storeInSession("token", data.result);
          // now fetch and store user
          const {
            data: { result },
          } = await Axios.get("/user/get", {
            headers: {
              Authorization: data.result,
            },
          });
          dispatch(storeLogin({ ...result }));
          console.log("fetched data", result);
        } else {
          toast.error(data.error);
        }
      } else {
        //2. handle signup routes
        const { data } = await Axios.post("/signup", { name, email, password });
        if (data.success) {
          toast.success("you have signup successfully");
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      console.log("F:Auth Form Error ::", error);
      toast.error(error.response.data.error);
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };
  return (
    <AnimationWrapper>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="max-w-[400px] mx-auto"
      >
        <h2 className="text-3xl capitalize text-center mb-4">
          {type == "login" ? "Welcome Back" : "Join Us Today"}
        </h2>

        {type != "login" && (
          <Input
            icon={<AiOutlineUser size={"1.4rem"} />}
            {...register("name", {
              required: "name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
            type="text"
            placeholder="Enter Name"
            className="bg-slate-200 w-full mb-2"
            error={errors.name}
          />
        )}

        <Input
          icon={<AiOutlineMail size={"1.4rem"} />}
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Invalid email address",
            },
          })}
          type="email"
          placeholder="Enter Email"
          className="bg-slate-200 w-full mb-2"
          error={errors.email}
        />
        <Input
          icon={<AiOutlineLock size={"1.4rem"} />}
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "password can't be less than 6 charachters",
            },
          })}
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          className="bg-slate-200 w-full mb-2"
          error={errors.password}
          eyeClick={eyeClick}
        >
          {showPassword ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
        </Input>
        {type != "login" && (
          <Input
            icon={<AiOutlineLock size={"1.4rem"} />}
            {...register("cpassword", {
              required: "Confirm Password is required",
              validate: (value) => {
                return value === password || "Passwords do not match";
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Confim Password"
            className="bg-slate-200 w-full mb-2"
            error={errors.cpassword}
            eyeClick={eyeClick}
          >
            {showPassword ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
          </Input>
        )}

        <Button className="btn1 mb-2 mx-auto">
          {type == "login" ? "Login" : "Signup"}
        </Button>
        <hr className="bg-purple-500" />
        {type == "login" ? (
          <p className="capitalize text-center mt-1">
            Already Have Account?{" "}
            <Link className="capitalize hover:text-purple-500" to="/signup">
              signup
            </Link>
          </p>
        ) : (
          <p className="capitalize text-center mt-1">
            Don't Have Account?{" "}
            <Link className="capitalize hover:text-purple-500" to="/login">
              login
            </Link>
          </p>
        )}
        <Button className="w-fit px-4 text-white bg-zinc-800 gap-2 justify-center items-center mb-2 mx-auto hover:bg-zinc-700 mt-1">
          <AiOutlineGoogle size="1.4rem" /> Continue With Google
        </Button>
      </form>
    </AnimationWrapper>
  );
};

export default AuthForm;
