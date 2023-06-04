"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

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
];

const NavBar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState({});
  const [navToggle, setNavToggle] = useState(false);

  // Getting Providers
  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

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
        {session?.user ? ( //Logged in
          <>
            <button className={styles.logout} onClick={signOut} type="button">
              Logout
            </button>
            <Link href="dashboard" key="/dashboard" className={styles.link}>
              <div className={styles.profile}>
                <p className={styles.username}>{session?.user.name}</p>
                <Image
                  src={session?.user.image}
                  width={45}
                  height={45}
                  className={styles.profile_image}
                  alt="profile"
                  onClick={() => {
                    setNavToggle((prev) => !prev);
                  }}
                />
              </div>
            </Link>
          </>
        ) : (
          //Logged out
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className={styles.signin_btn}
                  key={provider?.name}
                  onClick={() => signIn(provider?.id)}
                  title={provider?.name}
                >
                  <Image
                    src={`/${provider?.id}.svg`}
                    width={25}
                    height={25}
                    alt={provider?.name}
                  />
                </button>
              ))}
          </>
        )}
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
                height: "370px",
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
        <div className={styles.auth_btns}>
          {session?.user ? (
            <>
              <Link href="dashboard" key="/dashboard" className={styles.link}>
                <div
                  className={styles.profile}
                  onClick={() => setNavToggle((prev) => !prev)}
                >
                  <p className={styles.username}>{session?.user.name}</p>
                  <Image
                    src={session?.user.image}
                    width={55}
                    height={55}
                    className={styles.profile_image}
                    alt="profile"
                    onClick={() => {
                      setNavToggle((prev) => !prev);
                    }}
                  />
                </div>
              </Link>
              <button className={styles.logout} onClick={signOut} type="button">
                Logout
              </button>
            </>
          ) : (
            //Logged out
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    className={styles.signin_btn}
                    key={provider?.name}
                    onClick={() => signIn(provider?.id)}
                    title={provider?.name}
                  >
                    <Image
                      src={`/${provider?.id}.svg`}
                      width={25}
                      height={25}
                      alt={provider?.name}
                    />
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
