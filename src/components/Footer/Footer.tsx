import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

export type FooterLinkProps = {
  name: string;
  herf: string;
}

export const footerLinkList: FooterLinkProps[] = [
  {
    name: "Impressum",
    herf: "/documents/impressum"
  },
  {
    name: "Datenschutz",
    herf: "/documents/datenschutz"
  },
  {
    name: "Allgemeine Geschäftsbedingung",
    herf: "/documents/agb"
  }
];

export default function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.header} ${styles.flex}`}>
        <Image
          src={"/assets/logos/app-icon-light.png"}
          alt="Web Logo"
          width={50}
          height={50}
        ></Image>
        <h2>NoteTracker</h2>
      </div>
      <div className={`${styles.links} ${styles.flex}`}>
        {footerLinkList.map((link, i) => (
          <Link key={i} href={link.herf}>{link.name}</Link>
        ))}
      </div>
      <div className={`${styles.ending} ${styles.flex}`}>
        <p>Copyright &copy; 2026 All rights reserved by NoteTracker</p>
      </div>
    </footer>
  );
}
