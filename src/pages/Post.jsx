import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/post";
import { Button, Container, SmallLoadingSVG } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
// import img from "../assets/awaizdottech.png";

async function fetchImage(imageId) {
  const response = appwriteService.getFilePreview(imageId);
  console.log("response", response);
  const image = await fetch(response);
  console.log("image", image);

  const blob = new Blob([image], { type: "image/jpeg" }); // Adjust MIME type as per the file

  // Create a URL for the Blob
  // const imageUrl = URL.createObjectURL(blob);
  // console.log("url", imageUrl);

  // const blob = await response.blob();
  return blob;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function saveImageToSessionStorage(imageId) {
  console.log("saveImageToSessionStorage called");
  const blob = await fetchImage(imageId);
  const base64Image = await blobToBase64(blob);
  sessionStorage.setItem(`infoCluster-image-${imageId}`, base64Image);
}

function loadImageFromSession(imageId) {
  console.log("loadimage....called");
  return sessionStorage.getItem(`infoCluster-image-${imageId}`);
}

export default function Post() {
  // const [post, setPost] = useState(null);
  const { slug } = useParams();
  const posts = useSelector((state) => state.allposts.posts);
  const postInArr = posts?.documents.filter((post) => post.$id == slug);
  const post = postInArr[0];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    // const storedImage = loadImageFromSession(post.imageId);
    // console.log(storedImage);
    // if (storedImage) {
    //   setImageSrc(storedImage);
    // } else {
    //   saveImageToSessionStorage(post.imageId).then(() => {
    //     const newImage = loadImageFromSession(post.imageId);
    //     console.log(newImage);
    //     setImageSrc(newImage);
    //   });
    // }
    //   if (slug) {
    //     appwriteService.getPost(slug).then((post) => {
    //       if (post) setPost(post);
    //       else navigate("/");
    //     });
    //   } else navigate("/");
    //   // todo: for all components & pages that use slug if it is invalid handle the error or response properly. also decide if redirecting to home is a good idea
  }, [slug, navigate, posts]);

  const deletePost = () => {
    try {
      setError("");
      setLoading(true);
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.imageId);
          navigate("/");
        }
      });
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return post ? (
    <Container className="bg-[#242629] flex flex-col items-center">
      {error && <p className="mb-8">{error}</p>}
      <h1 className="flex-1 mx-5 my-10 text-5xl">{post.title}</h1>
      {isAuthor && (
        <div className="absolute right-6 top-36">
          {post.status == "inactive" ? (
            <Button disabled bgColor="bg-[#94a1b2]">
              Inactive
            </Button>
          ) : null}
          <Link to={`/edit-post/${post.$id}`}>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </Button>
          </Link>
          <Button disabled={loading} onClick={deletePost}>
            {loading ? (
              <SmallLoadingSVG />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            )}
          </Button>
        </div>
      )}
      <img
        src={appwriteService.getFilePreview(post.imageId)}
        // src={imageSrc}
        alt={post.title}
        className="rounded-xl max-w-3xl"
      />

      <div className="py-10 max-lg:px-6 lg:px-20 2xl:px-28 leading-7">
        {parse(post.content)}
      </div>
    </Container>
  ) : null;
}
