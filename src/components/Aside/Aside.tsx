import { Link } from "react-router-dom";
import style from "../../styles/Aside.module.scss";

import i1 from "../../image/Aside/dashboard.svg";
import i2 from "../../image/Aside/allTask.svg";
import i3 from "../../image/Aside/completedTsk.svg";
import i4 from "../../image/Aside/AddTask.svg";

const Aside = () => {
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
        <aside>
            {menuItems.map((item, index) => (
                <Link
                    to={item.path}
                    key={index}
                    className={style.link}
                >
                    <img src={item.icon} alt={item.label} />
                    <span>{item.label}</span>
                </Link>
            ))}
        </aside>
    )
}

export default Aside
