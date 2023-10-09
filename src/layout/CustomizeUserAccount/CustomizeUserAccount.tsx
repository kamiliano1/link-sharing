import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import { UserAccountState, userAccountState } from "@/atoms/userAccountAtom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LiaImageSolid } from "react-icons/lia";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { previewUserLink } from "@/atoms/previewUserLinkAtom";
type CustomizeUserAccountProps = {};

// const useSelectFile = () => {
//   const [selectedFile, setSelectedFile] = useState<string>();
//   const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const reader = new FileReader();

//     if (e.target.files?.[0]) {
//       reader.readAsDataURL(e.target.files[0]);
//     }
//     reader.onload = (readerE) => {
//       if (readerE.target?.result) {
//         setSelectedFile(readerE.target?.result as string);
//       }
//     };
//   };
//   return {
//     selectedFile,
//     setSelectedFile,
//     onSelectFile,
//   };
// };
// export default useSelectFile;

const CustomizeUserAccount: React.FC<CustomizeUserAccountProps> = () => {
  // const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [previewLink, setPreviewLink] = useRecoilState(previewUserLink);
  const [pictureURL, setPictureURL] = useState<string>("");
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<UserAccountState>();
  // const { onChange: onChangePicture, onBlur, name, ref } = register("picture");
  const formSubmit: SubmitHandler<UserAccountState> = (data) => {
    // console.log(data);
    setUserAccount((prev) => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      picture: data.picture,
      // picture: pictureURL,
    }));

    console.log(userAccount, "ussAccount");
  };

  const onSelectAvatar = (e: React.ChangeEvent<HTMLFormElement>) => {
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setPictureURL(readerEvent.target.result as string);
        setValue("picture", readerEvent.target.result as string);
      }
    };
  };

  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    // const value = e.target.value;
    // const name = e.target.name;
    // // console.log(e.target.value, e.target.name);
    // setPreviewLink((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      onChange={onChange}
      className="flex flex-col max-w-[668px] mx-auto lg:mx-0
lg:max-w-[728px] lg:w-full "
    >
      <div className="p-10 sm:p-16 flex flex-col bg-lightGrey h-[768.33px]">
        <h1 className="text-headingMmobile sm:text-headingM mb-2">
          Profile Details
        </h1>

        {/* <Image src={userAccount.picture} alt="" /> */}
        <p className="text-bodyM text-grey mb-10">
          Add your details to create a personal touch to your profile.
        </p>
        <div className="sm:flex items-center">
          <p className="text-bodyM text-grey mb-10 sm:mb-0 sm:w-[240px]">
            Profile picture.
          </p>
          <input
            type="file"
            // {...register("picture", {})}
            onChange={onSelectAvatar}
            ref={selectedFileRef}
            // {...register("picture", {ref:selectedFileRef})}
            hidden
          />
          <div
            style={{
              backgroundImage: `url(${pictureURL})`,
            }}
            className={`text-purple flex flex-col items-center text-headingS bg-cover bg-no-repeat w-min px-10 py-[3.75rem] cursor-pointer relative rounded-xl ${
              pictureURL && "hover:text-white hover:bg-grey bg-blend-multiply "
            }`}
            onClick={() => selectedFileRef.current?.click()}
          >
            <LiaImageSolid className="text-[2.5rem] " />
            <p className="w-[116px] ">+ Upload Image</p>
          </div>
          <p className="text-bodyXS text-grey sm:max-w-[127px]">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
        <div className="mt-11 sm:flex sm:flex-col sm:gap-3">
          <div className="relative sm:flex sm:gap-4 sm:items-center">
            <label htmlFor="firstName">
              <p className="text-bodyXS sm:text-bodyM text-grey mb-1 sm:mb-0 sm:w-[240px]">
                First name*
              </p>
            </label>
            <input
              {...register("firstName", {
                required: "Can`t be empty",
              })}
              id="firstName"
              type="text"
              defaultValue={userAccount.firstName}
              placeholder="e.g. John"
              className={`px-4 w-full py-3 border-[1px] mb-3 sm:mb-0 border-borders max-w-[668px] text-bodyM rounded-lg text-black hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
                errors.firstName && "text-red border-red"
              }`}
            />
            <p className="text-red text-bodyXS absolute top-[2.4rem] sm:top-4 right-4">
              {errors.firstName?.message}
            </p>
          </div>
          <div className="relative sm:flex sm:gap-4 sm:items-center">
            <label htmlFor="lastName">
              <p className="text-bodyXS sm:text-bodyM text-grey mb-1 sm:mb-0 sm:w-[240px]">
                Last name*
              </p>
            </label>
            <input
              {...register("lastName", {
                required: "Can`t be empty",
              })}
              id="lastName"
              type="text"
              defaultValue={userAccount.lastName}
              placeholder="e.g. Appleseed"
              className={`px-4 w-full py-3 border-[1px] mb-3 sm:mb-0 border-borders max-w-[668px] text-bodyM rounded-lg text-black hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
                errors.lastName && "text-red border-red"
              }`}
            />
            <p className="text-red text-bodyXS absolute top-[2.4rem] sm:top-4 right-4">
              {errors.lastName?.message}
            </p>
          </div>
          <div className="relative sm:flex sm:gap-4 sm:items-center">
            <label htmlFor="email">
              <p className="text-bodyXS sm:text-bodyM text-grey mb-1 sm:mb-0 sm:w-[240px]">
                Email
              </p>
            </label>
            <input
              {...register("email", {})}
              id="email"
              type="text"
              defaultValue={userAccount.email}
              placeholder="e.g. email@example.com"
              className="px-4 w-full py-3 border-[1px] mb-3 sm:mb-0 border-borders max-w-[668px] text-bodyM rounded-lg text-black hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple"
            />
          </div>
        </div>
      </div>
      <span className="w-full h-[1px] mb-4 inline-block bg-borders mx-4"></span>
      <div className="mx-8 sm:self-end">
        <Button role="primary" cssClass="sm:w-min sm:px-5">
          Save
        </Button>
      </div>
      {/* <Image src={pictureURL} width={100} height={100} alt="" />
      <Image src={userAccount.picture} width={100} height={100} alt="" /> */}
    </form>
  );
};
export default CustomizeUserAccount;
