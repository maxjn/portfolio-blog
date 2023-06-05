import { notFound } from "next/navigation";
import { PostType } from "@/utils/types";
import PostCard from "@/components/PostCard/PostCard";
import styles from "./page.module.css";
import { SingleUserProps } from "@/utils/types";
// Fetch Posts
async function getData<TData>(id: string): Promise<TData> {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL!}/api/users/${id}/posts`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json() as TData;
}

const SingleUser = async ({ params }: SingleUserProps) => {
  const { id, name } = params;
  const posts = await getData<PostType[]>(id);
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.author}>{name.replace("%20", " ")}&apos;s Blog</h1>
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default SingleUser;
