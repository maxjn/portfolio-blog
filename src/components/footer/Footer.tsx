import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div>©{new Date().getFullYear()} Maxjn. All rights reserved.</div>
      <div className={styles.social}>
        <Image
          src="/github.png"
          width={25}
          height={25}
          className={styles.icon}
          alt="Github"
        />
        <Image
          src="/linkedin.png"
          width={25}
          height={25}
          className={styles.icon}
          alt="Linkedin"
        />
      </div>
    </footer>
  );
};

export default Footer;
