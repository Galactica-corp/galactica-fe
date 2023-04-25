import { PropsWithChildren } from "react";
import { Button } from "shared/ui/button";
import { Header } from "../header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Button size="32" reverse iconName="close" theme="grayNickel" outline>
        Hello
      </Button>
      {children}
    </>
  );
};
