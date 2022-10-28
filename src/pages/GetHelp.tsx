import { EmailIcon, PhoneIcon } from "../assets/images/icons";
import TextField from "@mui/material/TextField";
import { BackButton, Button } from "../components";
import PhoneInput from "react-phone-input-2";
import { Controller, useForm } from "react-hook-form";
import { emailValidation } from "../validation/emailValidation";
import Btn from "@mui/material/Button";

import { formatPhoneNumber } from "../utils/formatPhoneNumber";

const GetHelp = () => {
 
  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();
  
  return (
    <div className="flex gap-5 mx-auto items-start  w-fit py-20 ">
      <BackButton />

      <div className="w-[520px]  shadow px-[75px] bg-secondary rounded-lg ">
        <h1 className="text-2xl text-tertiary  text-center font-semibold capitalize my-10">
          get help
        </h1>

        <div className="flex items-center mb-10 gap-3">
          <EmailIcon />
          <p className="text-gray-500 font-semibold">
            Email:{" "}
            <span className=" text-tertiary">
              bossbuspremiumworld@gmail.com
            </span>
          </p>
        </div>

        <div className="flex items-center mb-8 gap-5">
          <PhoneIcon />
          <p className="text-gray-500 font-semibold flex">
            mobile:{" "}
            <span className=" text-tertiary">
              081 234 432 34
            </span>
          </p>
        </div>
        <hr className="border-[#BDBDBD]" />
        <div>
          <h1 className="text-2xl text-tertiary  font-semibold capitalize my-5">
            message
          </h1>
          <form  className="mb-20 space-y-5">
            <TextField
              fullWidth
              label="full Name"
              type={"text"}
              {...register("fullName", {
                required: "this field is required",
              })}
              helperText={errors.fullName && errors.fullName.message}
              error={errors.fullName}
            />
            <TextField
              fullWidth
              label="Email Address"
              type={"email"}
              {...register("email", {
                required: "this field is required",
                pattern: {
                  value: emailValidation,
                  message: "invalid email format",
                },
              })}
              helperText={errors.email && errors.email.message}
              error={errors.email}
            />
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "this field is required",
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={"ng"}
                  placeholder="phone number"
                  enableSearch={true}
                  containerClass="!w-full "
                  inputClass="!w-full "
                  inputProps={{
                    name: "number",
                    required: true,
                  }}
                  isValid={() => {
                    if (errors.phone) {
                      return errors.phone.message;
                    } else {
                      return true;
                    }
                  }}
                />
              )}
            />

            <TextField
              fullWidth
              label="Message"
              type={"text"}
              {...register("message", {
                required: "this field is required",
              })}
              helperText={errors.message && errors.message.message}
              error={errors.message}
              multiline
              rows={5}
            />

            
            <Btn fullWidth variant="contained" type='submit' >
        create aircraft
        </Btn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetHelp;
