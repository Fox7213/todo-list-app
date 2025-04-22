import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import style from "./Aside.module.scss";

import i4 from "../../image/Aside/AddTask.svg";
import i2 from "../../image/Aside/allTask.svg";
import i3 from "../../image/Aside/completedTsk.svg";
import i1 from "../../image/Aside/dashboard.svg";

interface AsideProps {
    isCollapsed: boolean;
}

const StyledAside = styled.aside`
    background-color: ${props => props.theme.colors.aside};
`;

const Aside = ({ isCollapsed }: AsideProps) => {
    const menuItems = [
        {
            path: "/",
            label: "Dashboard",
            icon: i1,
        },
        {
            path: "/alltasks",
            label: "All Tasks",
            icon: i2,
        },
        {
            path: "/completedtasks",
            label: "Completed Tasks",
            icon: i3,
        },
        {
            path: "/addtask",
            label: "Add A Task",
            icon: i4,
        },
    ];

    return (
        <StyledAside className={isCollapsed ? style.collapsed : ""}>
            {menuItems.map((item, index) => (
                <Link
                    to={item.path}
                    key={index}
                    className={style.link}
                >
                    <img src={item.icon} alt={item.label} />
                    {!isCollapsed && <span>{item.label}</span>}
                </Link>
            ))}
        </StyledAside>
    );
};

export default Aside;
