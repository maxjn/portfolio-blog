import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
    content: { type: "string", required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", postSchema);

export default Post;
