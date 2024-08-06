import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, SmallLoadingSVG } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
    // todo: for all components & pages that use slug if it is invalid handle the error or response properly. also decide if redirecting to home is a good idea
  }, [slug, navigate]);

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
        alt={post.title}
        className="rounded-xl max-w-3xl"
      />

      <div className="py-10 px-52 leading-9 tracking-wider">
        {parse(post.content)}
      </div>
    </Container>
  ) : null;
}
