import React from 'react';

import style from "../../styles/Header.module.scss";

import burg from "../../image/Header/burg.svg"
import iconSrc from "../../image/Header/iconSrc.svg"
import bell from "../../image/Header/bell.svg"
import moon from "../../image/Header/moon.svg"
import man from "../../image/Header/man.svg"

const Header = () => {
    const [value, setValue] = React.useState("");

    return (
        <header className={style.header}>
            <div className={'burger'}>
                <img src={burg} alt="" />
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