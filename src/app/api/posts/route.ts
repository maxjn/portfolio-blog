import connectToDB from "@/utils/db";
import Post from "@/models/postModel";

export const GET = async (req) => {
  try {
    await connectToDB();
    const posts = await Post.find();

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the posts", { status: 500 });
  }
};
