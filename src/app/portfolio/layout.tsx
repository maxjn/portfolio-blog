import { layoutProp } from "@/utils/types";
import styles from "./page.module.css";

const layout = ({ children }: layoutProp) => {
  return (
    <div>
      <h1 className={styles.mainTitle}>Our Works</h1>
      {children}
    </div>
  );
};

export default layout;
