import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostType } from "@/utils/types";

async function getData<TData>(): Promise<TData> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json() as TData;
}

const Blog = async () => {
  const data = await getData<PostType[]>();

  return (
    <div className={styles.mainContainer}>
      {data.map((post) => (
        <Link
          href={`/blog/${post.id}`}
          className={styles.container}
          key={post.id}
        >
          <div className={styles.imageContainer}>
            <Image
              src={
                "https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg"
              }
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
              hic?
            </h1>
            <p className={styles.desc}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              unde earum omnis quibusdam corrupti odio repudiandae sit dolor
              possimus veritatis repellat...
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
