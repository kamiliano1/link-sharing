"use client";
import Image from "next/image";
import { SelectInput } from "./Layout/Select/SelectInput";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import Button from "./Layout/Button/Button";
import { nanoid } from "nanoid";
import { MdDragHandle } from "react-icons/md";
import LinkIcon from "../../public/icons/icon-link.svg";
import { linksList } from "./Layout/Select/linkList";
import { useState } from "react";
import PreviewLink from "./Layout/Select/PreviewLink";
import { PlatfromsType } from "./Layout/Select/ActiveLinksType";
import Navbar from "./Layout/Navbar/Navbar";
type UserLinkss = {
  userLink: {
    platform: PlatfromsType;
    link: string;
    id: string;
  }[];
};
const startingLinks: UserLinkss = {
  userLink: [
    {
      platform: "GitHub",
      link: "wp.pl",
      id: "4oUElfs-a1pOJKiCQ_U2W",
    },
    {
      platform: "freeCodeCamp",
      link: "onet.pl",
      id: "4sisNDO1DEaxSDUD45hoi",
    },
    {
      platform: "GitLab",
      link: "google.pl",
      id: "-tT4YoMfsdyK63bpvaxmK",
    },
    {
      platform: "Codewars",
      link: "",
      id: "QrCZVWMR6HaQPJclPrMuI",
    },
    {
      platform: "Stack Overflow",
      link: "",
      id: "ww1NWuGlUcn8_rRW0UtwI",
    },
  ],
};
export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<UserLinks>();
  // } = useForm<UserLinks>({ defaultValues: startingLinks || [] });
  type UserLinks = {
    userLink: {
      platform: PlatfromsType;
      link: string;
      id: string;
    }[];
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "userLink",
  });
  const sprwadz = () => {};
  const [generatedLinks, setGeneratedLinks] = useState<UserLinks>();
  const validatePlatformLink = async (value: string) => {
    let isValidateLink = false;
    const activePlatformPattern = linksList.find(
      (item) => item.name === watch(`userLink.${0}.platform`)
    )?.validatePattern;
    activePlatformPattern?.map((item) => {
      if (value.startsWith(item)) return (isValidateLink = true);
    });

    if (isValidateLink) return true;
    return false || "Please check the URL";
  };

  const formSubmit: SubmitHandler<UserLinks> = (data) => {
    console.log(data);
    setGeneratedLinks(data);
  };
  return (
    <main className="min-h-[100vh]">
      <Navbar />
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col">
        <div className="p-10 sm:p-16 flex flex-col bg-lightGrey">
          <h1 className="text-headingMmobile mb-2">Customize your links</h1>
          <p className="text-bodyM text-grey mb-10">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button
            role="secondary"
            type="button"
            onClick={() =>
              append({ platform: "GitHub", link: "", id: nanoid() })
            }
          >
            + Add new link
          </Button>
          <div className="min-h-[453px] p-5">
            {fields.map((item, index) => (
              <li key={item.id} className="list-none my-5">
                <Controller
                  control={control}
                  name={`userLink.${index}.platform`}
                  defaultValue={"GitHub"}
                  render={({ field: { onChange, value, ref } }) => (
                    <>
                      <div className="flex justify-between text-grey mb-3">
                        <h2 className="text-headingS inline-block">
                          <MdDragHandle className="inline-block mr-2" />
                          Link #{index + 1}
                        </h2>
                        <button type="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                      </div>
                      <SelectInput
                        onChange={onChange}
                        value={value}
                        ref={ref}
                      />
                      <p className="text-bodyS mb-1 mt-3 text-darkGrey">Link</p>
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name={`userLink.${index}.link`}
                  defaultValue={""}
                  render={({ field }) => (
                    <div className="flex relative w-min">
                      <Image
                        src={LinkIcon}
                        alt="link icon"
                        className="absolute top-4 left-4"
                      />
                      <input
                        {...field}
                        type="text"
                        placeholder={
                          linksList.find(
                            (item) =>
                              item.name === watch(`userLink.${index}.platform`)
                          )?.placeholder
                        }
                        className={`pl-9 pr-4 py-3 border-[1px] mb-6 border-borders text-bodyM rounded-lg
                  text-black
                  hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
                    errors.userLink?.[index]?.link && "text-red border-red"
                  }`}
                      />
                      {errors.userLink?.[index] && (
                        <>
                          <p className="text-red text-bodyS absolute top-4 right-4">
                            {errors.userLink?.[index]?.link?.message}
                          </p>
                        </>
                      )}
                    </div>
                  )}
                />
              </li>
            ))}
            {!fields.length && (
              <>
                <Image
                  className="mx-auto mt-10 mb-6"
                  src="/icons/illustration-empty.svg"
                  width={125}
                  height={80}
                  alt="/"
                />
                <h2 className="text-headingMmobile text-center">
                  Let`s get you started
                </h2>
                <p className="text-grey mt-6 mb-16">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We`re here
                  to help you share your profiles with everyone!
                </p>
              </>
            )}
          </div>
          {/* <Button role="secondary" type="submit">
          submit
        </Button>
        <Button role="secondary" type="button" onClick={sprwadz}>
          Sprawdz
        </Button> */}
        </div>
        <span className="w-full h-[1px] mb-4 inline-block bg-borders mx-4"></span>
        <Button
          role="primary"
          disabled={fields.length ? false : true}
          cssClass="mt-auto mx-8 sm:w-min sm:px-5 sm:self-end"
        >
          Save
        </Button>
        {/* {generatedLinks?.userLink.map((item) => (
        <PreviewLink key={item.id} platform={item.platform} link={item.link} />
      ))} */}
      </form>
    </main>
  );
}
