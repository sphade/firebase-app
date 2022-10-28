import TextField from "@mui/material/TextField";
import { PasswordInput, Button } from "../../components";
import { CameraBoxIcon, CameraIcon } from "../../assets/images/icons";
import PhoneInput from "react-phone-input-2";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "../../validation/emailValidation";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSignUpInfo } from "../../redux/slices/SignUpInfoSlice";
import { useSnackbar } from "notistack";
import ImageUploading from "react-images-uploading";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase/firebase-config";
import { useAuth } from "../../hooks";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  // const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileDataURL, setFileDataURL] = useState<string>();
  const [picUrl, setPicUrl] = useState<any>();

  const user = useAuth();
  console.log("🚀 ~ file: Register.tsx ~ line 25 ~ Register ~ user", user);
  const metadata = {
    contentType: "image/*",
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    let fileReader: any,
      isCancel: any = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);
  const onSubmit = async (data: any) => {
    if (!data.acceptTerms) {
      enqueueSnackbar("please accept the terms and conditions", {
        variant: "info",
      });
      return;
    }

    if (!image) {
      enqueueSnackbar("add a company logo", {
        variant: "info",
      });
      return;
    }
    try {
      setLoading(true);
      const storageRef = ref(storage, `profilePics/${image?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error: any) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(userCredential.user, {
              displayName: data?.businessName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "vendors", userCredential.user.uid), {
              name: data?.businessName,
              email: data?.email,
              phoneNumber: data?.phone,
              businessAddress: data?.businessAddress,
              photoUrl: downloadURL,
              uid: userCredential.user.uid,
            });

            await setDoc(doc(db, "vendorsAirCrafts", userCredential.user.uid), {
              airCrafts: [],
            });
            navigate("/");
          });
        }
      );
    } catch (err) {
      alert(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
    //  localforage.setItem("signUpInfo", {...data,images});
  };
  return (
    <div className="w-[558px] rounded-lg shadow-lg px-10  mb-[100px] py-10 border  relative   bg-secondary">
      <div className="mb-10 text-center">
        <h1 className="text-tertiary  uppercase text-lg font-bold mb-10">
          Sign Up
        </h1>

        <div className="relative  h-5">
          {!fileDataURL ? (
            <label htmlFor="pic" className="relative cursor-pointer">
              <input
                type="file"
                onChange={(e: any) => {
                  setImage(e?.target?.files[0]);
                }}
                className="hidden"
                accept="images/*"
                id="pic"
              />

              <CameraBoxIcon className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
              <CameraIcon className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
            </label>
          ) : (
            <img
              src={fileDataURL}
              alt="const"
              className="w-[100px] mx-auto rounded h-[100px] mb-10"
            />
          )}
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Business Name"
          type={"text"}
          {...register("businessName", {
            required: "this field is required",
          })}
          helperText={errors.businessName && errors.businessName.message}
          error={errors.businessName}
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
          helperText={errors?.email && errors?.email.message}
          error={errors?.email}
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
          label="Business Address"
          type={"text"}
          {...register("businessAddress", {
            required: "this field is required",
          })}
          helperText={errors.businessAddress && errors.businessAddress.message}
          error={errors.businessAddress}
        />
        <PasswordInput
          label="password"
          control={control}
          name="password"
          rules={{
            required: "this field is required",
            minLength: {
              value: 8,
              message: "password must be more than 8 characters",
            },
          }}
        />
        <PasswordInput
          label="confirm password"
          control={control}
          name="confirmPassword"
          rules={{
            required: "this field is required",
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "your password does not match";
              }
            },
          }}
        />

        <div className="flex items-center justify-between w-full gap-3">
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} id="terms" name="terms" />
            )}
          />

          <label className="text-sm " id="terms" htmlFor="terms">
            By creating a Bossbus Premium Account, I understand and agree to
            Bossbus’s Privacy Notice and Terms of Use
          </label>
        </div>
        <div className="pt-5">
          <Button full variant="primary" loading={loading}>
            sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
