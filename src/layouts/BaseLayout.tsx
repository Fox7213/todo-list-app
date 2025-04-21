import { useState } from "react";
import { Outlet } from "react-router-dom";

import Aside from "./Aside/Aside";
import Header from "./Header/Header";

import style from "../styles/Layout.module.scss";

const Layout = () => {
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    
    const toggleAside = () => {
        setIsAsideCollapsed(prev => !prev);
    };

    return (
        <div>
            <Header onBurgerClick={toggleAside} />
            <main className={style.main}>
                <Aside isCollapsed={isAsideCollapsed} />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;