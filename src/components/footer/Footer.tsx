import styles from "./Footer.module.css";
import Link from "next/link";

export default function FooterComponent() {
    
    return (
        <footer className={styles.footer}>
            
            <div className={styles.links}>
                <Link href={"/documents/privacy"}>Privacy</Link>
                <Link href={"/"}>Terms of Service</Link>
                <Link href={"/"}>Imprint</Link>
                <Link href={"/contact"}>Contact</Link>
            </div>
            <div className={styles.copyright}>
                <p>&copy; 2026 Note Tracker. All rights reserved.</p>
            </div>
        </footer>
    );
}