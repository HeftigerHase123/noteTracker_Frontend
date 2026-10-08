"use client";

import { CSSProperties, useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { verifySession } from "@/lib/sessionLogic";
import { Session } from "@/models/auth/Session";
import { UserDtoResponse } from "@/models/user/UserDtoResponse";
import { UserService } from "@/services/UserService";
import { AuthService } from "@/services/AuthService";
import { createSession } from "@/lib/sessionLogic";
import { Country } from "@/models/user/CountryEnum";
import { countries } from "@/lib/countries";

export default function ProfilePage() {
  const [session, setSession] = useState<Session>();
  const [user, setUser] = useState<UserDtoResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const session = await verifySession();
      if (session === null) return;
      setSession(session);

      const user = await UserService.getById(session.user.id);
      if (!user) return;
      setUser(user);
    };

    fetchData();
  }, []);

  if (!session) return;

  const formatPhoneNumer = (country?: Country, number?: string) => {
    if (!country || !number) return "";

    const prefix = countries[country]?.phone_prefix;
    if (!prefix) return "";

    return `${prefix} ${number}`;
  };

  const user_data = [
    {
      key: "Phone",
      value: formatPhoneNumer(user?.phoneCountry, user?.phoneNumber),
    },
    {
      key: "Mail",
      value: user?.mail,
    },
  ];

  const pages = [
    {
      name: "Profile details",
      url: `/profile/details/${user?.id}`,
      icon: "/assets/icons/account-dark.png",
    },
    {
      name: "Settings",
      url: `/profile/settings/${user?.id}`,
      icon: "/assets/icons/settings-dark.png",
    },
  ];

  console.log(user_data.length);
  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div className={styles.img_container}>
          <Image
            src={"/assets/images/student-placeholder.jpg"} //kann man mit user.url ersetzten
            alt="Profile Image"
            width={110}
            height={110}
          />
        </div>
        <h1>{`${user?.firstname} ${user?.lastname}`}</h1>
      </div>
      <div className={styles.down}>
        <div
          className={styles.grid}
          style={
            {
              "--repeat-rows": user_data.length,
            } as CSSProperties
          }
        >
          {user_data.map((entry, i) => (
            <div key={i} className={styles.grid_entry}>
              <div className={`${styles.key} secondary-text`}>
                <p>{entry.key}</p>
              </div>
              <div className={`${styles.value} primary-text`}>
                <p>{entry.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.settings}>
          <div className={styles.theme_toggle}>
            <div className={styles.theme_left}>
              <Image
                src={"/assets/icons/dark-mode.png"}
                alt="Dark mode"
                width={32}
                height={32}
              ></Image>
              <p className="primary-text">Dark mode</p>
            </div>
            <div className={styles.theme_right}>
              <input
                type="checkbox"
                id="theme-toggle"
                className={styles.themeInput}
              />

              <label htmlFor="theme-toggle" className={styles.themeSwitch}>
                <span></span>
              </label>
            </div>
          </div>
          <hr />
          {pages.map((page, i) => (
            <div key={i}>
              <Link
                href={page.url}
                className={`${styles.setting_container} primary-text`}
              >
                <Image
                  src={page.icon}
                  alt={`${page.name} icon`}
                  width={32}
                  height={32}
                ></Image>
                <p>{page.name}</p>
              </Link>
            </div>
          ))}
          <hr />
          <div className={styles.logout}>
            <Image
              src={"/assets/icons/logout-dark.png"}
              alt="Logout"
              width={32}
              height={32}
            ></Image>
            <p>Log out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
