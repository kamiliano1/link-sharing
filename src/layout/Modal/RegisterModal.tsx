import React, { useEffect, useState } from "react";
import logoBig from "../../../public/icons/logo-devlinks-large.svg";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/layout/Button/Button";
import { useRecoilState } from "recoil";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
// import { userCredState } from "../atoms/userCredAtom";
// import EmailIcon from "@/public/icons/icon-email.svg";
// import PasswordIcon from "@/public/icons/icon-password.svg";
import { auth } from "@/app/firebase/clientApp";
import { UserCredType } from "./userCredType";
import { ModalStatusType } from "./Modal";
import { AiFillMail } from "react-icons/ai";
import { BiSolidLock } from "react-icons/bi";
import { ClipLoader } from "react-spinners";

type RegisterModalProps = {
  open: boolean;
  userCred: UserCredType;
  setUserCred: React.Dispatch<React.SetStateAction<UserCredType>>;
  setModalStatus: React.Dispatch<React.SetStateAction<ModalStatusType>>;
};

const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  userCred,
  setUserCred,
  setModalStatus,
}) => {
  // const [userCred, setUserCred] = useRecoilState(userCredState);
  const {
    register,
    handleSubmit,
    setError: setUseFormError,
    setFocus,
    formState: { errors },
  } = useForm<UserCredType>();
  // const [modalStatus, setModalStatus] = useState<ModalStatusType>("login");
  const [signInWithEmailAndPassword, userName, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);
  const [error, setError] = useState(false);
  const onSubmit: SubmitHandler<UserCredType> = (data) => {
    if (userCred.currentPassword.length < 8)
      setUseFormError("currentPassword", {
        message: "At least 8 characters",
      });
    setFocus("currentPassword");
    if (userCred.repeatPassword.length < 8) {
      setUseFormError("repeatPassword", {
        message: "At least 8 characters",
      });
      setFocus("repeatPassword");
      return;
    }
    // signInWithEmailAndPassword(data.email, data.currentPassword);
    if (userCred.currentPassword !== userCred.repeatPassword) {
      setUseFormError("currentPassword", {
        message: "Passwords does not match",
      });
      setFocus("currentPassword");
      setUseFormError("repeatPassword", {
        message: "Passwords does not match",
      });
      return;
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserCred((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (firebaseError?.message) setError(true);
  }, [firebaseError?.message]);

  // useEffect(() => {
  //   setError(false);
  // }, [userCred.email, userCred.password]);
  return (
    <div>
      <h2 className="text-headingMmobile sm:text-headingM mb-2">
        Create account
      </h2>
      <p className="text-grey mb-10">
        Let`s get you started sharing your links!
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          <p
            className={` ${
              errors?.email ? "text-red" : "text-darkGrey"
            } text-bodyS  pb-1`}
          >
            Email address
          </p>
        </label>
        <div className="relative">
          <AiFillMail
            className="absolute top-4 left-4 text-grey"
            alt="link icon"
          />
          <input
            defaultValue={userCred.email}
            type="text"
            id="email"
            placeholder="e.g. alex@email.com"
            className={`pl-11 pr-4 py-3 border-[1px] text-bodyM rounded-lg w-full hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple 
     ${errors?.email ? "text-red border-red" : "text-black border-borders"}`}
            {...register("email", {
              required: "Can't be empty",
              onChange(event) {
                onChange(event);
              },
            })}
          />
          {errors?.email && (
            <p className="text-red text-bodyS absolute top-4 right-4">
              {errors.email.message}
            </p>
          )}
        </div>
        <label htmlFor="currentPassword">
          <p
            className={` ${
              errors?.currentPassword ? "text-red" : "text-darkGrey"
            } text-bodyS pt-6 pb-1`}
          >
            Create Password
          </p>
        </label>
        <div className="relative">
          <BiSolidLock
            className="absolute top-4 left-4 text-grey"
            alt="link icon"
          />
          <input
            autoComplete="on"
            defaultValue={userCred.currentPassword}
            type="password"
            id="currentPassword"
            placeholder="Enter your password"
            className={`pl-11 pr-4 py-3 border-[1px] text-bodyM rounded-lg w-full hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
              errors?.currentPassword
                ? "text-red border-red"
                : "text-black border-borders"
            }`}
            {...register("currentPassword", {
              required: "Can't be empty",
              onChange(event) {
                onChange(event);
              },
            })}
          />
          {errors?.currentPassword && (
            <p className="text-red text-bodyS absolute top-4 right-4">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <label htmlFor="repeatPassword">
          <p
            className={` ${
              errors?.repeatPassword ? "text-red" : "text-darkGrey"
            } text-bodyS pt-6 pb-1`}
          >
            Confirm Password
          </p>
        </label>
        <div className="relative">
          <BiSolidLock
            className="absolute top-4 left-4 text-grey"
            alt="link icon"
          />
          <input
            autoComplete="on"
            type="password"
            id="repeatPassword"
            placeholder="At least .8 characters"
            className={`pl-9 pr-4 py-3 border-[1px]  text-bodyM rounded-lg w-full hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple 
         ${
           errors?.repeatPassword
             ? "text-red border-red"
             : "text-black border-borders"
         }`}
            {...register("repeatPassword", {
              required: "Can't be empty",

              onChange(event) {
                onChange(event);
              },
            })}
          />
          {errors?.repeatPassword && (
            <p className="text-red text-bodyS absolute top-4 right-4">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
        <p className="text-bodyXS text-grey my-6">
          Password must contain at least 8 characters
        </p>
        <p className="text-red text-bodyS mt-2">{error}</p>
        <Button role="primary">
          {loading ? (
            <ClipLoader size={23} color="hsl(0, 0%, 100%)" />
          ) : (
            "Create new account"
          )}
        </Button>
      </form>

      <p className="text-center text-grey mt-6">
        Already have an account?
        <span
          className="text-purple block sm:inline-block w-[150px] sm:w-auto mx-auto hover:text-purpleHover cursor-pointer"
          onClick={() => setModalStatus("login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};
export default RegisterModal;
