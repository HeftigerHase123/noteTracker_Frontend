"use client";

import { useEffect, useState } from "react";
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
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Class Schedule",
    path: "/classschedule",
  },
  {
    name: "Grades",
    path: "/grades",
  },
  {
    name: "Profile",
    path: "/profile",
  },
];

export const landingLinks: NavigationLink[] = [
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Login",
    path: "/auth/login",
  },
];

export default function NavigationComponent() {
  const [activeLinkList, setActiveLinkList] = useState<NavigationLink[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const session = await verifySession();
      if (session === null) {
        setActiveLinkList(landingLinks);
      } else {
        setActiveLinkList(navigationLinks);
      }
    };

    fetchDataAsync();
  }, [landingLinks, navigationLinks]);

  return (
    <nav className={styles.nav}>
      <ul>
        {activeLinkList.map((item, i) => (
          <li key={i}>
            <Link
              className={`${item.name === "Login" ? `${styles.login}` : ""} ${item.name === "Profile" ? `${styles.profile}` : ""}`}
              href={item.path}
            >
              {item.name === "Profile" ? (
                <Image
                  src={"/assets/images/user-placeholder.jpg"}
                  alt="Profile Image"
                  height={40}
                  width={40}
                ></Image>
              ) : (
                `${item.name}`
              )}
            </Link>

            {item.children && (
              <ul>
                {item.children.map((child, i) => (
                  <li key={i}>
                    <Link href={child.path}>{child.name}</Link>
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
