import { ReactNode } from "react";

type Props = {
  className?: string;
  title: string;
  children: ReactNode;
  button?: ReactNode;
};

export function HelpCard({ className, title, children, button }: Props) {
  return (
    <div
      className={`
        ${className}
        border-border flex min-h-[13.5rem] max-w-[36.25rem] flex-col 
        justify-between rounded-[0.625rem] border 
        border-naturalGray/25 p-[2.18rem]
      `}
    >
      <div>
        <div className="mb-[1.25rem] text-[1.75rem] font-light">{title}</div>
        {children}
      </div>
      {button}
    </div>
  );
}
