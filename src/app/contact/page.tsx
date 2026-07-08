import styles from "./page.module.css";
import Image from "next/image";

export default function Contact() {
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h2>Get in touch</h2>
        <p>
          {
            "If you have any inquiries get in touch with us. We'll be happy to help you."
          }
        </p>
      </div>
      <div className={styles.contact_contianer}>
        <a className={styles.email} href="mailto:Email.support@noteTracker.ch">
          <Image
            src={"/assets/mail_black.png"}
            alt="mail icon"
            width={32}
            height={32}
          ></Image>

          <p>Email.support@noteTraker</p>
        </a>
      </div>
    </div>
  );
}
