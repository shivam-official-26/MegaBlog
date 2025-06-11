import React, { useCallback, useState, useEffect } from "react";
import RTE from "../RTE";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import { authService } from "../../appwrite/authService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);

  const [userName, setuserName] = useState("anonymous");

  useEffect(() => {
    async function getUsername() {
      const user = await authService.getUser();
      if (user) {
        console.log("User data:", user);
        console.log("User ID:", user.name);
        setuserName(user.name);
      }
    }

    getUsername();
  }, []);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          userName: userName,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    if (post?.featuredImage) {
      console.log(
        "Preview URL:",
        appwriteService.getFilePreview(post.featuredImage)
      );
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap text-white">
      {/* Left Section */}
      <div className="w-2/3 px-2">
        {/* Title Input */}
        <div className="mb-4">
          <label className="block mb-1">Title :</label>
          <input
            placeholder="Title"
            className="w-full p-2 border-2 border-grey1 rounded text-grey1 "
            {...register("title", { required: true })}
          />
        </div>

        {/* Slug Input */}
        <div className="mb-4">
          <label className="block mb-1">Slug :</label>
          <input
            disabled={true}
            placeholder="Slug"
            className="w-full p-2 border-2 border-grey1 rounded text-grey1 "
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        </div>

        {/* Keep RTE as-is */}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Section */}
      <div className="w-1/3 px-2">
        {/* Image Input */}
        <div className="mb-4">
          <label className="block mb-1">Featured Image :</label>
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            className="w-full p-2 border-2 border-grey1 rounded text-grey1 "
            {...register("image", { required: !post })}
          />
        </div>

        {/* Image Preview if post exists */}
        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        {/* Status Select */}
        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <select
            className="w-full p-2 border rounded text-grey1 bg-dark border-grey1"
            {...register("status", { required: true })}
          >
            <option value="" disabled={true}>
              Select status
            </option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-2 text-white rounded cursor-pointer ${
            post
              ? "bg-green-500 hover:bg-green-600 transition-colors"
              : "bg-blue-500 hover:bg-blue-600 transition-colors"
          } `}
        >
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}
