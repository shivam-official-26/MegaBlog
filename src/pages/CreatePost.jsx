import PostForm from "../components/post form/PostForm";

function CreatePost() {
  return (
    <div className="min-h-screen bg-dark text-white py-10 px-16">
      <h2 className="text-3xl font-semibold mb-6 ml-2">Create New Blog Post</h2>
      <PostForm />
    </div>
  );
}

export default CreatePost;
