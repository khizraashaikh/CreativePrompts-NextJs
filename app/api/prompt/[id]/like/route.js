import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { userId } = await request.json();
  try {
    await connectToDB();
    const id = params.id;
    const post = await Prompt.findById(id);

    const index = post.likes.findIndex((id) => id === String(userId));

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(userId));
    }

    const existingPrompt = await Prompt.findByIdAndUpdate(id, post, {
      new: true,
    });
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to like the prompt", { status: 500 });
  }
};
