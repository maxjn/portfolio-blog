import connectToDB from "@/utils/db";
import Post from "@/models/postModel";

export const POST = async (req: any) => {
  const body = await req.json();
  try {
    await connectToDB();

    const newPost = new Post(body);

    await newPost.save();

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
