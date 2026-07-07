import Navigation from "../navigation/Navigation";
import styles from "./Header.module.css";

export default function HeaderComponent() {
    
    return(
        <header className={styles.header}>
            <Navigation/>
        </header>
    )
}