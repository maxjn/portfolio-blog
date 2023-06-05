import styles from "./page.module.css";
import Image from "next/image";

export const metadata = {
  title: "Contact me",
  description: "Contact me",
};

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let&rsquo;s Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
        <form
          className={styles.form}
          action={`https://getform.io/f/64fe657d-69cd-4ab9-a899-474226923272`}
          method="POST"
        >
          <input
            type="text"
            placeholder="name"
            className={styles.input}
            name="name"
          />
          <input
            type="email"
            placeholder="email"
            className={styles.input}
            name="email"
          />
          <textarea
            className={styles.textArea}
            placeholder="message"
            cols={30}
            rows={10}
            name="message"
          ></textarea>
          <button type="submit"> Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
