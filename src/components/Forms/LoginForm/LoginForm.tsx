"use client";
import styles from "./LoginForm.module.css";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form className={styles.form} action="#">
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Hello Again!</h1>
      </div>
      <div className={styles.inputs}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
      </div>
      <div className={styles.container}>
        <div className={styles.remember}>
          <label htmlFor="rememberMe">Remember me</label>
          <input type="checkbox" name="rememberMe" id="rememberMe" />
        </div>
        <div className={styles.forgot}>
          <p>Forgot password?</p>
        </div>
      </div>
      <button type="submit">Login</button>
      <p className={styles.registerLink}>
        create an account <Link href={"/auth/register"}>register</Link>
      </p>
    </form>
  );
}
