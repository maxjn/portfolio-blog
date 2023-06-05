import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostType } from "@/utils/types";
// date fns
import formatRelative from "date-fns/formatRelative";

// Fetch Posts
async function getData<TData>(): Promise<TData> {
  const res = await fetch(`${process.env.NEXTAUTH_URL!}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json() as TData;
}

const Blog = async () => {
  const posts = await getData<PostType[]>();

  return (
    <div className={styles.mainContainer}>
      {posts.map(({ _id, title, description, image, creator, createdAt }) => (
        <Link href={`/blog/${_id}`} className={styles.container} key={_id}>
          <div className={styles.imageContainer}>
            <Image
              src={image}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <div>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.desc}>{description.substring(0, 150)}...</p>
            </div>
            <div className={styles.metadata}>
              <div className={styles.author}>
                <Image
                  src={creator.image}
                  alt=""
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
                <span className={styles.username}> {creator.name}</span>
              </div>

              <p className={styles.time}>
                {formatRelative(new Date(createdAt), new Date())}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
