import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useStore } from '../../storage/StoreContext';

import style from "./Header.module.scss";

import Add from '../../image/Add.svg';
import burg from "../../image/Header/burg.svg";
import iconSrc from "../../image/Header/iconSrc.svg";
import moon from "../../image/Header/moon.svg";

interface HeaderProps {
    onBurgerClick: () => void;
}

const Header = observer(({ onBurgerClick }: HeaderProps) => {
    const { taskStore } = useStore();
    const location = useLocation();
    
    // Check if we're on the home page
    const isHomePage = location.pathname === '/';

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        taskStore.setSearchQuery(e.target.value);
    };

    return (
        <header className={style.header}>
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
                <div><img src={moon} alt="" /></div>
                <Link to="/addTask">
                    <img src={Add} alt="" />
                </Link>
                {/* <div><img src={bell} alt="" /></div>
                <div><img src={man} alt="" /></div> */}
            </nav>
        </header>
    );
});

export default Header;