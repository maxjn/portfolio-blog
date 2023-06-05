import connectToDB from "@/utils/db";
import Post from "@/models/postModel";
import { SinglePostProps } from "@/utils/types";

export const GET = async (req, { params }: SinglePostProps) => {
  const { id } = params;

  try {
    await connectToDB();

    const posts = await Post.find({ creator: id }).populate("creator").sort({createdAt:-1});

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed fetching user's posts", { status: 500 });
  }
};
