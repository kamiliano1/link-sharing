"use client";
import Image from "next/image";
import { SelectInput } from "./Layout/Select/SelectInput";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Button from "./Layout/Button/Button";
import { nanoid } from "nanoid";
import { MdDragHandle } from "react-icons/md";
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
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "id",
  });
  return (
    <main className="p-[15rem] bg-black h-[100vh]">
      {fields.map((item, index) => (
        <li key={item.id}>
          <Controller
            control={control}
            name={`id.${index}.platform`}
            defaultValue={"activateColumn"}
            render={({ field: { onChange, value, ref } }) => (
              <>
                <div className="flex justify-between text-grey mb-3">
                  <h2 className="text-headingS inline-block">
                    <MdDragHandle className="inline-block mr-2" />
                    Link #{index + 1}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setValue(`id.${index}.platform`, "GitHub")}
                  >
                    SetValue
                  </button>
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
                <SelectInput onChange={onChange} value={value} ref={ref} />
                <p className="text-bodyS mb-1 mt-3 text-darkGrey">Link</p>

                <div className="flex relative w-min">
                  {/* <Image
                  src={LinkIcon}
                  alt="link icon"
                  className="absolute top-4 left-4"
                /> */}
                </div>
              </>
            )}
          />
          <input
            {...register(`id.${index}.link`)}
            type="text"
            className={`pl-9 pr-4 py-3 border-[1px] border-borders text-bodyM rounded-lg
                  text-black 
                  hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
                    errors.id?.[index]?.link && "text-red border-red "
                  }`}
          />
          {errors.id?.[index]?.link && (
            <p className="text-red text-bodyS absolute top-4 right-4">
              Please check again
            </p>
          )}
        </li>
      ))}
      <Button
        role="secondary"
        onClick={() => append({ platform: "", link: "", id: nanoid() })}
      >
        + Add new link
      </Button>
      <Button role="secondary" onClick={() => console.log(fields)}>
        Loguj
      </Button>
    </main>
  );
}
