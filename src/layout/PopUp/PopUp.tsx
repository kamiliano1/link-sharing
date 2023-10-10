type PopUpProps = {};
import { IoMdSave } from "react-icons/io";
import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

const PopUp = () => {
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);
  <div
    className={`bg-darkGrey flex items-center text-white rounded-xl px-6 py-4 text-headingS w-[406px] absolute bottom-[20px] z-[200] `}
  >
    <IoMdSave />
    <p className="ml-2">Your changes have been successfully saved!</p>
  </div>;

  return (
    <>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        KLIKAJ
      </button>
      <Toast.Provider swipeDirection="down">
        <button
          className="inline-flex items-center justify-center rounded font-medium text-[15px] px-[15px] leading-[35px] h-[35px] bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          onClick={() => {
            setOpen(false);
            window.clearTimeout(timerRef.current);
          }}
        >
          Add to calendar
        </button>

        <Toast.Root
          className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
            Scheduled: Catch up
          </Toast.Title>
          <Toast.Description asChild>
            {/* <div className="flex items-center"> */}
            {/* <IoMdSave /> */}
            <p className="ml-2">Your changes have been successfully saved!</p>
            {/* </div> */}
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </>
  );
};

export default PopUp;
