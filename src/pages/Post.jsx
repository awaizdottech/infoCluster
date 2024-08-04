import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
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
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.imageId);
        navigate("/");
      }
    });
  };

  return post ? (
    <div>
      <Container>
        <div>
          <img
            src={appwriteService.getFilePreview(post.imageId)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div>
              <Link to={`/edit-post/${post.$id}`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div>
          <h1>{post.title}</h1>
        </div>
        <div>{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
