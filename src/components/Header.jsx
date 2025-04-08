import React from 'react';
import style from "../styles/Header.module.scss"

const Header = () => {

    const [value, setValue] = React.useState("");

    return (
        <header className={style.header}>
            <div className={'burger'}></div>
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <nav>
                <div>bell</div>
                <div>moon</div>
                <div>profile</div>
            </nav>
        </header>
    );
};

export default Header;