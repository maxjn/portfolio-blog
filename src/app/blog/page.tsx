import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { PostType } from "@/utils/types";
import PostCard from "@/components/PostCard/PostCard";

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
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Blog;
