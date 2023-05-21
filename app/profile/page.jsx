"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // if (!session?.user.id) router.push("/");
    const fetchPost = async () => {
      const resposne = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await resposne.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPost();
  }, []);

  const handleEdit = () => {};
  const handleDelete = async () => {};

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
