import Button from "@/layout/Button/Button";
import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { auth } from "@/app/firebase/clientApp";
import { userAccountState } from "@/atoms/userAccountAtom";
import useDataFromFirebase from "@/utility/useDataFromFirebase";
import { AiFillMail } from "react-icons/ai";
import { BiSolidLock } from "react-icons/bi";
import { ModalStatusType } from "./Modal";
import { UserCredType } from "./userCredType";
type LoginModalProps = {
  open: boolean;
  userCred: UserCredType;
  setUserCred: React.Dispatch<React.SetStateAction<UserCredType>>;
  setModalStatus: React.Dispatch<React.SetStateAction<ModalStatusType>>;
};

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  userCred,
  setUserCred,
  setModalStatus,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredType>();
  const [signInWithEmailAndPassword, userName, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);
  const [error, setError] = useState(false);
  const { getCurrentUserData } = useDataFromFirebase();
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const [user] = useAuthState(auth);
  const onSubmit: SubmitHandler<UserCredType> = (data) =>
    signInWithEmailAndPassword(data.email, data.currentPassword);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCred((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    if (error) setError(false);
  };
  useEffect(() => {
    if (firebaseError?.message) setError(true);
  }, [firebaseError?.message]);

  useEffect(() => {
    if (userName) {
      getCurrentUserData();
    }
  }, [getCurrentUserData, setUserAccount, user, userName]);

  return (
    <div>
      <h2 className="text-headingMmobile sm:text-headingM mb-2">Login</h2>
      <p className="text-grey mb-10">
        Add your details below to get back into the app
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          <p
            className={` ${
              errors?.email ? "text-red" : "text-darkGrey"
            } text-bodyS pt-6 pb-1`}
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
            Password
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
            className={`pl-11 pr-4 py-3 border-[1px] mb-6 text-bodyM rounded-lg w-full hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
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
        <p className="text-red text-bodyS mb-2">
          {error && "Invalid e-mail or password"}
        </p>
        <Button role="primary" cssClass="mb-6" loading={loading}>
          Login
        </Button>
      </form>
      <p className="text-center text-grey">
        Don`t have an account?
        <span
          className="text-purple block sm:inline-block w-[150px] sm:w-auto mx-auto hover:text-purpleHover cursor-pointer"
          onClick={() => setModalStatus("register")}
        >
          Create account
        </span>
      </p>
    </div>
  );
};
export default LoginModal;
