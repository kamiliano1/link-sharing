import { auth, firestore } from "@/app/firebase/clientApp";
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
import { deleteDoc, doc, runTransaction } from "firebase/firestore";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Controller,
  FieldArrayWithId,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useRecoilState } from "recoil";
import LinkIcon from "../../../public/icons/icon-link.svg";
import Button from "../Button/Button";
import { linksList } from "../Select/linkList";
import CustomizeUserLinkSkeleton from "../Skeletons/CustomizeUserLinkSkeleton";
import DraggableLink from "./DraggableLink";
import { User } from "firebase/auth";
import { previewUserAccountState } from "@/atoms/previewUserAccountAtom";
import { SelectPlatformInput } from "../Select/SelectPlatformInput";
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
  const [previewUserAccount, setPreviewUserAccount] = useRecoilState(
    previewUserAccountState
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sprawdzenie, setSprawdzenie] = useState<UserLink[]>([]);
  const [isPopUpOpen, setIsPopUpOpen] = useRecoilState(popUpState);
  // const [user, loading] = useAuthState(auth);
  const [isSaveButtonDesactive, setIsSaveButtonDesactive] =
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
    console.log("robi fieldsy");
    // setPreviewUserAccount((prev) => ({ ...prev, userLink: watch("userLink") }));
  }, [fields]);
  useEffect(() => {
    setPreviewUserAccount(userAccount);
  }, [userAccount, setPreviewUserAccount]);
  useEffect(() => {
    setValue("userLink", userAccount.userLink);
  }, [setValue, loading, userAccount.userLink]);
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
      setIsSaveButtonDesactive(false);
      return;
    }
    setIsSaveButtonDesactive(true);
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
    setIsPopUpOpen({ togglePopUp: true });
    const userLink = await getMySnippets(user?.uid!);
    const snippetsToDelete = userLink.filter((item) => {
      return data.userLink.find((element) => element.id === item.id)
        ? false
        : true;
    });
    snippetsToDelete.map((item) => deleteUserSnippets(item.id));
    setIsLoading(false);
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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  // const zmianaFormy = (e: FormEventHandler<HTMLFormElement>) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  // };

  // const zmianaFormy: React.FormEventHandler<HTMLFormElement> = (e: React.SyntheticEvent) => {
  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    let number = parseInt(
      name
        .replace("userLink.", "")
        .replace(".platform", "")
        .replace(".link", "")
    );
    setPreviewUserAccount((prev) => {
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
    // setPreviewUserLink(getValues("userLink"));
    // setSprawdzenie(updatedLinkArray);
  };
  const handleDragDrop = async (e: DragEndEvent) => {
    if (e.active.id === e.over?.id) return;
    const startLinkIndex = fields.findIndex((item) => item.id === e.active.id);
    const dropLinkIndex = fields.findIndex((item) => item.id === e.over?.id);
    swap(startLinkIndex, dropLinkIndex);
    setPreviewUserAccount((prev) => {
      let userPlatforms = prev.userLink;
      const platformToMove = prev.userLink[startLinkIndex];
      const platformTarget = prev.userLink[dropLinkIndex];
      userPlatforms = userPlatforms.map((item, id) => {
        if (id === startLinkIndex) return platformTarget;
        if (id === dropLinkIndex) return platformToMove;
        return item;
      });
      return { ...prev, userLink: userPlatforms };
    });
  };
  const addLink = () => {
    append({
      platform: "GitHub",
      link: "",
      id: nanoid(),
      order: fields.length,
    });
    const actualLinksLength = getValues("userLink").length;
    // console.log(getValues("userLink").length)
    setPreviewUserAccount((prev) => {
      const userLinks = [
        ...prev.userLink,
        getValues("userLink")[actualLinksLength - 1],
      ];
      console.log(userLinks, "userLinks");
      console.log(prev.userLink, "prev.userLink");
      console.log(getValues("userLink")[actualLinksLength - 1], "getValues");
      return prev;
      return { ...prev, userLink: userLinks };
    });
  };
  const removeLink = (index: number) => {
    remove(index);
    setPreviewUserAccount((prev) => {
      let userLinks = prev.userLink.filter((item, id) => id !== index);
      return { ...prev, userLink: userLinks };
    });
  };
  // const zamien = () => {
  //   setPreviewUserAccount((prev) => ({ ...prev, userLink: sprawdzenie }));
  // };
  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      onChange={handleFormChange}
      className="flex flex-col mx-auto lg:mx-0 lg:max-w-[808px] lg:w-full"
    >
      {/* <button type="button" onClick={zamien}>
        Zamien
      </button> */}
      <div className="p-6 m-4 sm:m-6 sm:mb-0 mb-0 flex flex-col bg-white relative rounded-md">
        <h1 className="text-headingMmobile sm:text-headingM mb-2">
          Customize your links
        </h1>
        <p className="text-bodyM text-grey mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button role="secondary" type="button" onClick={addLink}>
          + Add new link
        </Button>
        <div className="h-[550px] overflow-y-auto scrollbar">
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
                      <li className="list-none my-5 relative bg-lightGrey p-5 rounded-xl">
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
                                  onClick={() => removeLink(index)}
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
                            // validate: validatePlatformLink,
                          }}
                          render={({ field }) => (
                            <>
                              <label htmlFor={`userLink.${index}.platform`}>
                                <p className="text-bodyXS mb-1 mt-3 text-darkGrey">
                                  Link
                                </p>
                              </label>
                              <div className="flex relative">
                                <Image
                                  src={LinkIcon}
                                  alt="link icon"
                                  className="absolute top-4 left-4"
                                />
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
                                  className={`pl-9 pr-4 w-full py-3 border-[1px] border-borders text-bodyM rounded-lg text-black hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple ${
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
                <div className="p-5 mt-6 rounded-xl bg-lightGrey">
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
        {/* <SkeletonTheme
          baseColor="hsl(252, 100%, 62%)"
          highlightColor="hsl(252, 100%, 84%)"
        >
          <div className="flex flex-col z-[5000] relative p-5 bg-lightGrey rounded-xl mb-5">
            <div className="flex justify-between mb-1">
              <Skeleton width={100} height={24} />
              <Skeleton width={100} height={24} />
            </div>
            <Skeleton width={100} height={18} />
            <Skeleton height={40} containerClassName="w-full mb-2" />
            <Skeleton width={100} height={18} />
            <Skeleton height={40} containerClassName="w-full" />
          </div>
          <div className="flex flex-col z-[5000] relative p-5 bg-lightGrey rounded-xl mb-5">
            <div className="flex justify-between mb-1">
              <Skeleton width={100} height={24} />
              <Skeleton width={100} height={24} />
            </div>
            <Skeleton width={100} height={18} />
            <Skeleton height={40} containerClassName="w-full mb-2" />
            <Skeleton width={100} height={18} />
            <Skeleton height={40} containerClassName="w-full" />
          </div>
        </SkeletonTheme> */}
      </div>
      <span className="h-[1px] inline-block bg-borders mx-4 sm:mx-6"></span>
      <div className="bg-white m-4 sm:m-6 sm:mt-0 mt-0 p-4">
        <Button
          role="primary"
          // disabled={isLoading ? true : isSaveButtonDesactive}
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
