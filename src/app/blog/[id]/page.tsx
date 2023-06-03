import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostType, SinglePostProps } from "@/utils/types";

// Fetching Data
async function getData<TData>(id: string): Promise<TData> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    notFound();
  }

  return (await res.json()) as TData;
}

// Generate Metadata
export async function generateMetadata({ params }: SinglePostProps) {
  const post = await getData<PostType>(params.id);
  return {
    title: post.title,
  };
}

const SingleBlog = async ({ params }: SinglePostProps) => {
  const { _id, title, description, image, content, username } =
    await getData<PostType>(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.desc}>{description}</p>
          <div className={styles.author}>
            <Image
              src={image}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={image} alt="" fill={true} className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{content}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
