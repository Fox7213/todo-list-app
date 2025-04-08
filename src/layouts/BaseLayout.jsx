import React from 'react';
import Header from "../components/Header.jsx";
import {Link, Outlet} from "react-router-dom";
import style from "../styles/Layout.module.scss";

const Layout = () => {
    return (
        <div>
            <Header/>
            <main className={style.main}>
                <aside>
                    <Link to={""}>Hello wo</Link>
                    <Link to={""}>Hello wo</Link>
                    <Link to={""}>Hello wo</Link>
                </aside>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;