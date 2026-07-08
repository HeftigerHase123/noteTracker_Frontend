"use client";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Landing() {
  const t = useTranslations();

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>{t("landing.title")}</h1>
        <h3>{t("landing.subtitle")}</h3>
      </div>
      <div className={styles.register}>
        <p>{t("landing.finalCta")}</p>
        <p>{t("landing.registerCta")}</p>
        <button>{t("landing.register")}</button>
      </div>
      <h3 className={styles.features_title}>{t("landing.features.title")}</h3>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h4>{t("landing.features.tracking.title")}</h4>
          <div>
            <Image
              src={"/assets/tracking.png"}
              alt="tracking"
              width={64}
              height={64}
            ></Image>
            <p>{t("landing.features.tracking.text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
