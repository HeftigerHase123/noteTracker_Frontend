import LoginForm from "@/components/Forms/LoginForm/LoginForm";
import styles from "./page.module.css";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <LoginForm />
      </div>
      <div className={styles.image}>
        <Image
          src={"/assets/images/login_cover.png"}
          alt="Login Images"
          width={300}
          height={300}
        ></Image>
      </div>
    </div>
  );
}
