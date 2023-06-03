import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div>©{new Date().getFullYear()} Maxjn. All rights reserved.</div>
      <div className={styles.social}>
        <Link href="https://github.com/maxjn" title="Github">
          <Image
            src="/github.png"
            width={25}
            height={25}
            className={styles.icon}
            alt="Github"
          />
        </Link>
        <Link href="https://www.linkedin.com/in/maxjn/" title="Linkedin">
          <Image
            src="/linkedin.png"
            width={25}
            height={25}
            className={styles.icon}
            alt="Linkedin"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
