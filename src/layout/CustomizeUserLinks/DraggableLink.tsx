import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { MdDragHandle } from "react-icons/md";
import { CSS } from "@dnd-kit/utilities";

type DraggableLinkProps = {
  id: string;
  children?: React.ReactNode;
};

const DraggableLink: React.FC<DraggableLinkProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative cursor-default touch-none"
    >
      <MdDragHandle
        {...listeners}
        className="inline-block cursor-pointer text-grey hover:text-black top-[20px] left-[1.2rem] text-[1.5rem] mr-2 absolute z-[50]"
      />
      {children}
    </div>
  );
};

export default DraggableLink;
