import styles from "./Footer.module.css";
import Link from "next/link";

export default function FooterComponent() {
    
    return (
        <footer className={styles.footer}>
            <div className={styles.title}>
                <h3>Note Tracker - For Students</h3>
                <h5>Keep track of your grades, effortlessly.</h5>
            </div>
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