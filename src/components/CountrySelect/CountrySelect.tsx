"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CountrySelect.module.css";
import { countries, countryImage } from "@/lib/countries";
import { Country } from "@/models/user/CountryEnum";

type Props = {
  name?: string;
  defaultValue?: Country;
};

export default function CountrySelect({ name = "phone_country", defaultValue = Country.CH }: Props) {
  const codes = Object.keys(countries) as Country[];
  const [selected, setSelected] = useState<Country>(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(codes.indexOf(defaultValue));
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
    setSelected(code);
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
      <input type="hidden" name={name} value={selected} />

      <button
        type="button"
        className={styles.button}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Country code"
        onClick={() => setOpen((o) => !o)}
      >
        <Image src={countryImage(selected)} alt="" width={20} height={20} unoptimized />
        <span>{countries[selected].phone_prefix}</span>
        <span className={styles.arrow} aria-hidden>▾</span>
      </button>

      {open && (
        <ul role="listbox" className={styles.list}>
          {codes.map((code, i) => (
            <li
              key={code}
              role="option"
              aria-selected={code === selected}
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