import connectToDB from "@/utils/db";
import Post from "@/models/postModel";

export const GET = async () => {
  try {
    await connectToDB();
    const posts = await Post.find().populate("creator").sort({ createdAt: -1 });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the posts", { status: 500 });
  }
};
