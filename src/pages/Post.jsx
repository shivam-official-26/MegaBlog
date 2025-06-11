import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import img1 from "../assets/blogcard/img1.png";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/home");
      });
    } else navigate("/home");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/home");
      }
    });
  };

  return post ? (
    <div className="w-full text-white mt-0">
      <div className="w-full">
        <div className="w-full h-120 flex justify-center mb-4 relative p-0">
          <img
            src={
              //appwriteService.getFilePreview(post.featuredImage)
              img1
            }
            alt={post.title}
            className="w-full"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 px-16">
          <h1 className="text-4xl font-bold mt-20">{post.title}</h1>
        </div>
        <div className="browser-css px-16 mb-20 text-lg">{parse(post.content)}</div>
      </div>
    </div>
  ) : null;
}
