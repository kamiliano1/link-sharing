import { firestore, storage } from "@/app/firebase/clientApp";
import { popUpState } from "@/atoms/togglePopUpAtom";
import { UserAccountState, userAccountState } from "@/atoms/userAccountAtom";
import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LiaImageSolid } from "react-icons/lia";
import { useRecoilState } from "recoil";
import Button from "../Button/Button";
import CustomizeUserAccountSkeleton from "../Skeletons/CustomizeUserAccountSkeleton";
type CustomizeUserAccountProps = {
  user: User | null | undefined;
  loading: boolean;
};

const CustomizeUserAccount: React.FC<CustomizeUserAccountProps> = ({
  user,
  loading,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const [isPopUpOpen, setIsPopUpOpen] = useRecoilState(popUpState);
  const [isAvatarChanged, setIsAvatarChanged] = useState<boolean>(false);
  const [pictureURL, setPictureURL] = useState<string>(
    userAccount.picture || ""
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<UserAccountState>({ defaultValues: { picture: "" } });
  const selectedFileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    reset();
  }, [reset, userAccount]);
  const formSubmit: SubmitHandler<UserAccountState> = async (data) => {
    setIsLoading(true);
    try {
      const userLinkRef = doc(firestore, `users/${user?.uid}`);
      if (userAccount.picture) {
        const imageRef = ref(storage, `avatars/${user?.uid}/image`);
        await uploadString(imageRef, userAccount.picture, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(userLinkRef, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
        if (isAvatarChanged)
          await updateDoc(userLinkRef, {
            picture: downloadURL,
          });
      }
    } catch (error: any) {
      console.log("handleSendingAvatarError", error.message);
    }

    setIsLoading(false);
    setIsAvatarChanged(false);
    setIsPopUpOpen({ togglePopUp: true });
  };
  useEffect(() => {
    setPictureURL(userAccount.picture || "");
  }, [userAccount.picture]);
  useEffect(() => {
    setIsPopUpOpen({ togglePopUp: false });
  }, [setIsPopUpOpen]);
  const onSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      if (e.target.files[0].size / 1024 > 1024) return;
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setPictureURL(readerEvent.target.result as string);
        setValue("picture", readerEvent.target.result as string);
        setUserAccount((prev) => ({
          ...prev,
          picture: readerEvent.target?.result as string,
        }));
      }
      setIsAvatarChanged(true);
    };
  };
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAccount((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col mx-auto lg:mx-0 lg:max-w-[808px] lg:w-full"
    >
      <div className="p-6 m-4 sm:m-6 sm:mb-0 mb-0 flex flex-col bg-white sm:h-[729.5px] relative rounded-md">
        <h1 className="mb-2 text-headingMMobile sm:text-headingM">
          Profile Details
        </h1>

        <p className="mb-10 text-bodyM text-grey">
          Add your details to create a personal touch to your profile.
        </p>
        {loading ? (
          <CustomizeUserAccountSkeleton />
        ) : (
          <>
            <div className="items-center p-5 sm:flex bg-lightGrey rounded-xl">
              <p className="text-bodyM text-grey mb-4 sm:mb-0 sm:w-[37%] sm:min-w-[188.87px]">
                Profile picture.
              </p>
              <input
                type="file"
                onChange={onSelectAvatar}
                ref={selectedFileRef}
                hidden
                accept=".png,.jpg"
              />
              <div
                style={{
                  backgroundImage: `url(${pictureURL})`,
                }}
                className={`text-purple bg-lightPurple mb-6 sm:mb-0 flex flex-col items-center text-headingS bg-cover bg-no-repeat w-min px-10 py-[3.75rem] cursor-pointer relative rounded-xl sm:w-[193px] ${
                  pictureURL &&
                  "hover:text-white hover:bg-grey bg-blend-multiply"
                }`}
                onClick={() => selectedFileRef.current?.click()}
              >
                <LiaImageSolid className="text-[2.5rem] " />
                <p className="w-[116px]">+ Upload Image</p>
              </div>
              <p className="text-bodyXS text-grey sm:max-w-[127px] sm:ml-6">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
            <div className="p-5 mt-6 sm:flex sm:flex-col sm:gap-3 bg-lightGrey rounded-xl">
              <div className="relative sm:flex sm:items-center">
                <div className="mb-1 sm:mb-0 sm:w-[37%]">
                  <label
                    htmlFor="firstName"
                    className="text-bodyXS sm:text-bodyM cursor-pointer text-grey"
                  >
                    First name*
                  </label>
                </div>
                <input
                  {...register("firstName", {
                    required: "Can`t be empty",
                    onChange(e) {
                      onHandleChange(e);
                    },
                  })}
                  id="firstName"
                  type="text"
                  defaultValue={userAccount.firstName}
                  placeholder="e.g. John"
                  className={`px-4 w-full sm:w-[63%] py-3 border-[1px] mb-3 sm:mb-0 border-borders max-w-[668px] text-bodyM rounded-lg text-black hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
                    errors.firstName && "text-red border-red"
                  }`}
                />
                <p className="text-red text-bodyXS absolute top-[2.7rem] sm:top-4 right-4">
                  {errors.firstName?.message}
                </p>
              </div>
              <div className="relative sm:flex sm:items-center">
                <div className="mb-1 sm:mb-0 sm:w-[37%]">
                  <label
                    htmlFor="lastName"
                    className="ext-bodyXS sm:text-bodyM cursor-pointer text-grey"
                  >
                    Last name*
                  </label>
                </div>

                <input
                  {...register("lastName", {
                    required: "Can`t be empty",
                    onChange(e) {
                      onHandleChange(e);
                    },
                  })}
                  id="lastName"
                  type="text"
                  defaultValue={userAccount.lastName}
                  placeholder="e.g. Appleseed"
                  className={`px-4 w-full sm:w-[63%] py-3 border-[1px] mb-3 sm:mb-0 border-borders max-w-[668px] text-bodyM rounded-lg text-black hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
                    errors.lastName && "text-red border-red"
                  }`}
                />
                <p className="text-red text-bodyXS absolute top-[2.7rem] sm:top-4 right-4">
                  {errors.lastName?.message}
                </p>
              </div>
              <div className="relative sm:flex sm:items-center">
                <div className="mb-1 sm:mb-0 sm:w-[37%]">
                  <label
                    htmlFor="email"
                    className="text-bodyXS sm:text-bodyM cursor-pointer text-grey"
                  >
                    Email
                  </label>
                </div>

                <input
                  {...register("email", {
                    onChange(e) {
                      onHandleChange(e);
                    },
                  })}
                  id="email"
                  type="text"
                  defaultValue={userAccount.email}
                  placeholder="e.g. email@example.com"
                  className="px-4 w-full sm:w-[63%] py-3 border-[1px] sm:mb-0 border-borders max-w-[668px] text-bodyM rounded-lg text-black hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <span className="h-[1px] inline-block bg-borders mx-4 sm:mx-6"></span>
      <div className="p-4 m-4 mt-0 bg-white sm:m-6 sm:mt-0">
        <Button
          role="primary"
          cssClass="sm:w-min sm:px-7 sm:ml-auto"
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};
export default CustomizeUserAccount;
