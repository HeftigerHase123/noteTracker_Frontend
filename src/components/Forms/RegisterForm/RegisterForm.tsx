"use client";
import Link from "next/link";
import styles from "./RegisterForm.module.css";
import CountrySelect from "@/components/CountrySelect/CountrySelect";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { register } from "@/actions/authAction";
import { Country } from "@/models/user/CountryEnum";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { isLoggedIn } from "@/lib/sessionLogic";
import { redirect } from "next/navigation";

export type RegisterState = {
  error: string | null;
  fieldErrors: Record<string, string>;
  success: boolean;
};

const initialState: RegisterState = {
  error: null,
  fieldErrors: {},
  success: false,
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, initialState);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_country: Country.CH,
    phone_number: "",
    username: "",
  });
  const [showHiddenElement, setShowHiddenElement] = useState({
    password: false,
    confirm_password: false,
  });

  useEffect(() => {
    const checkCookie = async () => {
      const check = await isLoggedIn();
      if (check) redirect("/home");
    };

    checkCookie();
  }, []);

  useEffect(() => {
    if (state.success) toast.success("Register Success");
    redirect("/home");
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Create an account!</h1>
      </div>
      <div className={styles.down}>
        <div className={styles.inputs}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="first_name"
              placeholder="Firstname"
              autoComplete="given-name"
              value={form.first_name}
              onChange={(e) => handleChange(e)}
            />
            {state.fieldErrors.first_name && (
              <small>{state.fieldErrors.first_name}</small>
            )}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="last_name"
              placeholder="Lastname"
              autoComplete="family-name"
              value={form.last_name}
              onChange={(e) => handleChange(e)}
            />
            {state.fieldErrors.last_name && (
              <small>{state.fieldErrors.last_name}</small>
            )}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => handleChange(e)}
            />
            {state.fieldErrors.email && (
              <small>{state.fieldErrors.email}</small>
            )}
          </div>

          <div className={styles.phoneRow}>
            <CountrySelect
              value={form.phone_country}
              onChange={(country) =>
                setForm((prev) => ({ ...prev, phone_country: country }))
              }
            />
            <div>
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone number"
                autoComplete="tel-national"
                className={styles.phoneNumber}
                value={form.phone_number}
                onChange={(e) => handleChange(e)}
              />
              {state.fieldErrors.phone_number && (
                <small>{state.fieldErrors.phone_number}</small>
              )}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="username"
              value={form.username}
              onChange={(e) => handleChange(e)}
            />
            {state.fieldErrors.username && (
              <small>{state.fieldErrors.username}</small>
            )}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.passwordWrapper}>
              <input
                type={showHiddenElement.password ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="new-password"
              />

              <button
                type="button"
                className={styles.toggleButton}
                onClick={() =>
                  setShowHiddenElement((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
                aria-label={
                  showHiddenElement.password ? "Hide password" : "Show password"
                }
              >
                {showHiddenElement.password ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {state.fieldErrors.password && (
              <small>{state.fieldErrors.password}</small>
            )}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.passwordWrapper}>
              <input
                type={showHiddenElement.confirm_password ? "text" : "password"}
                name="confirm_password"
                placeholder="Confirm password"
                autoComplete="new-password"
              />

              <button
                type="button"
                className={styles.toggleButton}
                onClick={() =>
                  setShowHiddenElement((prev) => ({
                    ...prev,
                    confirm_password: !prev.confirm_password,
                  }))
                }
                aria-label={
                  showHiddenElement.confirm_password
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showHiddenElement.confirm_password ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {state.fieldErrors.confirm_password && (
              <small>{state.fieldErrors.confirm_password}</small>
            )}
          </div>
        </div>

        <button type="submit" disabled={isPending}>
          {isPending && <span className={styles.spinner} aria-hidden="true" />}
          {isPending ? "Loading..." : "Sign up"}
        </button>

        <p className={styles.loginLink}>
          I already have an account <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </form>
  );
}
