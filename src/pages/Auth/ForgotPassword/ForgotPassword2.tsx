import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components";
import localforage from "localforage";
import { useSnackbar } from "notistack";

import { useEffect } from "react";
const ForgotPassword2 = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { option } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  return (
    <div className="w-[680px] py-[50px] rounded-md shadow-lg bg-secondary center-element">
      <div className="w-[60%]">
        <h3 className="text-tertiary text-center uppercase text-lg font-bold mb-2">
          Forgot Password
        </h3>

        <p className="text-center text-base text-gray-600 mb-10">
          {option === "phoneNumber"
            ? "A reset code would be sent to you shortly"
            : "A reset code would be emailed to you shortly"}
        </p>
        <TextField
          fullWidth
          label={option === "phoneNumber" ? "Phone Number" : "Email"}
          className="!mb-10"
          {...register(option === "phoneNumber" ? "phoneNumber" : "email", {
            required: "this field is required",
          })}
          error={errors.email || errors.phoneNumber}
          helperText={
            (errors?.email || errors.phoneNumber) &&
            (errors?.email?.message || errors?.phoneNumber?.message)
          }
        />
        <Button
          variant="tertiary"
          full
        >
          send code
        </Button>
        <p className="text-center mt-3">
          Didn't get the code,{" "}
          <Link
            className="text-primary font-semibold cursor-pointer"
            to={`/forgot-password/step-2/${
              option === "phoneNumber" ? "email" : "phoneNumber"
            }`}
          >
            use {option === "phoneNumber" ? "Email" : "Phone Number"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword2;
