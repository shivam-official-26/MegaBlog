import React, { useEffect, useState } from "react";
import PostForm from "../components/post form/PostForm";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/home");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="min-h-screen bg-dark text-white py-10 px-16">
      <h2 className="text-3xl font-semibold mb-6 ml-2">Create New Blog Post</h2>
      <PostForm post={post} />
    </div>
  ) : null;
}

export default EditPost;
