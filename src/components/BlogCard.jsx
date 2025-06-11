import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import img1 from "../assets/blogcard/img1.png";
import avatar from "../assets/blogcard/avatar.svg";
import varified from "../assets/blogcard/varified.svg";
import icon1 from "../assets/blogcard/icon1.svg";
import heart from "../assets/blogcard/heart.svg";
import comment from "../assets/blogcard/comment.svg";
import parse from "html-react-parser";
import { authService } from "../appwrite/authService";
import { useEffect, useState } from "react";

const BlogCard = ({
  $id,
  title,
  featuredImage,
  content,
  views,
  likes,
  userId,
  userName,
}) => {
  // console.log(`image url is ${appwriteService.getFilePreview(featuredImage)}`);

  return (
    <Link to={`/post/${$id}`} className="flex justify-center items-center">
      <div className="w-[416px] h-[358px] bg-dark rounded-xl border-1 border-grey1 flex flex-col justify-between overflow-hidden">
        <div className="top h-[50%] bg-gradient-to-b from-black to-black bg-opacity-50 bg-[url('../assets/blogcard/img1.png')] bg-cover">
          <div className="relative ">
            <img
              src={
                // featuredImage
                //   ? appwriteService.getFilePreview(featuredImage)
                //   : 
                img1
              }
              alt={title}
              className="rounded-xl"
            ></img>
            <div className="flex items-center gap-2 absolute top-35 left-4">
              <img src={avatar} alt="avatar" className="rounded-full h-8" />
              <p className="text-md text-grey1">{userName}</p>
              <img src={varified} alt="" className="h-3" />
            </div>
          </div>
        </div>
        <div className="bottom h-[50%]">
          <div className="mr-5 ml-4">
            <h1 className="text-xl text-white truncate whitespace-nowrap overflow-hidden">
              {title ? title : "Ride Like a Star"}
            </h1>
            <div className="text-md text-grey2 mt-2 mb-2 overflow-hidden h-18 line-clamp-3">
              {content
                ? parse(content)
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
            </div>
            <div className="flex justify-between items-center mt-2 mb-2">
              <h1 className="text-grey1 text-lg ">Read</h1>
              <div className="flex gap-4 items-center justify-between mt-2 mb-2">
                <div className="flex flex-col items-center gap-2">
                  <img src={icon1} alt="" />
                  <h1 className="text-sm text-grey1">{views ? views : "0"}</h1>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src={heart} alt="" />
                  <h1 className="text-sm text-grey1">{likes ? likes : "0"}</h1>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src={comment} alt="" />
                  <h1 className="text-sm text-grey1">10k</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
