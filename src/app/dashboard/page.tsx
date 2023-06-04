"use client";

import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const session = useSession();

  const router = useRouter();

  // Protext Route
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    return router.push("/");
  }

  // handle Submit
  const handleSubmit = () => {};
  // handle Delete
  const handleDelete = () => {};

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          <div className={styles.post}>
            <div className={styles.imgContainer}>
              <Image src="" alt="" width={200} height={100} />
            </div>
            <h2 className={styles.postTitle}>Title</h2>
            <span className={styles.delete} onClick={() => handleDelete()}>
              X
            </span>
          </div>
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Desc" className={styles.input} />
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols={30}
            rows={10}
          ></textarea>
          <button className={styles.button}>Add</button>
        </form>
      </div>
    );
  }
}
