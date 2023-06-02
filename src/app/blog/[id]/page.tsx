import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostType } from "@/utils/types";

async function getData<TData>(id: number): Promise<TData> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json() as TData;
}

type singlePostProps = {
  params: {
    id: number;
  };
};

const SingleBlog = async ({ params }: singlePostProps) => {
  const data = await getData<PostType>(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{"Description"}</p>
          <div className={styles.author}>
            <Image
              src={
                "https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg"
              }
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{"Username"}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={
              "https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg"
            }
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{"Content"}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
