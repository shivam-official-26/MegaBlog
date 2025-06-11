import SearchBox from "../components/SearchBox";
import BlogCard from "../components/BlogCard";
import HomeButtons from "../components/Buttons/HomeButtons";
import appwriteService from "../appwrite/config";
import { useEffect, useState } from "react";

function Home() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setposts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="h-full ml-[96px] mt-5 bg-dark text-white  ">
      <SearchBox posts={posts} />
      <div className="flex gap-3 mt-5">
        <HomeButtons label={"All"} />
        <HomeButtons label={"Treanding"} />
        <HomeButtons label={"Tech"} />
        <HomeButtons label={"News"} />
      </div>
      <div className="mt-10 flex flex-wrap gap-5 w-full">
        {posts.map((post) => (
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
        ))}
      </div>
    </div>
  );
}

export default Home;
