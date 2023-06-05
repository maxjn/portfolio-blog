"use client";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PostType, HandleChange, ResetForm } from "@/utils/types";
import useSWR from "swr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useState } from "react";

export default function Dashboard() {
  const session = useSession();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const formInitial = {
    _id: "",
    title: "",
    description: "",
    image: "",
    content: "",
  };
  const [formData, setFormData] = useState(formInitial);

  // NEW WAY TO FETCH DATA
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, mutate } = useSWR<PostType[] | null>(
    session?.data?.user.id
      ? "/api/users/" + session?.data?.user.id + "/posts"
      : null,
    fetcher
  );

  // Protext Route
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    return router.push("/");
  }

  // Handle Change
  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as typeof e.target & HandleChange;
    setFormData({ ...formData, [target.name]: target.value });
  };

  // Handle Add Post Submitted
  const handleAddPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    const { title, description, image, content } = formData;

    try {
      const res = await fetch(`/api/posts/new`, {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          image,
          content,
          creator: session?.data?.user.id,
        }),
      });
      if (res.ok) {
        setIsSubmitting(false);
        setFormData(formInitial);
        mutate();
      } else {
        setError(true);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Handle Edit Post Submitted
  const handleEditPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    try {
      const res = await fetch(`/api/posts/${formData._id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...formData }),
      });

      if (res.ok) {
        mutate();
        setIsSubmitting(false);
      } else {
        setError(true);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError(true);
    }
  };

  // handle Delete Button
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });

      if (res.ok) {
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle Edit Button
  const handleEdit = ({
    _id,
    title,
    description,
    image,
    content,
  }: PostType) => {
    setEdit(true);

    setFormData({ _id, title, description, image, content });
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {!data
            ? "Loading Posts..."
            : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={post.image}
                      alt=""
                      fill={true}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.info}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.desc}>
                      {post.description.substring(0, 50)}
                    </p>
                  </div>
                  <div className={styles.btn_container}>
                    <AiFillDelete
                      size={20}
                      className={styles.delete}
                      onClick={() => handleDelete(post._id)}
                      title="Delete"
                    />
                    <AiFillEdit
                      size={20}
                      className={styles.edit}
                      onClick={() => handleEdit(post)}
                      title="Edit"
                    />
                  </div>
                </div>
              ))}
        </div>
        {/* Post Form */}
        <form
          className={styles.form}
          onSubmit={(e) => (edit ? handleEditPost(e) : handleAddPost(e))}
        >
          <h1> {edit ? "Edit The" : "Add New"} Post</h1>
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Title"
            className={styles.input}
            value={formData.title}
            onChange={handleChange}
          />
          <input
            name="description"
            id="description"
            type="text"
            placeholder="Desc"
            className={styles.input}
            value={formData.description}
            onChange={handleChange}
          />
          <input
            name="image"
            id="image"
            type="text"
            placeholder="Image"
            className={styles.input}
            value={formData.image}
            onChange={handleChange}
          />
          <textarea
            name="content"
            id="content"
            placeholder="Content"
            className={styles.textArea}
            value={formData.content}
            onChange={handleChange}
            cols={30}
            rows={10}
          ></textarea>
          <button className={styles.button} disabled={isSubmitting}>
            {edit ? "Edit The" : "Add New"} Post {isSubmitting ? "..." : ""}
          </button>

          {error ? "Error" : ""}
        </form>
      </div>
    );
  }
}
