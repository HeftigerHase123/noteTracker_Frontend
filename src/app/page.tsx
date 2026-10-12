import styles from "./page.module.css";
import Link from "next/link";

export default function Landing() {
  return (
    <div className={styles.page}>
      <section id="home" className={styles.home}>
        <div className={styles.left}>
          <div>
            <div className={styles.header}>
              <h1>The NoteTracker for Students and Apprentices</h1>
            </div>
            <div className={styles.description}>
              <p>
                Record your grades, analyze your performance, and calculate your
                semester grades reliably and clearly. Always know where you
                stand and what you need to reach your goal.
              </p>
            </div>
            <div className={styles.register}>
              <Link href={"/auth/register"}>Start for free</Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={`${styles.blob} ${styles.yaleBlue}`} />
          <div className={`${styles.blob} ${styles.coolSky}`} />
          <div className={`${styles.blob} ${styles.icyBlue}`} />
          <div className={`${styles.blob} ${styles.gray}`} />
        </div>
      </section>
      <section id="features" className={styles.features}>
        <div>
          <h1>Features</h1>
        </div>
      </section>
      <section id="about" className={styles.about}>
        <div>
          <h1>About</h1>
        </div>
      </section>
    </div>
  );
}
