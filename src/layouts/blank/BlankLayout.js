import { Outlet } from "react-router";
import Header from "../full/header/Header";

const BlankLayout = () => (
  <>
    {/* <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} /> */}
    <Outlet />
  </>
);

export default BlankLayout;
