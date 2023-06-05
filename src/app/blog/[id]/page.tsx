import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostType, SinglePostProps } from "@/utils/types";
import Content from "@/components/content/Content";
// date fns
import formatRelative from "date-fns/formatRelative";

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
  const { _id, title, description, image, content, creator, createdAt } =
    await getData<PostType>(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.desc}>{description}</p>
          <div className={styles.metadata}>
            <Link className={styles.author} href={`/user/${creator._id}`}>
              <Image
                src={creator.image}
                alt=""
                width={40}
                height={40}
                className={styles.avatar}
              />
              <span className={styles.username}> {creator.name}</span>
            </Link>

            <p className={styles.time}>
              {formatRelative(new Date(createdAt), new Date())}
            </p>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={image} alt="" fill={true} className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <Content content={content} />
      </div>
    </div>
  );
};

export default SingleBlog;
