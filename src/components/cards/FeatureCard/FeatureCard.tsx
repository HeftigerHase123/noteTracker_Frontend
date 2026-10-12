import styles from "./FeatureCard.module.css";
import Image from "next/image";

export type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function FeatureCardComponent({
  title, description, image
}: FeatureCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt="Feature Image"
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

/* Platzhalter, solange die Daten geladen werden */
export function FeatureCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`} aria-hidden="true">
      <div className={styles.imageWrapper} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} />
    </div>
  );
}
