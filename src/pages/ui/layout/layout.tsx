import { PropsWithChildren } from "react";
import { Header } from "../header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-[300px] py-[3rem] ml:w-[590px] t:w-[680px] dxs:w-[980px] ds:w-[1190px]">
        {children}
      </div>
    </>
  );
};
