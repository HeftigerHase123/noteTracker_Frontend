import styles from "./page.module.css";
import Image from "next/image";
import RegisterForm from "@/components/Forms/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.register}>
        <RegisterForm />
      </div>
      <div className={styles.image}>
        <Image
          src={"/assets/images/register_cover.png"}
          alt="Register Images"
          width={300}
          height={300}
        ></Image>
      </div>
    </div>
  );
}
