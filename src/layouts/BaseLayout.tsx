import { Outlet } from "react-router-dom";

import Aside from "../components/Aside/Aside";
import Header from "../components/Header/Header";

import style from "../styles/Layout.module.scss";

const Layout = () => {
    return (
        <div>
            <Header/>
            <main className={style.main}>
                <Aside/>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;