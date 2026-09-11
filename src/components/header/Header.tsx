"use client"

import { usePathname } from "next/navigation";
import NavigationComponent from "../Navigation/Navigation";
import styles from "./Header.module.css";
import Image from "next/image";

export default function HeaderComponent() {
  const pathname = usePathname();

  const hideHeader = pathname.startsWith("/auth/");

  if (hideHeader) return;
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Image
          src={"/assets/logos/app-icon-light.png"}
          alt="Web Logo"
          width={50}
          height={50}
        ></Image>
        <h2>NoteTracker</h2>
      </div>
      <div className={styles.right}>
        <NavigationComponent />
      </div>
    </header>
  );
}
