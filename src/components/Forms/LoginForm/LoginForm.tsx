"use client";

import { useActionState, useState } from "react";
import styles from "./LoginForm.module.css";
import { ApiError } from "@/models/ApiError";
import Link from "next/link";
import { login } from "@/actions/authAction";

const initialState: ApiError = {
  status: 0,
  message: "",
  fieldErrors: [],
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    login,
    initialState,
  );

  return (
    <form action={formAction} className={styles.form}>
      <div>
        <h2>Login</h2>
      </div>

      <div className={styles.input_container}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        {state?.fieldErrors
          ?.filter((error) => error.field === "username")
          .map((error) => (
            <p key={error.field}>{error.error}</p>
          ))}
      </div>

      <div className={styles.input_container}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        {state?.fieldErrors
          ?.filter((error) => error.field === "password")
          .map((error) => (
            <p key={error.field}>{error.error}</p>
          ))}
      </div>

      <div>
        <button type="submit" disabled={isPending}>
          Login
        </button>
      </div>

      <div>
        <p>
          Create an account <Link href={"/auth/register"}>register</Link>
        </p>
      </div>
    </form>
  );
}
