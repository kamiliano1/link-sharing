import React from "react";
import PhoneMockup from "../../../public/icons/illustration-phone-mockup.svg";
import Image from "next/image";
import PreviewLink from "../Select/PreviewLink";
import { useRecoilValue } from "recoil";
import { previewUserLink } from "@/atoms/previewUserLinkAtom";
import { userAccountState } from "@/atoms/userAccountAtom";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
type LinkPreviewProps = {};

const LinkPreview: React.FC<LinkPreviewProps> = () => {
  const previewLink = useRecoilValue(previewUserLink);
  const userAccount = useRecoilValue(userAccountState);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const handleDragDrop = async (e: DragEndEvent) => {
    console.log(e);
    // if (e.active.id === e.over?.id) return;
    // const activeBoard = boardState.findIndex(
    //   (board) => board.name === e.active.id
    // );
    // const targetBoard = boardState.findIndex(
    //   (board) => board.name === e.over?.id
    // );
    // const updatedBoard = arrayMove(boardState, activeBoard, targetBoard);
    // setBoardState(updatedBoard);
    // if (user) {
    //   const boardRef = doc(firestore, `users/${user?.uid}`);
    //   await updateDoc(boardRef, {
    //     board: updatedBoard,
    //   });
    // }
  };
  return (
    <div className="hidden lg:block relative">
      <Image src={PhoneMockup} alt="Phone Mockup" />
      <div className="absolute mt-16 w-full top-0 flex flex-col items-center">
        {userAccount.picture ? (
          <Image
            width={96}
            height={96}
            src={userAccount.picture}
            alt="user Avatar"
            className="aspect-square rounded-full w-[96px] border-[4px] border-purple mb-[1.35rem]"
          />
        ) : (
          <div className="w-[96px] aspect-square mb-[1.35rem]"></div>
        )}
        <h2
          className={`text-headingS capitalize w-[160px] truncate h-6 text-center  ${
            userAccount.firstName && "bg-white"
          } `}
        >
          {userAccount.firstName} {userAccount.lastName}
        </h2>
        <p
          className={`text-bodyS mb-[50px] w-[160px] truncate text-center h-5 ${
            userAccount.email && "bg-white"
          }`}
        >
          {userAccount.email}
        </p>
        <div className="max-h-[305px] overflow-y-auto scrollbar">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragDrop}
            sensors={sensors}
          >
            <SortableContext
              items={userAccount?.userLink}
              strategy={horizontalListSortingStrategy}
            >
              {userAccount?.userLink.map((item) => (
                <PreviewLink
                  key={item.id}
                  platform={item.platform}
                  link={item.link}
                  id={item.id}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};
export default LinkPreview;
