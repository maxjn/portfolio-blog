"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { CiMenuFries } from "react-icons/ci";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const NavBar = () => {
  const [navToggle, setNavToggle] = useState(false);

  return (
    <header className={styles.container}>
      <Link href="/" className={styles.logo}>
        Maxjn
      </Link>
      <nav className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link href={link.url} key={link.id} className={styles.link}>
            {link.title}
          </Link>
        ))}
        <button className={styles.logout}>Logout</button>
      </nav>
      <div className={styles.buttons}>
        <DarkModeToggle />
        <CiMenuFries
          size={25}
          onClick={() => setNavToggle((prev) => !prev)}
          className={styles.burgormenu}
        />
      </div>
      <nav
        className={styles.offcanvaslinks}
        style={
          navToggle
            ? {
                display: "flex",
                width: "fit-content",
                height: "360px",
                opacity: 1,
              }
            : {}
        }
      >
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            className={styles.link}
            onClick={() => setNavToggle((prev) => !prev)}
          >
            {link.title}
          </Link>
        ))}
        <button className={styles.logout}>Logout</button>
      </nav>
    </header>
  );
};

export default NavBar;
