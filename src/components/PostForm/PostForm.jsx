import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import appwriteServices from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input, Select, RTE } from "../index";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
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
    // if updating existing post
    if (post) {
      //always upload file first
      const file = data.image[0]
        ? await appwriteServices.uploadFile(data.image[0])
        : null;
      console.log("old image id", post.imageId);
      if (file) {
        appwriteServices.deleteFile(post.imageId);
        console.log("new image details", file);
      }
      const dbPost = await appwriteServices.updatePost(post.$id, {
        ...data,
        imageId: file.$id || undefined,
      });
      console.log("updated post", dbPost);
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      //creating new post
      const file = data.image[0]
        ? await appwriteServices.uploadFile(data.image[0])
        : null;

      if (file) {
        console.log("posted image details", file);
        const fileId = file.$id;
        data.imageId = fileId;
        const dbPost = await appwriteServices.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
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
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    // the following return is for optimisation that doesnt let the 'watch' run endlessly
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <Input
          label="Title :"
          placeholder="Title"
          className="text-black"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="text-black"
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
      <div>
        <Input
          label="Featured Image :"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div>
            <img
              src={appwriteServices.getFilePreview(post.imageId)}
              alt={post.title}
            />
          </div>
        )}
        <Select
          className="text-black"
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined}>
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
