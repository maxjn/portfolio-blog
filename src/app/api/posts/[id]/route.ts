import connectToDB from "@/utils/db";
import Post from "@/models/postModel";
import { SinglePostProps } from "@/utils/types";
// GET
export const GET = async (req, { params }: SinglePostProps) => {
  const { id } = params;

  try {
    await connectToDB();
    const posts = await Post.findById(id).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the posts", { status: 500 });
  }
};

// PATCH
export const PATCH = async (req, { params }: SinglePostProps) => {
  const { title, image, description, content } = await req.json();
  const { id } = params;

  try {
    await connectToDB();

    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return new Response("Couldn't find the Post", { status: 404 });
    }

    existingPost.title = title;
    existingPost.image = image;
    existingPost.content = content;
    existingPost.description = description;

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), { status: 200 });
  } catch (error) {
    return new Response("Couldn't update the Post", { status: 500 });
  }
};

// DELETE
export const DELETE = async (req, { params }: SinglePostProps) => {
  const { id } = params;

  try {
    await connectToDB();

    await Post.findByIdAndDelete(id);

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the posts", { status: 500 });
  }
};
