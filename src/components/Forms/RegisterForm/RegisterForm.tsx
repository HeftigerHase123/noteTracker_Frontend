"use client";
import Link from "next/link";
import styles from "./RegisterForm.module.css";
import CountrySelect from "@/components/CountrySelect/CountrySelect";

export default function RegisterForm() {
  return (
    <form className={styles.form} action="#">
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Create an account!</h1>
      </div>

      <div className={styles.inputs}>
        <input type="text" name="first_name" placeholder="Firstname" autoComplete="given-name" />
        <input type="text" name="last_name" placeholder="Lastname" autoComplete="family-name" />
        <input type="email" name="email" placeholder="Email" autoComplete="email" />

        <div className={styles.phoneRow}>
          <CountrySelect />
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone number"
            autoComplete="tel-national"
            className={styles.phoneNumber}
          />
        </div>

        <input type="text" name="username" placeholder="Username" autoComplete="username" />
        <input type="password" name="password" placeholder="Password" autoComplete="new-password" />
        <input type="password" name="confirmPassword" placeholder="Confirm password" autoComplete="new-password" />
      </div>

      <button type="submit">Sign up</button>

      <p className={styles.loginLink}>
        I already have an account <Link href="/auth/login">Login</Link>
      </p>
    </form>
  );
}