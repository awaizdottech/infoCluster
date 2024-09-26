import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import appwriteServices from "../../appwrite/post";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select, RTE, SmallLoadingSVG } from "../index";
import { addPost, updatePost } from "../../store/postsSlice";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "",
      },
    });

  const submit = async (data) => {
    setError("");
    setLoading(true);
    try {
      // if updating existing post
      if (post) {
        //always upload file first if it is to be updated of course
        let dbPost;
        const file = data.image[0]
          ? await appwriteServices.uploadFile(data.image[0])
          : null;
        if (file) {
          appwriteServices.deleteFile(post.imageId);
          dbPost = await appwriteServices.updatePost(post.$id, {
            ...data,
            imageId: file.$id || undefined,
          });
        } else
          dbPost = await appwriteServices.updatePost(post.$id, { ...data });
        if (dbPost) {
          dispatch(updatePost({ dbPost }));
          navigate(`/post/${dbPost.$id}`);
        }
        // todo: handle char limit
      } else {
        //creating new post
        const file = data.image[0]
          ? await appwriteServices.uploadFile(data.image[0])
          : null;

        if (file) {
          const fileId = file.$id;
          data.imageId = fileId;
          const dbPost = await appwriteServices.createPost({
            ...data,
            userId: userData.$id,
          });
          if (dbPost) {
            dispatch(addPost({ dbPost }));
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    // the following return is for optimisation that doesnt let the 'watch' run endlessly
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form className="bg-[#242629] py-10" onSubmit={handleSubmit(submit)}>
      {error && <p className="mb-8">{error}</p>}
      <div>
        <Input
          label="Title :"
          placeholder="Title"
          className="text-black rounded-md m-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="text-black rounded-md m-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="my-12">
        <Input
          label="Featured Image :"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        <Select
          className="text-black rounded-3xl px-2 my-10"
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
        <Button type="submit" className="mt-6" disabled={loading}>
          {loading ? <SmallLoadingSVG /> : post ? "Update" : "Submit"}
        </Button>
      </div>
      {post && (
        <div className="flex justify-center">
          <img
            className="max-w-3xl"
            src={appwriteServices.getFilePreview(post.imageId)}
            alt={post.title}
          />
        </div>
      )}
    </form>
  );
}
