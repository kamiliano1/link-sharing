import { firestore } from "@/app/firebase/clientApp";
import { popUpState } from "@/atoms/togglePopUpAtom";
import {
  UserAccountState,
  UserLink,
  userAccountState,
} from "@/atoms/userAccountAtom";
import useDataFromFirebase from "@/utility/useDataFromFirebase";
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
import LinkIcon from "../../../public/icons/icon-link.svg";
import Button from "../Button/Button";
import { SelectPlatformInput } from "../Select/SelectPlatformInput";
import { linksList } from "../Select/linkList";
import CustomizeUserLinkSkeleton from "../Skeletons/CustomizeUserLinkSkeleton";
import DraggableLink from "./DraggableLink";
type CustomizeUserLinksProps = {
  user: User | null | undefined;
  loading: boolean;
};

const daneDoWygladu: UserAccountState = {
  firstName: "",
  lastName: "",
  email: "",
  picture: "",
  userLink: [
    {
      id: "9f554586-f68e-42ab-8758-6d3799d53362",
      platform: "GitHub",
      order: 0,
      link: "https://www.github.com/benwright",
    },
    {
      platform: "YouTube",
      link: "https://www.youtube.com/@benwright",
      id: "88fa0e4f-3f1e-4d3f-91a0-5a53a5c5e7bb",
      order: 1,
    },
    {
      platform: "LinkedIn",
      link: "https://www.linkedIn.com/in/benwright",
      id: "9086527b-12ac-4088-bdd8-ac2515f4e3dc",
      order: 2,
    },
  ],
  isLoaded: true,
};

const CustomizeUserLinks: React.FC<CustomizeUserLinksProps> = ({
  user,
  loading,
}) => {
  const { getMySnippets } = useDataFromFirebase();
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLinksLoaded, setIsLinksLoaded] = useState<boolean>(false);
  const [isPopUpOpen, setIsPopUpOpen] = useRecoilState(popUpState);
  // const [user, loading] = useAuthState(auth);
  const [isSaveButtonNotActive, setIsSaveButtonNotActive] =
    useState<boolean>(false);
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
  useEffect(() => {
    setUserAccount((prev) => ({ ...prev, userLink: fields }));
  }, [fields, setUserAccount]);

  useEffect(() => {
    setUserAccount(daneDoWygladu);
  }, [setUserAccount]);
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
    if (userAccount.userLink.length || fields.length) {
      setIsSaveButtonNotActive(false);
      return;
    }
    setIsSaveButtonNotActive(true);
  }, [userAccount.userLink, fields]);
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
    console.log(userAccount);
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
      <div className="p-6 m-4 sm:m-6 sm:mb-0 mb-0 flex flex-col bg-white relative rounded-md">
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
          onClick={() => {
            append({
              platform: "GitHub",
              link: "",
              id: nanoid(),
              order: fields.length,
            });
          }}
        >
          + Add new link
        </Button>
        <div className="max-h-[505px] sm:h-[505px] relative sm:mb-[10.5px] overflow-y-auto scrollbar mt-6">
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
                      <li className="list-none mb-5 relative bg-lightGrey p-5 rounded-xl">
                        <Controller
                          control={control}
                          name={`userLink.${index}.platform`}
                          defaultValue={"GitHub"}
                          render={({ field: { onChange, value, ref } }) => (
                            <>
                              <div className="flex justify-between text-grey mb-3">
                                <h2 className="text-headingS inline-block ml-8">
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
                              <p className="text-bodyXS mb-1 mt-3 text-darkGrey">
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
                              <label htmlFor={`userLink.${index}.platform`}>
                                <p className="text-bodyXS mb-1 mt-3 text-darkGrey cursor-pointer">
                                  Link
                                </p>
                              </label>
                              <div className="flex relative">
                                <AiOutlineLink className="absolute top-4 left-4 text-grey" />
                                <input
                                  {...field}
                                  type="text"
                                  id={`userLink.${index}.platform`}
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
                                    <p className="text-red text-bodyXS absolute top-4 right-4">
                                      {errors.userLink?.[index]?.link?.message}
                                    </p>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        />
                      </li>
                    </DraggableLink>
                  ))}
                </SortableContext>
              </DndContext>

              {!fields.length && (
                <div className="p-5  rounded-xl bg-lightGrey">
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
                  <p className="text-grey mt-6 mb-7">
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
      <div className="bg-white m-4 sm:m-6 sm:mt-0 mt-0 p-4">
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
