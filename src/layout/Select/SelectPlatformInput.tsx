import React, {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from "react";
import * as Select from "@radix-ui/react-select";
import { linksList } from "./linkList";
import { BsChevronDown } from "react-icons/bs";
import { PlatfromsType } from "./ActiveLinksType";

type SelectPlatformInputProps = {
  onChange: () => void;
  value: string;
  name: string;
};

export const SelectPlatformInput = forwardRef<
  HTMLButtonElement,
  SelectPlatformInputProps
>(({ value, onChange, name }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Select.Root
      name={name}
      value={value}
      onOpenChange={(value) => setIsOpen(value)}
      onValueChange={onChange}
    >
      <Select.Trigger
        ref={ref}
        className="inline-flex items-center border-[1px] border-borders text-black justify-center rounded py-3 px-4 w-full leading-none bg-white bodyXS-bodyS hover:shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)] hover:border-purple outline-none"
        aria-label="platform"
      >
        <Select.Value aria-label={value} />
        <BsChevronDown
          className={`text-purple ml-auto cursor-pointer ${
            isOpen && "rotate-180"
          } duration-[200ms] rotate-0 will-change-transform`}
        />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          className="overflow-hidden bg-white rounded-md mt-8 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] SelectContent z-[9999]"
        >
          <Select.Group>
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
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white bodyXS-bodyS cursor-default"></Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
});

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
      className="text-[13px] text-grey leading-none text-bodyXS border-[1px] rounded-lg border-[#D9D9D9] 
      px-4 py-3 relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none 
      flex items-center cursor-pointer hover:text-purple --radix-select-trigger-width"
      {...rest}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});
SelectItem.displayName = "SelectItem";
SelectPlatformInput.displayName = "DropMenu";
