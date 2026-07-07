"use client"
import Navigation from "../navigation/Navigation";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function HeaderComponent() {

    const HIDDEN_ROUTES = ["/"];
    const pathname = usePathname();

    if (HIDDEN_ROUTES.includes(pathname)) {
        return null;
    } else {
        return(
        <header className={styles.header}>
            <Navigation/>
        </header>
    );
    }
}