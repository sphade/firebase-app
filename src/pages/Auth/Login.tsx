import TextField from "@mui/material/TextField";
import Btn from "@mui/material/Button";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, PasswordInput } from "../../components";
import { useForm } from "react-hook-form";
import { emailValidation } from "../../validation/emailValidation";
import Textinput from "../../components/Textinput";
import { auth } from "../../firebase/firebase-config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
  });
  // useEffect(() => {
  //   if (user) {
  //     navigate('/')
  //   }
  // }, [navigate, user])

  const onSubmit = async (data: any) => {
   await signInWithEmailAndPassword(data?.email, data?.password);
    
      navigate("/");
    
  };
  return (
    <form
      className="rounded-lg bg-white center w-[460px]  shadow-xl  p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-tertiary text-center uppercase text-base font-bold mb-10">
        sign in
      </h1>
      <div className="space-y-5">
        <TextField
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: emailValidation,
              message: "invalid email format",
            },
          })}
          fullWidth
          error={!!errors?.email}
          helperText={errors?.email && errors?.email?.message}
          label="Email Address"
          type="email"
          autoComplete="email"
        />

        <PasswordInput
          rules={{
            required: "this field is required",
            minLength: {
              value: 8,
              message: "password must be more than 8 characters",
            },
          }}
          control={control}
          name={"password"}
          label="password"
        />
      </div>
      <Link
        to="/forgot-password/step-1"
        className="float-right text-xs mt-2 clear-both  text-gray-900 capitalize hover:text-primary default-transistion"
      >
        forgot password?
      </Link>

      <div className="mt-[50px] ">
        <Btn fullWidth variant="contained" type="submit">
          {loading ? "loading..." : " sign in"}
        </Btn>
      </div>
      <p className="text-xs mt-2">
        Don't have an account,
        <Link to="/register" className="text-primary">
          {" "}
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
