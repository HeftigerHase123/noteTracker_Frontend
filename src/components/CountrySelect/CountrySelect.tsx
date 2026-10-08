"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CountrySelect.module.css";
import { countries, countryImage } from "@/lib/countries";
import { Country } from "@/models/user/CountryEnum";

type Props = {
  name?: string;
  value: Country;
  onChange: (country: Country) => void;
};

export default function CountrySelect({ name = "phone_country", value, onChange }: Props) {
  const codes = Object.keys(countries) as Country[];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(codes.indexOf(value));
  const ref = useRef<HTMLDivElement>(null);

  // Klick ausserhalb schliesst die Liste
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const choose = (code: Country) => {
    onChange(code);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, codes.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if ((e.key === "Enter" || e.key === " ") && open) {
      e.preventDefault();
      choose(codes[active]);
    }
  };

  return (
    <div className={styles.dropdown} ref={ref} onKeyDown={onKeyDown}>
      {/* liefert phone_country ins FormData */}
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        className={styles.button}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Country code"
        onClick={() => setOpen((o) => !o)}
      >
        <Image src={countryImage(value)} alt="" width={20} height={20} unoptimized />
        <span>{countries[value].phone_prefix}</span>
        <span className={styles.arrow} aria-hidden>▾</span>
      </button>

      {open && (
        <ul role="listbox" className={styles.list}>
          {codes.map((code, i) => (
            <li
              key={code}
              role="option"
              aria-selected={code === value}
              className={i === active ? styles.active : undefined}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(code)}
            >
              <Image src={countryImage(code)} alt="" width={20} height={20} />
              <span className={styles.name}>{countries[code].name}</span>
              <span className={styles.prefix}>{countries[code].phone_prefix}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}