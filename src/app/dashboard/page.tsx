import SubjectCardComponent from "@/components/subjectCard/SubjectCard";
import styles from "./page.module.css";

export default function Dashboard() {
    
    return(
        <div className={styles.page}>
            <div className={styles.title}>
                <h1>Wellcome back, USERNAME</h1>
            </div>
            <div className={styles.subjects}>
                {}
            </div>
        </div>
    );
}