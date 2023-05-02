import { Outlet } from "react-router-dom";
import { Header } from "../header";

export const Layout = () => {
  return (
    <>
      <Header />
      <div className="mx-auto w-[300px] ml:w-[590px] t:w-[680px] dxs:w-[980px] ds:w-[1190px]">
        <Outlet />
      </div>
    </>
  );
};
