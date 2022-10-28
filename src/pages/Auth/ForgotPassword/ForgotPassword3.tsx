import { useForm } from "react-hook-form";
import { Button, PasswordInput } from "../../../components";
import localforage from "localforage";
import {  useState,useEffect } from "react";


const ForgotPassword3 = () => {
  const [email,setEmail]= useState<any>('')
  const [otp,setOtp]= useState<any>('')
  const {
    
    control,
    watch,
    handleSubmit,
    
  } = useForm();
  useEffect(() => {
    localforage.getItem('email', (err,value:any) => {
      setEmail(value)
    })
    localforage.getItem('forgotPasswordOtp', (err,value:any) => {
      setOtp(value)
    })
  }, [])
  
  const onSubmit = (data: any) => {
    console.log(data)
  };
  return (
    <div className="w-[680px] py-[50px] rounded-lg shadow-lg bg-secondary center-element">
      <div className="w-[60%]">
        <h3 className="text-tertiary text-center uppercase text-lg font-bold mb-3">
          Reset Password
        </h3>
        <p className="text-center text-base text-gray-600 mb-10">
          You can now create a new password
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
        
          <div className="space-y-5 mb-10">
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
            label="New Password"
          />
          <PasswordInput
            label="confirm password"
            control={control}
            name="confirmPassword"
            rules={{
              required: "this field is required",
              validate: (val: string) => {
                if (watch("password") !== val) {
                  return "your password does not watch";
                }
              },
            }}
          />
          </div>
         
          <Button variant="tertiary" full
          >
          reset password
        </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword3;
