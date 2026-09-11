import styles from "./page.module.css";
import Image from "next/image";
import RegisterForm from "@/components/Forms/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Image
          src={"/assets/logos/app-icon-light.png"}
          alt="App Logo"
          width={40}
          height={40}
        ></Image>
        <h2>NoteTracker.ch</h2>
      </div>
      <RegisterForm />
    </div>
  );
}
