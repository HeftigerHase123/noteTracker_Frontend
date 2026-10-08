"use client";
import { login } from "@/actions/authAction";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { useState, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { isLoggedIn } from "@/lib/sessionLogic";
import { redirect } from "next/navigation";


export type LoginState = {
  error: string | null;
  fieldErrors: Record<string, string>;
  success: boolean;
};

const initialState: LoginState = {
  error: null,
  fieldErrors: {},
  success: false,
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkCookie = async() => {
      const check = await isLoggedIn();
      if (check) redirect("/home");
    };

    checkCookie();
  }, [])

  useEffect(() => {
    if (state.success) toast.success("Login Success");
    redirect("/home");
  }, [state]);

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Hello Again!</h1>
      </div>
      <div className={styles.inputs}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          {state.fieldErrors.username && (
            <small>{state.fieldErrors.username}</small>
          )}
        </div>

        <div>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              data-testid="toggle-password"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {state.fieldErrors.password && (
            <small>{state.fieldErrors.password}</small>
          )}
          {!state.fieldErrors.password && state.error && <small>{state.error}</small>}
        </div>
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
      <button type="submit" disabled={isPending}>
        {isPending && <span className={styles.spinner} aria-hidden="true" />}
        {isPending ? "Loading..." : "Login"}
      </button>
      <p className={styles.registerLink}>
        create an account <Link href={"/auth/register"}>register</Link>
      </p>
    </form>
  );
}
