import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function IconButton({ transparent, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      // className={
      //   transparent
      //     ? "bg-white/20 border border-white/10 rounded-md p-1.5"
      //     : "bg-black/10 border border-white/10 rounded-md p-1.5"
      // }
      className={twMerge(
        "bg-white/20 border border-white/10 rounded-md p-1.5",
        transparent ? "bg-black/10" : "bg-white/20",
        props.disabled ? "opacity-50 cursor-not-allowed" : null,)
      }
    />
  );
}
