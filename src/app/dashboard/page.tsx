import SubjectCardComponent from "@/components/subjectCard/SubjectCard";
import styles from "./page.module.css";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import SubjectsAPI from "@/lib/api/Subjects";
import { Subject } from "@/types/Subject";

export default async function Dashboard() {

    const session = await verifySession();

    if (!session) redirect("/404");

    const subjects = await SubjectsAPI.readAll();
    
    return(
        <div className={styles.page}>
            <div className={styles.title}>
                <h1>Wellcome back, {session.user.username}</h1>
            </div>
            <div className={styles.subjects}>
                {subjects.map((subject: Subject) => {
                    return <SubjectCardComponent key={subject.id} subject={subject}/>
                })}
            </div>
        </div>
    );
}