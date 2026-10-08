import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";
import { verifySession } from "@/lib/sessionLogic";
import Image from "next/image";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default async function NotFound() {
  const token = await verifySession();
  const homeLink = token ? "/home" : "/";

  return (
    <div className={styles.page}>
      <style>{`header { display: none !important; }`}</style>
      <Image src={"/assets/images/not-found.png"} alt="Not found Image" height={1920} width={1851}></Image>
      <h2>This page not found</h2>
      <Link href={homeLink}>Back to Home</Link>
    </div>
  );
}
