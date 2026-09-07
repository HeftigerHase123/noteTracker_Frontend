import { LogoutButton } from "hofmannki";
import NavigationComponent from "../Navigation/Navigation";
import styles from "./Header.module.css";
import Image from "next/image";

export default function HeaderComponent() {
  return (
    <header className={styles.header}>
      <div className={styles.up}>
        <div className={styles.left}>
          <Image
            src={"/assets/logos/app-icon-light.png"}
            alt="App Logo"
            width={150}
            height={150}
          ></Image>
          <h1>
            <strong>Note</strong>
            <br />
            Tracker
          </h1>
        </div>
        <div className={styles.right}>
          <div>
            <LogoutButton isDarkMode={false}/>
          </div>
        </div>
      </div>
      <div className={styles.down}>
        <NavigationComponent />
      </div>
    </header>
  );
}
