import React, { useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { previewUserLink } from "@/atoms/previewUserLinkAtom";
import { popUpState } from "@/atoms/togglePopUpAtom";
import { UserAccountState, userAccountState } from "@/atoms/userAccountAtom";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRecoilState } from "recoil";
import LinkIcon from "../../../public/icons/icon-link.svg";
import Button from "../Button/Button";
import { SelectInput } from "../Select/SelectInput";
import { linksList } from "../Select/linkList";
import DraggableLink from "./DraggableLink";
type CustomizeUserLinksProps = {};

const CustomizeUserLinks: React.FC<CustomizeUserLinksProps> = () => {
  const [previewLink, setPreviewLink] = useRecoilState(previewUserLink);
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const [isPopUpOpen, setIsPopUpOpen] = useRecoilState(popUpState);
  // const [previewLinks, setPreviewLinks] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<UserAccountState>({
    defaultValues: { userLink: userAccount.userLink },
  });
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "userLink",
  });

  const formSubmit: SubmitHandler<UserAccountState> = (data) => {
    // setGeneratedLinks(data);
    // setPreviewLink(data);
    setUserAccount((prev) => ({ ...prev, userLink: data.userLink }));

    // console.log(data, "data");
    // console.log(userAccount);
    // setPreviewLinkss({ userLink: getValues("userLink") });
    setIsPopUpOpen({ togglePopUp: true });
  };
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

  useEffect(() => {
    setIsPopUpOpen({ togglePopUp: false });
  }, [setIsPopUpOpen]);
  useEffect(() => {
    setPreviewLink({ userLink: fields });
  }, [fields, setPreviewLink]);
  const onChange = () => {
    // setPreviewLinks(getValues("userLink"));
    // setPreviewLink({ userLink: getValues("userLink") });
    // setPreviewLink();
    // setPreviewLink({
    //   userLink: [
    //     {
    //       platform: "GitHub",
    //       link: "a",
    //       id: "Lt-Dg502uKj0FtSMIMBvL",
    //     },
    //     {
    //       platform: "GitHub",
    //       link: "",
    //       id: "cvpBc_dL35-NFfN4riZYT",
    //     },
    //     {
    //       platform: "GitHub",
    //       link: "",
    //       id: "sZ65S9-AscBLTZ7vEOS2K",
    //     },
    //     {
    //       platform: "GitHub",
    //       link: "",
    //       id: "xI79aU-wBJNn1yQuOTgHX",
    //     },
    //     {
    //       platform: "GitHub",
    //       link: "",
    //       id: "3yGi3eMnLL79fm-FuKN1D",
    //     },
    //     {
    //       platform: "GitHub",
    //       link: "",
    //       id: "H1m1BQnZhZZddaWZ7ACq_",
    //     },
    //     {
    //       platform: "GitHub",
    //       link: "aasf",
    //       id: "L7bilWHUJjdSbrawC8Bk6",
    //     },
    //     {
    //       platform: "GitHub",
    //       link: "",
    //       id: "j7e8Z-sOiTOzLeUP-ujUY",
    //     },
    //   ],
    // });
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragDrop = async (e: DragEndEvent) => {
    if (e.active.id === e.over?.id) return;
    const startLinkIndex = fields.findIndex((item) => item.id === e.active.id);
    const dropLinkIndex = fields.findIndex((item) => item.id === e.over?.id);
    swap(startLinkIndex, dropLinkIndex);
  };
  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      // onChange={onChange}
      className="flex flex-col max-w-[668px] mx-auto lg:mx-0
    lg:max-w-[728px] lg:w-full"
    >
      <div className="p-10 sm:p-16 flex flex-col bg-lightGrey relative">
        <h1 className="text-headingMmobile sm:text-headingM mb-2">
          Customize your links
        </h1>
        <p className="text-bodyM text-grey mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button
          role="secondary"
          type="button"
          onClick={() => append({ platform: "GitHub", link: "", id: nanoid() })}
        >
          + Add new link
        </Button>
        <div className="h-[453px] overflow-y-auto scrollbar p-5 mt-5">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragDrop}
            sensors={sensors}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((item, index) => (
                <DraggableLink key={item.id} id={item.id}>
                  <li className="list-none my-5 relative">
                    <Controller
                      control={control}
                      name={`userLink.${index}.platform`}
                      defaultValue={"GitHub"}
                      render={({ field: { onChange, value, ref } }) => (
                        <>
                          <div className="flex justify-between text-grey mb-3">
                            <h2 className="text-headingS inline-block ml-7">
                              Link #{index + 1}
                            </h2>
                            <button
                              type="button"
                              className="hover:text-black"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                          <SelectInput
                            onChange={onChange}
                            value={value}
                            ref={ref}
                          />
                          <p className="bodyXS-bodyS mb-1 mt-3 text-darkGrey">
                            Link
                          </p>
                        </>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`userLink.${index}.link`}
                      defaultValue={""}
                      rules={{
                        required: "Can`t be empty",
                        // validate: validatePlatformLink,
                      }}
                      render={({ field }) => (
                        <div className="flex relative">
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
                                  item.name ===
                                  watch(`userLink.${index}.platform`)
                              )?.placeholder
                            }
                            className={`pl-9 pr-4 w-full py-3 border-[1px] mb-6 border-borders max-w-[668px] text-bodyM rounded-lg text-black hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
                              errors.userLink?.[index]?.link &&
                              "text-red border-red"
                            }`}
                          />
                          {errors.userLink?.[index] && (
                            <>
                              <p className="text-red text-bodyXS absolute top-4 right-4">
                                {errors.userLink?.[index]?.link?.message}
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    />
                  </li>
                </DraggableLink>
              ))}
            </SortableContext>
          </DndContext>
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
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We`re here to help
                you share your profiles with everyone!
              </p>
            </>
          )}
        </div>
      </div>
      <span className="w-full h-[1px] mb-4 inline-block bg-borders mx-4"></span>
      <div className="mx-8 sm:self-end">
        <Button
          role="primary"
          disabled={fields.length ? false : true}
          cssClass="sm:w-min sm:px-5"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
export default CustomizeUserLinks;
