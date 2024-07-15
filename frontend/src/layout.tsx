import { Outlet } from "react-router-dom";
import Navbar from "@/components/custom/navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
}
