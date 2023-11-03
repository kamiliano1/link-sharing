import { firestore } from "@/app/firebase/clientApp";
import { popUpState } from "@/atoms/togglePopUpAtom";
import {
  UserAccountState,
  UserLink,
  userAccountState,
} from "@/atoms/userAccountAtom";
import useDataFromFirebase from "@/hooks/useDataFromFirebase";
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
import { AiOutlineLink } from "react-icons/ai";
import { User } from "firebase/auth";
import { deleteDoc, doc, runTransaction } from "firebase/firestore";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useRecoilState } from "recoil";
import Button from "../Button/Button";
import { SelectPlatformInput } from "../Select/SelectPlatformInput";
import { linksList } from "../Select/linkList";
import CustomizeUserLinkSkeleton from "../Skeletons/CustomizeUserLinkSkeleton";
import DraggableLink from "./DraggableLink";
import { notUsePlatforms } from "@/utility/notUserPlatforms";
type CustomizeUserLinksProps = {
  user: User | null | undefined;
  loading: boolean;
};

const CustomizeUserLinks: React.FC<CustomizeUserLinksProps> = ({
  user,
  loading,
}) => {
  const { getMySnippets } = useDataFromFirebase();
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);
  const [isChangesSaved, setIsChangesSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLinksLoaded, setIsLinksLoaded] = useState<boolean>(false);
  const [isPopUpOpen, setIsPopUpOpen] = useRecoilState(popUpState);
  const [isSaveButtonNotActive, setIsSaveButtonNotActive] =
    useState<boolean>(false);
  const {
    handleSubmit,
    watch,
    setValue,
    setFocus,
    control,
    formState: { errors },
  } = useForm<UserAccountState>({
    defaultValues: { userLink: userAccount.userLink },
  });
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "userLink",
  });
  useEffect(() => {
    setUserAccount((prev) => ({ ...prev, userLink: fields }));
  }, [fields, setUserAccount]);

  useEffect(() => {
    if (!isLinksLoaded && userAccount.userLink.length) {
      setValue("userLink", userAccount.userLink);
      setIsLinksLoaded(true);
    }
  }, [setValue, loading, userAccount.userLink, isLinksLoaded]);
  const deleteUserSnippets = async (id: string) => {
    await deleteDoc(doc(firestore, `users/${user?.uid}/userLinks`, id));
  };
  const updateSnippet = async (userLink: UserLink) => {
    const { platform, link, id, order } = userLink;
    try {
      await runTransaction(firestore, async (transaction) => {
        transaction.set(
          doc(firestore, `users/${user?.uid}/userLinks`, `${id}`),
          {
            platform,
            link,
            id,
            order,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateLink error", error);
    }
  };
  useEffect(() => {
    if (!userAccount.userLink.length && isChangesSaved) {
      setIsSaveButtonNotActive(true);
      return;
    }
    setIsSaveButtonNotActive(false);
  }, [isChangesSaved, userAccount.userLink.length]);
  useEffect(() => {
    setIsChangesSaved(false);
  }, [userAccount]);
  const formSubmit: SubmitHandler<UserAccountState> = async (data) => {
    setIsLoading(true);
    let orderedUserLink = data.userLink;
    orderedUserLink = orderedUserLink.map((item, order) => ({
      ...item,
      order: order,
    }));
    setUserAccount((prev) => ({ ...prev, userLink: orderedUserLink }));
    orderedUserLink.map((item) => updateSnippet(item));

    const userLink = await getMySnippets(user?.uid!);
    const snippetsToDelete = userLink.filter((item) => {
      return data.userLink.find((element) => element.id === item.id)
        ? false
        : true;
    });
    snippetsToDelete.map((item) => deleteUserSnippets(item.id));
    setIsLoading(false);
    setIsPopUpOpen({ togglePopUp: true });
    setIsChangesSaved(true);
  };
  const validatePlatformLink = async (value: string, index: number) => {
    let isValidateLink = false;
    const activePlatformPattern = linksList.find(
      (item) => item.name === watch(`userLink.${index}.platform`)
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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    let number = parseInt(
      name
        .replace("userLink.", "")
        .replace(".platform", "")
        .replace(".link", "")
    );
    setUserAccount((prev) => {
      let userLink = prev.userLink;
      userLink = userLink.map((item, id) => {
        if (id === number) {
          return {
            ...item,
            link: name.includes("link") ? value : item.link,
            platform: name.includes("platform") ? value : item.platform,
          };
        }
        return item;
      });
      return { ...prev, userLink: userLink };
    });
  };

  const addLink = () => {
    append({
      platform: notUsePlatforms(userAccount)[0],
      link: "",
      id: nanoid(),
      order: fields.length,
    });
    setTimeout(() => {
      setFocus(`userLink.${fields.length}.link`);
    }, 2);
  };
  const handleDragDrop = async (e: DragEndEvent) => {
    if (e.active.id === e.over?.id) return;
    const startLinkIndex = fields.findIndex((item) => item.id === e.active.id);
    const dropLinkIndex = fields.findIndex((item) => item.id === e.over?.id);
    swap(startLinkIndex, dropLinkIndex);
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      onChange={handleFormChange}
      className="flex flex-col mx-auto lg:mx-0 lg:max-w-[808px] lg:w-full"
    >
      <div className="relative flex flex-col p-6 m-4 mb-0 bg-white rounded-md sm:m-6 sm:mb-0">
        <h1 className="mb-2 text-headingMMobile sm:text-headingM">
          Customize your links
        </h1>
        <p className="mb-10 text-bodyM text-grey">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button role="secondary" type="button" onClick={addLink}>
          + Add new link
        </Button>
        <div className="max-h-[505px] sm:h-[480px] relative sm:mb-[10.5px] overflow-y-auto scrollbar mt-6">
          {loading ? (
            <CustomizeUserLinkSkeleton />
          ) : (
            <>
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
                      <div className="relative p-5 mb-5 list-none bg-lightGrey rounded-xl">
                        <Controller
                          control={control}
                          name={`userLink.${index}.platform`}
                          defaultValue={"GitHub"}
                          render={({ field: { onChange, value, ref } }) => (
                            <>
                              <div className="flex justify-between mb-3 text-grey">
                                <h2 className="inline-block ml-8 text-headingS">
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
                              <p className="mt-3 mb-1 text-bodyXS text-darkGrey">
                                Platform
                              </p>
                              <SelectPlatformInput
                                name={`userLink.${index}.platform`}
                                onChange={onChange}
                                value={value}
                                ref={ref}
                              />
                            </>
                          )}
                        />

                        <Controller
                          control={control}
                          name={`userLink.${index}.link`}
                          defaultValue={""}
                          rules={{
                            required: "Can`t be empty",
                            validate: {
                              platformLink: (value) =>
                                validatePlatformLink(value, index),
                            },
                          }}
                          render={({ field }) => (
                            <>
                              <div className="mt-3 mb-1">
                                <label
                                  htmlFor={`userLink.${index}.link`}
                                  className={`mt-3 mb-1 cursor-pointer text-bodyXS text-darkGrey ${
                                    errors.userLink?.[index]?.link &&
                                    "text-red border-red"
                                  }`}
                                >
                                  Link
                                </label>
                              </div>
                              <div className="relative flex">
                                <AiOutlineLink className="absolute top-4 left-4 text-grey" />

                                <input
                                  {...field}
                                  type="text"
                                  id={`userLink.${index}.link`}
                                  placeholder={
                                    linksList.find(
                                      (item) =>
                                        item.name ===
                                        watch(`userLink.${index}.platform`)
                                    )?.placeholder
                                  }
                                  className={`pl-[42px] pr-4 w-full py-3 border-[1px] border-borders text-bodyM rounded-lg text-darkGrey hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
                                    errors.userLink?.[index]?.link &&
                                    "text-red border-red"
                                  }`}
                                />
                                {errors.userLink?.[index] && (
                                  <>
                                    <p className="absolute text-red text-bodyXS  top-[-1.5rem] sm:top-4 right-4">
                                      {errors.userLink?.[index]?.link?.message}
                                    </p>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        />
                      </div>
                    </DraggableLink>
                  ))}
                </SortableContext>
              </DndContext>

              {!fields.length && (
                <div className="p-5 rounded-xl bg-lightGrey">
                  <Image
                    className="mx-auto mt-10 mb-6"
                    src="/icons/illustration-empty.svg"
                    width={125}
                    height={80}
                    alt="/"
                  />
                  <h2 className="text-center text-headingMMobile">
                    Let`s get you started
                  </h2>
                  <p className="mt-6 text-grey mb-7">
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We`re
                    here to help you share your profiles with everyone!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <span className="h-[1px] inline-block bg-borders mx-4 sm:mx-6"></span>
      <div className="p-4 m-4 mt-0 bg-white sm:m-6 sm:mt-0">
        <Button
          role="primary"
          disabled={isLoading ? true : isSaveButtonNotActive}
          loading={isLoading}
          cssClass="sm:w-min sm:px-7 sm:ml-auto"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
export default CustomizeUserLinks;
