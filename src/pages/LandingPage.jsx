import React, { useEffect, useState } from "react";
import heroIMG from "../assets/heroIMG.svg";
import logo2 from "../assets/logo2.svg";
import BlogCard from "../components/BlogCard";
import icon from "../assets/blogcard/Icon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

const LandingPage = () => {
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);

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
        posts.documents.reverse().splice(6);
        setPosts(posts.documents);
      }
    });
  }, []);

  useEffect(() => {
    console.log(posts);
    posts.forEach((post) => {
      // console.log(post);
    });
  }, [posts]);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="relative z-1 w-full">
        <img
          src={heroIMG}
          alt="UpperSection"
          className="w-full h-auto object-cover"
        />
      </div>

      <h1
        style={{
          fontSize: "5.5rem",
          fontWeight: "700",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(204, 230, 255, 0.07))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="relative -top-10 z-0 text-center text-[3rem] sm:text-[4rem] md:text-[5.5rem] leading-tight"
      >
        ABOUT US
      </h1>

      <div className="w-full max-w-[1300px] border-white border-2 rounded-3xl md:rounded-full px-6 sm:px-10 md:px-16 py-6 sm:py-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-center md:text-left">
        <img src={logo2} alt="logo 2" className="w-24 sm:w-32 md:w-40" />
        <p className="text-grey1 text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] font-extralight">
          Welcome to BlogSpot — Platform of
          <span className="text-white"> Readers, Writers,</span> and more.
          Community of writers, experts, and everyday thinkers sharing
          <span className="text-white"> real talk</span> on everything from tech
          and lifestyle to wellness and productivity. So dive in, explore, and
          <span className="text-white"> be part of the vibe to grow</span>
        </p>
      </div>

      <div className="w-full max-w-[1300px] mt-12 sm:mt-16 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        <h1 className="text-white text-2xl sm:text-3xl font-medium">
          Top Blogs :
        </h1>
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleButton}
        >
          <h1 className="text-grey1 text-base sm:text-lg font-light">
            See all
          </h1>
          <img src={icon} alt="" className="mb-1 w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-start w-full max-w-[1300px] mt-8 gap-6">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
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
          ))
        ) : (
          <div className="w-full py-8 mt-4 text-center text-red-500">
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold">Sorry No Posts Yet!!!</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
