import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";
import { verifySession } from "@/lib/sessionLogic";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default async function NotFound() {
  const token = await verifySession();
  const homeLink = token ? "/home" : "/";

  return (
    <div className={styles.page}>
      <style>{`header { display: none !important; }`}</style>
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <p>This page was not found.</p>
      <Link href={homeLink}>Back to Home</Link>
    </div>
  );
}
