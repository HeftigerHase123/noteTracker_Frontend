import styles from "./Navigation.module.css";
import Link from "next/link";

export const navigationLinks = [
    {
        name: "Home",
        path: "/home"
    },
    {
        name: "Übersicht",
        path: "/overview",
        children: [
            {
                name: "Stundenplan",
                path: "/timetable"
            },
            {
                name: "Noten",
                path: "/grades"
            }
        ]
    },
    {
        name: "Einstellungen",
        path: "/#"
    }
];

export default function NavigationComponent() {
    return (
        <nav className={styles.nav}>
            <ul>
                {navigationLinks.map((item, i) => (
                    <li key={i}>
                        <Link href={item.path}>{item.name}</Link>

                        {item.children && (
                            <ul>
                                {item.children.map((child, i) => (
                                    <li key={i}>
                                        <Link href={child.path}>{child.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}