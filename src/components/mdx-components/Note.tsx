import { ReactNode } from 'react';

export default function Note({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 w-full border-2 border-l-[6px] rounded-2xl my-8 border-[#EF4445] dark:border-[#A78BFA] bg-[#EF444514] dark:bg-[#A78BFA14]">
      {children}
    </div>
  );
}
