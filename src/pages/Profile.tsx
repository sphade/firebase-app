import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import PhoneInput from "react-phone-input-2";
import Btn from "@mui/material/Button";

import { ChangePictureIcon } from "../assets/images/icons";
import {
  Button,
  EmailModal,
  BackButton,
  PasswordInput,
  Loading,
} from "../components";

import { useForm } from "react-hook-form";
import {
  AvatarModal,
  PasswordModal,
  PhoneNumberModal,
} from "../components/modal/ProfileModal";
import { useAuthUser, useUser } from "../hooks/queries";

const Profile = () => {
const {data:userAuth,isLoading:userAuthLoading} = useAuthUser() 
const {data:user,isLoading:userIsLoading} = useUser(userAuth?.uid || '') 

  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      password: "************",
    },
  });

  const [edit, setEdit] = React.useState(false);
  const [emailModalState, setEmailModalState] = React.useState(false);
  const [numberModalState, setNumberModalState] = React.useState(false);
  const [passwordModalState, setPasswordModalState] = React.useState(false);
  const [avatarModalState, setAvatarModalState] = React.useState(false);

  if (userIsLoading || userAuthLoading) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex gap-5 mx-auto items-start  w-fit py-20 relative  ">
      <BackButton />
      <div className="border">
        <EmailModal
          modalState={emailModalState}
          setModalState={setEmailModalState}
        />
        <PhoneNumberModal
          modalState={numberModalState}
          setModalState={setNumberModalState}
        />

        <PasswordModal
          modalState={passwordModalState}
          setModalState={setPasswordModalState}
        />
        <AvatarModal
          modalState={avatarModalState}
          setModalState={setAvatarModalState}
          currentPic={"user?.data()?.data.logo"}
        />
        <div className="w-[684px]  text-center shadow-lg border bg-secondary rounded-lg ">
          <h1 className="text-2xl text-tertiary font-semibold capitalize my-10">
            edit profile
          </h1>

          <>
            <div className="relative mb-5  ">
              <div className="relative w-fit mx-auto ">
                <Avatar
                  alt="avatarIcon"
                  className="!h-32 !w-32 mx-auto !relative"
                  sx={{
                    h: "128px",
                  }}
                  src={user?.data()?.photoUrl || ""}
                />
                {edit && (
                  <ChangePictureIcon
                    className=" cursor-pointer absolute right-[13px] bottom-[0px] "
                    onClick={() => {
                      setAvatarModalState(true);
                    }}
                  />
                )}
              </div>
            </div>

            <form className="space-y-5 w-[390px] mx-auto mb-10">
              <TextField
                fullWidth
                aria-readonly
                label="Business Name"
                type={"text"}
                defaultValue={user?.data()?.name}
                InputProps={{
                  readOnly: !edit,
                }}
                {...register("name", {
                  required: "this field is required",
                })}
                error={errors?.name}
                helperText={errors?.name && errors?.name?.message}
              />
              <TextField
                fullWidth
                label="Email Address"
                value={user?.data()?.email}
                type={"email"}
                InputProps={{
                  readOnly: true,
                }}
              />
              <PhoneInput
                country={"ng"}
                placeholder="phone Number"
                enableSearch={true}
                containerClass="!w-full"
                inputClass="!w-full !cursor-text"
                value={user?.data()?.phoneNumber}
                disabled
              />
              <TextField
                fullWidth
                defaultValue={user?.data()?.businessAddress}
                type="text"
                InputProps={{
                  readOnly: !edit,
                }}
                label="Business Address"
                {...register("address", {
                  required: "this field is required",
                })}
                error={errors.address}
                helperText={errors?.address && errors?.address?.message}
              />{" "}
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
                disabled
              />
              {!edit ? (
                <Btn
                  onClick={(e: any) => {
                    e.preventDefault();
                    setEdit(true);
                  }}
                  fullWidth
                  variant="contained"
                >
                  sign in
                </Btn>
              ) : (
                <Button
                  full
                  onClick={(e: any) => {
                    e.preventDefault();
                    setEdit(false);
                  }}
                >
                  save
                </Button>
              )}
            </form>
          </>

          {edit ? (
            <>
              <p
                onClick={() => setEmailModalState(true)}
                className="absolute top-[430px] cursor-pointer right-[80px] text-base text-primary font-semibold capitalze "
              >
                change
              </p>
              <p
                onClick={() => setNumberModalState(true)}
                className="absolute top-[510px] cursor-pointer right-[80px] text-base text-primary font-semibold capitalze "
              >
                change
              </p>
              <p
                onClick={() => setPasswordModalState(true)}
                className="absolute top-[670px] cursor-pointer right-[80px] text-base text-primary font-semibold capitalze "
              >
                change
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
