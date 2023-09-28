"use client";
import Image from "next/image";
import { SelectInput } from "./Layout/Select/SelectInput";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Button from "./Layout/Button/Button";
import { nanoid } from "nanoid";
import { MdDragHandle } from "react-icons/md";
import LinkIcon from "../../public/icons/icon-link.svg";
import { linksList } from "./Layout/Select/linkList";
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
  type UserLinks = {
    id: {
      platform: string;
      link: string;
      id: string;
    }[];
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "id",
  });
  const sprwadz = () => {
    // console.log(watch(`id.${0}.platform`));
    // console.log(
    //   linksList.find((item) => item.name === watch(`id.${0}.platform`))
    //     ?.placeholder
    // );
    console.log(errors);
    // console.log(errors.id?.[0]);
    console.log(errors.id?.[0]?.link?.message);
  };

  const validateName = async (value: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return value !== "Pizza" || "Recipe with the name 'Pizza' already exists";
  };
  const validatePlatformLink = async (value: string) => {
    const activePlatformPattern = linksList.find(
      (item) => item.name === watch(`id.${0}.platform`)
    )?.validatePattern;

    const kk = activePlatformPattern?.find((item) => {
      return value.includes(item);
    });
    console.log(kk);
    console.log(
      activePlatformPattern?.filter((item) => {
        return value.includes(item);
      })
    );
    if (kk) return true;
    return false || "Please check the URL";
    // return value !== "Pizza" || "Recipe with the name 'Pizza' already exists";
  };

  return (
    <main className="p-[15rem] bg-black h-[100vh]">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        {fields.map((item, index) => (
          <li key={item.id}>
            <Controller
              control={control}
              name={`id.${index}.platform`}
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
              name={`id.${index}.link`}
              rules={{
                required: "Can`t be empty",
                validate: validatePlatformLink,
                // validate: {
                //   matchPattern: (value) => {
                //     console.log(watch(`id.${0}.platform`));
                //     // const activePlatformPattern = linksList.find(
                //     //   (item) => item.name === watch(`id.${0}.platform`)
                //     // )?.validatePattern;

                //     // const kk = activePlatformPattern?.find((item) => {
                //     //   return value.includes(item);
                //     // });

                //     // if (kk) return true;
                //     // return false || "Please check the URL";
                //   },
                // },
              }}
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
                        (item) => item.name === watch(`id.${0}.platform`)
                      )?.placeholder
                    }
                    className={`pl-9 pr-4 py-3 border-[1px] w-[500px] border-borders text-bodyM rounded-lg
                  text-black 
                  hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
                    errors.id?.[index]?.link && "text-red border-red"
                  }`}
                  />
                  {errors.id?.[index] && (
                    <>
                      <p className="text-red text-bodyS absolute top-4 right-4">
                        {errors.id?.[index]?.link?.message}
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
    </main>
  );
}
