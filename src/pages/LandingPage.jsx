import React, { useEffect, useState } from "react";
import heroIMG from "../assets/heroIMG.svg";
import logo2 from "../assets/logo2.svg";
import BlogCard from "../components/BlogCard";
import icon from "../assets/blogcard/Icon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
const LandingPage = () => {
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status); // Get the login status from Redux

  const handleButton = () => {
    if (status) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        posts.documents.reverse().splice(6); // Get the latest 6 posts
        setPosts(posts.documents);
      }
    });
  }, []);

  useEffect(() => {
    console.log(posts); // will now run *after* posts are updated
    posts.forEach((post) => {
      console.log(post);
    });
  }, [posts]); // watches for changes in `posts`

  // if (posts.length === 0) {
  //   return (
  //     <div className="w-full py-8 mt-4 text-center">
  //       <div className="flex flex-wrap">
  //         <div className="p-2 w-full">
  //           <h1 className="text-2xl font-bold hover:text-gray-500">
  //             Login to read posts
  //           </h1>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className=" flex flex-col items-center justify-center ">
      <div className="relative z-1">
        <img src={heroIMG} alt="UpperSection" className="w-full" />
      </div>
      <h1
        style={{
          fontSize: "5.5rem",
          fontWeight: "700",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.07), rgba(204, 230, 255, 0.07))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="relative top-[-40px] z-0"
      >
        ABOUT US
      </h1>
      <div className="w-[87.1%] border-white border-2 rounded-full px-16 py-8 flex items-center justify-center gap-20">
        <img src={logo2} alt="logo 2" />
        <p className="text-grey1 text-[24px] font-extralight text-left">
          Welcome to BlogSpot — Platform of
          <span className="text-white"> Readers, Writers,</span> and more.
          Community of writers, experts, and everyday thinkers sharing
          <span className="text-white"> real talk</span> on everything from tech
          and lifestyle to wellness and productivity. So dive in, explore, and
          <span className="text-white"> be part of the vibe to grow</span>
        </p>
      </div>
      <div className="w-[1296px] mt-16 flex items-center justify-between">
        <h1 className="text-white text-3xl font-medium">Top Blogs :</h1>
        <button className="flex gap-2 cursor-pointer" onClick={handleButton}>
          <h1 className="text-grey1 text-lg font-light">See all </h1>
          <img src={icon} alt="" className="mb-1" />
        </button>
      </div>
      <div className="flex items-center w-[1296px] mt-8 gap-5 flex-wrap">
        {posts ? (
          posts.map((post) => {
            return (
              <BlogCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                content={post.content}
                views={post.views}
                likes={post.likes}
                userId={post.userId}
                userName={post.userName}
              />
            );
          })
        ) : (
          <div className="w-full py-8 mt-4 text-center text-red-500">
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold ">Sorry No Posts Yet!!!</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
