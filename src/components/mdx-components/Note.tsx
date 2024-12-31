import { ReactNode } from "react";

export default function Note({ children }: { children: ReactNode }) {
  return (
    <div
      className="my-8 w-full rounded-2xl border-2 border-l-[6px] border-[#EF4445] bg-[#EF444514]
        px-4 dark:border-[#A78BFA] dark:bg-[#A78BFA14]"
    >
      {children}
    </div>
  );
}
