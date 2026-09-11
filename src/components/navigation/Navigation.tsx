"use client"

import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";
import Link from "next/link";

export const navigationLinks = [
    {
        name: "Home",
        path: "/home"
    },
    {
        name: "Class Schedule",
        path: "/classschedule"
    },
    {
        name: "Grades",
        path: "/grades"
    },
    {
        name: "Profile",
        path: "/profile",
        children: [
            {
                name: "Settings",
                path: "/profile/settings"
            },
            {
                name: "Logout",
                path: "/auth/logout"
            }
        ]
    }
];

export const landingLinks = [
    {
        name: "Home",
        path: "/home"
    },
    {
        name: "About",
        path: "/about"
    },
    {
        name: "Grades",
        path: "/grades"
    },
    {
        name: "Profile",
        path: "/profile"
    }
];


export default function NavigationComponent() {
    const pathname = usePathname();

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