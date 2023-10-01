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
  } = useForm<UserLinks>({ defaultValues: startingLinks || [] });
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
    <main className="p-[15rem] bg-black h-[100vh]">
      <form onSubmit={handleSubmit(formSubmit)}>
        {fields.map((item, index) => (
          <li key={item.id}>
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
                  <SelectInput onChange={onChange} value={value} ref={ref} />
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
                        (item) => item.name === watch(`userLink.${0}.platform`)
                      )?.placeholder
                    }
                    className={`pl-9 pr-4 py-3 border-[1px] w-[500px] border-borders text-bodyM rounded-lg
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
        <Button
          role="secondary"
          type="button"
          onClick={() => append({ platform: "GitHub", link: "", id: nanoid() })}
        >
          + Add new link
        </Button>
        <Button role="secondary" type="submit">
          submit
        </Button>
        <Button role="secondary" type="button" onClick={sprwadz}>
          Sprawdz
        </Button>
      </form>
      {generatedLinks?.userLink.map((item) => (
        <PreviewLink key={item.id} platform={item.platform} link={item.link} />
      ))}
    </main>
  );
}
