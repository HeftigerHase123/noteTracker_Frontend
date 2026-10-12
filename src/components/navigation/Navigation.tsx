"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Navigation.module.css";
import Link from "next/link";
import { verifySession } from "@/lib/sessionLogic";
import Image from "next/image";

export type NavigationChildren = {
  name: string;
  path: string;
};

export type NavigationLink = {
  name: string;
  path: string;
  children?: NavigationChildren[];
};

export const navigationLinks: NavigationLink[] = [
  { name: "Home", path: "/home" },
  { name: "Class Schedule", path: "/classschedule" },
  { name: "Grades", path: "/grades" },
  { name: "Profile", path: "/profile" },
];

export const landingLinks: NavigationLink[] = [
  { name: "About", path: "/about" },
  { name: "Login", path: "/auth/login" },
];

export default function NavigationComponent() {
  const [activeLinkList, setActiveLinkList] = useState<NavigationLink[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const session = await verifySession();
      setActiveLinkList(session === null ? landingLinks : navigationLinks);
    };

    fetchDataAsync();
  }, []);

  // Menü schliessen mit Escape oder Klick ausserhalb
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.nav} ref={navRef}>
      <button
        type="button"
        className={styles.burger}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
        aria-expanded={menuOpen}
        aria-controls="navigation-menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul id="navigation-menu" className={menuOpen ? styles.open : ""}>
        {activeLinkList.map((item) => (
          <li key={item.path}>
            <Link
              className={[
                item.name === "Login" ? styles.login : "",
                item.name === "Profile" ? styles.profile : "",
              ]
                .filter(Boolean)
                .join(" ")}
              href={item.path}
              onClick={closeMenu}
            >
              {item.name === "Profile" ? (
                <Image
                  src="/assets/images/user-placeholder.jpg"
                  alt="Profilbild"
                  height={40}
                  width={40}
                />
              ) : (
                item.name
              )}
            </Link>

            {item.children && (
              <ul>
                {item.children.map((child) => (
                  <li key={child.path}>
                    <Link href={child.path} onClick={closeMenu}>
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
