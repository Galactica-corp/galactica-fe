import { PropsWithChildren } from "react";
import { Button } from "shared/ui/button";
import { Header } from "../header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-[300px] ml:w-[590px] t:w-[680px] dxs:w-[980px] ds:w-[1190px]">
        <Button size="32" reverse iconName="close" theme="grayNickel" outline>
          Hello
        </Button>
        {children}
      </div>
    </>
  );
};
