"use client";

import { useActionState, useState } from "react";
import styles from "./RegisterForm.module.css";
import { ApiError } from "@/models/ApiError";
import Link from "next/link";
import { register } from "@/actions/authAction";

const initialState: ApiError = {
  status: 0,
  message: "",
  success: false,
  fieldErrors: [],
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <div>
        <h2>Register</h2>
      </div>

      <div className={styles.input_container}>
        <label htmlFor="email">Email address</label>
        <input type="text" name="email" required={true} />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required={true} />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="password" name="confirmPassword" required={true} />
      </div>

      <div>
        <button type="submit" disabled={isPending}>
          Register
        </button>
      </div>

      <p>
        Do you already have an account{" "}
        <Link href={"/auth/login"}>login</Link>
      </p>
    </form>
  );
}
