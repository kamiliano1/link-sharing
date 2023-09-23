import React, {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useState,
} from "react";
import * as Select from "@radix-ui/react-select";
import { linksList } from "./linkList";
import { BsChevronDown } from "react-icons/bs";
export const SelectDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Select.Root onOpenChange={(value) => setIsOpen(value)}>
      <Select.Trigger
        className="inline-flex items-center text-black justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-bodyS shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
        aria-label="platform"
      >
        <Select.Value>aaaa</Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-bodyS cursor-default"></Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Meat
              </Select.Label>
              <BsChevronDown
                className={`text-purple ml-auto cursor-pointer ${
                  isOpen && "rotate-180"
                }
          duration-[200ms]
          rotate-0 will-change-transform`}
              />
              {linksList.map((item) => {
                return (
                  <SelectItem key={item.name} value={item.name}>
                    <div className="flex items-center">
                      <item.icon />
                      <p className="ml-3">{item.name}</p>
                    </div>
                  </SelectItem>
                );
              })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-bodyS cursor-default"></Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

type SelectItemType<T extends ElementType> = {
  children: ReactNode;
  value: string;
} & ComponentPropsWithoutRef<T>;

const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectItemType<ElementType>
>(({ children, ...rest }, forwardedRef) => {
  return (
    <Select.Item
      className="text-[13px] text-grey leading-none text-bodyS border-[1px] rounded-lg border-[#D9D9D9] 
      px-4 py-3 relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none 
      flex items-center cursor-pointer hover:text-purple  "
      {...rest}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      {/* <Select.ItemIndicator className="absolute left-0 w-[25px] text-red inline-flex items-center justify-center"></Select.ItemIndicator> */}
    </Select.Item>
  );
});
SelectItem.displayName = "SelectItem";
