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
            <Button>Edit</Button>
          </Link>
          <Button disabled={loading} onClick={deletePost}>
            {loading ? <SmallLoadingSVG /> : "Delete"}
          </Button>
        </div>
      )}
      <img
        src={appwriteService.getFilePreview(post.imageId)}
        // src={imageSrc}
        alt={post.title}
        className="rounded-xl max-w-3xl"
      />

      <div className="py-10 px-52 leading-9 tracking-wider">
        {parse(post.content)}
      </div>
    </Container>
  ) : null;
}
