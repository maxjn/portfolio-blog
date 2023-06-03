import connectToDB from "@/utils/db";
import Post from "@/models/postModel";
import { SinglePostProps } from "@/utils/types";

export const GET = async (req, { params }: SinglePostProps) => {
  const { id } = params;

  try {
    await connectToDB();
    const posts = await Post.findById(id);

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the posts", { status: 500 });
  }
};
