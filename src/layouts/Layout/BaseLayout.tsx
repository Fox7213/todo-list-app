import styled from "@emotion/styled";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Aside from "../Aside/Aside";
import Header from "../Header/Header";

import style from "./Layout.module.scss";

const StyledMain = styled.main`
    background-color: ${props => props.theme.colors.main};
`;

const Layout = () => {
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    
    const toggleAside = () => {
        setIsAsideCollapsed(prev => !prev);
    };

    return (
        <div className={style.layout}>
            <Header onBurgerClick={toggleAside} />
            <StyledMain className={style.main}>
                <Aside isCollapsed={isAsideCollapsed} />
                <div className={style.content}>
                    <Outlet />
                </div>
            </StyledMain>
        </div>
    );
};

export default Layout;