import styles from "./SubjectCard.module.css";


type Object = {
    subject: string;
    grades: number[];
}

type Props = {
    props: Object;
};


export default function SubjectCardComponent({ props }: Props) {
    
    return(
        <div className={styles.page}>
            <h1>Hallo</h1>
        </div>
    );
}