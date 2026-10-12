import FeatureCardComponent, {
  FeatureCardProps,
} from "@/components/cards/FeatureCard/FeatureCard";
import styles from "./page.module.css";
import Link from "next/link";

export const defaultFeatureImagesUrl = "/assets/images/features/";
export const featureList: FeatureCardProps[] = [
  {
    title: "Track your Grades",
    description:
      "With this feature you can track your grades for each subject. So you have an overview at any time and never lose it.",
    image: "",
  },
  {
    title: "Create your schedule",
    description:
      "Keep your class schedule in one place. With this feature you can create your class schedule and save them for the best overview. Now you wont miss any lessen.",
    image: "",
  },
];

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
          <div className={styles.head}>
            <div className={styles.header}>
              <h1>Features</h1>
            </div>
            <div className={styles.description}>
              <p>
                Discover the key features that simplify your school life. Keep
                track of your class schedule and grades, all in one place.
              </p>
            </div>
          </div>
          <div className={styles.feature_grid}>
            {featureList.map((feature, i) => {
              const url = `${defaultFeatureImagesUrl}${feature.image}`;
              return (
                <FeatureCardComponent
                  key={i}
                  title={feature.title}
                  description={feature.description}
                  image={url}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section id="about" className={styles.about}>
        <div>
          <div className={styles.head}>
            <div className={styles.header}>
              <h1>About</h1>
            </div>
            <div className={styles.description}>
              <p>
                NoteTracker is designed to make student life easier. It brings
                your class schedule and grades together in one place, helping
                you stay organised, track your progress and keep an overview of
                your school life.
              </p>
            </div>
            <ul>
              <li>
                <strong>Stay Organised</strong> - Keep your class schedule in
                one place.
              </li>
              <li>
                <strong>Track Your Progress</strong> - Monitor your grades and
                academic performance.
              </li>
              <li>
                <strong>Everything in One Place</strong> - Access your school
                information easily.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
