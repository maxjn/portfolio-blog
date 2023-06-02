import Link from "next/link";
import styles from "./button.module.css";
import { buttonProps } from "@/utils/types";

const Button = ({ text, url }: buttonProps) => {
  return (
    <Link href={url}>
      <button className={styles.container}>{text}</button>
    </Link>
  );
};

export default Button;
