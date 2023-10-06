import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonProps<T extends ElementType> = {
  renderAs?: T;
  children: ReactNode;
  role: "primary" | "secondary";
  cssClass?: string;
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = "button">({
  renderAs,
  children,
  role,
  cssClass,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  const cssClasses =
    role === "primary"
      ? "bg-purple text-white enabled:hover:bg-purpleHover disabled:opacity-25 shadow-[0px_0px_32px_0px_rgba(99,_60,_255,_0.25)]"
      : "text-purple border-[1px] border-purple bg-white enabled:hover:bg-lightPurple disabled:opacity-25";
  return (
    <button
      {...rest}
      className={`${cssClass} w-full text-headingS flex justify-center py-[0.6875rem] rounded-lg ${cssClasses} `}
    >
      {children}
    </button>
  );
};
export default Button;
