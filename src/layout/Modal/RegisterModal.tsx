import Button from "@/layout/Button/Button";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth, firestore } from "@/app/firebase/clientApp";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AiFillMail } from "react-icons/ai";
import { BiSolidLock } from "react-icons/bi";
import { ModalStatusType } from "./Modal";
import { UserCredType } from "./userCredType";

type RegisterModalProps = {
  userCred: UserCredType;
  setUserCred: React.Dispatch<React.SetStateAction<UserCredType>>;
  setModalStatus: React.Dispatch<React.SetStateAction<ModalStatusType>>;
};

const RegisterModal: React.FC<RegisterModalProps> = ({
  userCred,
  setUserCred,
  setModalStatus,
}) => {
  const {
    register,
    handleSubmit,
    setError: setUseFormError,
    setFocus,
    formState: { errors },
  } = useForm<UserCredType>();
  const [
    createUserWithEmailAndPassword,
    userCredentials,
    loading,
    firebaseError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [error, setError] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
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
    setUserEmail(data.currentPassword);
    createUserWithEmailAndPassword(data.email, data.currentPassword);
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
  useEffect(() => {
    const createUserDocument = async (user: User) => {
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(
        userDocRef,
        JSON.parse(
          JSON.stringify({
            ...user,
            firstName: "",
            lastName: "",
            email: userEmail,
            picture: "",
            userLink: [],
          })
        )
      );
    };
    if (userCredentials) {
      createUserDocument(userCredentials.user);
    }
  }, [userCredentials, userEmail]);
  return (
    <div>
      <h2 className="text-headingMMobile sm:text-headingM mb-2">
        Create account
      </h2>
      <p className="text-grey mb-10">
        Let`s get you started sharing your links!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="email"
          className={`text-bodyS ${
            errors?.email ? "text-red" : "text-darkGrey"
          }`}
        >
          Email address
        </label>
        <div className="relative">
          <AiFillMail className="absolute top-5 left-4 text-grey" />
          <input
            defaultValue={userCred.email}
            type="text"
            id="email"
            placeholder="e.g. alex@email.com"
            className={`mt-1 mb-6 pl-11 pr-4 py-3 border-[1px] text-bodyM rounded-lg w-full hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple 
     ${errors?.email ? "text-red border-red" : "text-black border-borders"}`}
            {...register("email", {
              required: "Can't be empty",
              onChange(event) {
                onChange(event);
              },
            })}
          />
          {errors?.email && (
            <p className="text-red text-bodyS absolute sm:top-4 right-4 top-[-1.5rem]">
              {errors.email.message}
            </p>
          )}
        </div>
        <label
          htmlFor="currentPassword"
          className={`${
            errors?.currentPassword ? "text-red" : "text-darkGrey"
          } text-bodyS`}
        >
          Create Password
        </label>
        <div className="relative">
          <BiSolidLock className="absolute top-5 left-4 text-grey" />
          <input
            autoComplete="on"
            defaultValue={userCred.currentPassword}
            type="password"
            id="currentPassword"
            placeholder="Enter your password"
            className={`mt-1 mb-6 pl-11 pr-4 py-3 border-[1px] text-bodyM rounded-lg w-full hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
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
            <p className="text-red text-bodyS absolute sm:top-5 right-4 top-[-1.5rem]">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <label
          htmlFor="repeatPassword"
          className={` ${
            errors?.repeatPassword ? "text-red" : "text-darkGrey"
          } text-bodyS`}
        >
          Confirm Password
        </label>
        <div className="relative">
          <BiSolidLock className="absolute top-4 left-4 text-grey" />
          <input
            autoComplete="on"
            type="password"
            id="repeatPassword"
            placeholder="At least .8 characters"
            className={`pl-11 pr-4 py-3 border-[1px] text-bodyM rounded-lg w-full hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple 
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
            <p className="text-red text-bodyS absolute sm:top-4 right-4 top-[-1.5rem]">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
        <p className="text-bodyXS text-grey my-6">
          Password must contain at least 8 characters
        </p>
        <p className="text-red text-bodyS mb-2">
          {error && "Invalid e-mail or password"}
        </p>
        <Button role="primary" loading={loading}>
          Create new account
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
