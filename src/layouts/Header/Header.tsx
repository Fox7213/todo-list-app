import React from 'react';

import style from "./Header.module.scss";

import bell from "../../image/Header/bell.svg";
import burg from "../../image/Header/burg.svg";
import iconSrc from "../../image/Header/iconSrc.svg";
import man from "../../image/Header/man.svg";
import moon from "../../image/Header/moon.svg";

interface HeaderProps {
    onBurgerClick: () => void;
}

const Header = ({ onBurgerClick }: HeaderProps) => {
    const [value, setValue] = React.useState("");

    return (
        <header className={style.header}>
            <div className={style.burger} onClick={onBurgerClick}>
                <img src={burg} alt="Menu" />
            </div>

            <div className={style.inputWrapper}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={style.styledInput}
                    placeholder="write you project name"
                />
                <img src={iconSrc} alt="search" className={style.searchIcon} />
            </div>

            {/* <input value={value} onChange={(e) => setValue(e.target.value)} /> */}
            <nav className={style.NavBar}>
                <div><img src={bell} alt="" /></div>
                <div><img src={moon} alt="" /></div>
                <div><img src={man} alt="" /></div>
            </nav>
        </header>
    );
};

export default Header;