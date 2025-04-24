import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useStore } from '../../storage/StoreContext';
import { useTheme } from '../../theme/ThemeContext';

import style from "./Header.module.scss";

import Add from '../../image/Add.svg';
import burg from "../../image/Header/burg.svg";
import iconSrc from "../../image/Header/iconSrc.svg";
import moon from "../../image/Header/moon.svg";

interface HeaderProps {
    onBurgerClick: () => void;
}

const StyledHeader = styled.header`
    background-color: ${props => props.theme.colors.header};
`;

const Header = observer(({ onBurgerClick }: HeaderProps) => {
    const { taskStore } = useStore();
    const location = useLocation();
    const { toggleTheme } = useTheme();
    
    // проверка нахождения на странице Home
    const isHomePage = location.pathname === '/';

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        taskStore.setSearchQuery(e.target.value);
    };

    return (
        <StyledHeader className={style.header}>
            <div className={style.burger} onClick={onBurgerClick}>
                <img src={burg} alt="Menu" />
            </div>

            {isHomePage && (
                <div className={style.inputWrapper}>
                    <input
                        value={taskStore.searchQuery}
                        onChange={handleSearchChange}
                        className={style.styledInput}
                        placeholder="Search tasks..."
                    />
                    <img src={iconSrc} alt="search" className={style.searchIcon} />
                </div>
            )}

            <nav className={style.NavBar}>
                <div onClick={toggleTheme}>
                    <img src={moon} alt="Toggle theme" />
                </div>
                <Link to="/addTask">
                    <img src={Add} alt="Add task" />
                </Link>
            </nav>
        </StyledHeader>
    );
});

export default Header;