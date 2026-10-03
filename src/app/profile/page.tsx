import { CSSProperties } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const user_data = [
    {
      key: "Phone",
      value: "076 596 77 86",
    },
    {
      key: "Mail",
      value: "kim.hofmann@besonet.ch",
    },
  ];

  const pages = [
    {
      name: "Profile details",
      url: "/profile/details/${id}",
      icon: "/assets/icons/account-dark.png",
    },
    {
      name: "Settings",
      url: "/profile/settings/${id}",
      icon: "/assets/icons/settings-dark.png",
    },
  ];

  console.log(user_data.length);
  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div className={styles.img_container}>
          <Image
            src={"/assets/images/profile.jpg"}
            alt="Profile Image"
            width={110}
            height={110}
          />
        </div>
        <h1>Kim Hofmann</h1>
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
              <Link href={page.url} className={`${styles.setting_container} primary-text`}>
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
