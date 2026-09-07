"use client"

import styles from "./page.module.css";
import { navigationLinks } from "@/components/Navigation/Navigation";
import { useRouter } from "next/navigation";

export default function OverviewPage() {
  const router = useRouter();

  const servicesList = navigationLinks.find((link) => link.name === "Übersicht");
  if (servicesList === undefined) return (
    <div>
      <p>Keine Services gefunden...</p>
    </div>
  )

  const handleClick = (path: string) => {
    router.push(path)
  }

  return(
    <div className={styles.grid}>
      {servicesList.children?.map((child, i) => (
        <div className={styles.card} key={i} onClick={() => handleClick(child.path)}>

          <div className={styles.content}>
            <h2>{child.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}