import styles from "./page.module.css";
import Image from "next/image";

export default function Landing() {
  return (
    <div className={styles.page}>
      <div className={styles.img_container}>
        <Image src={"/assets/landingpage_bg.jpg"} alt="backgroup image" width={1600} height={900}></Image>
      </div>
      <div className={styles.title}>
        <h1>Keep track of your grades</h1>
        <h3>Enter your grades and track your progress.</h3>
      </div>
      <div className={styles.register}>
        <p>Ready to track your grade average?</p>
        <p>Register for free now</p>
        <button>Register</button>
      </div>
      <h3 className={styles.features_title}>What to expect</h3>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h4>Grade Tracking</h4>
          <div>
            <Image
              src={"/assets/tracking.png"}
              alt="tracking"
              width={64}
              height={64}
            ></Image>
            <p>
              Enter your grades and always keep track of your average grade.
            </p>
          </div>
        </div>
        <div className={styles.feature}>
          <h4>Average Calculation</h4>
          <div>
            <Image
              src={"/assets/edit.png"}
              alt="tracking"
              width={64}
              height={64}
            ></Image>
            <p>
              See your overall grade average update automatically as you add new
              grades.
            </p>
          </div>
        </div>
        <div className={styles.feature}>
          <h4>Export Grades</h4>
          <div>
            <Image
              src={"/assets/export.png"}
              alt="tracking"
              width={64}
              height={64}
            ></Image>
            <p>
              Export your grades anytime as a PDF or spreadsheet to share or
              keep for your records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
