import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/post";
import {
  BigLoadingSVG,
  Button,
  Container,
  SmallLoadingSVG,
} from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [pageLoading, setPageLoading] = useState(true);
  const posts = useSelector((state) => state.allposts.posts);
  const { slug } = useParams();
  const post = posts?.documents?.find((post) => post.$id === slug);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) setPageLoading(false);
  }, [post]);

  const deletePost = () => {
    try {
      setError("");
      setDeleteLoading(true);
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.imageId);
          navigate("/");
        }
      });
    } catch (error) {
      setDeleteLoading(false);
      setError(error.message);
    }
  };

  return !pageLoading ? (
    <Container className="bg-[#242629] flex flex-col items-center">
      {error && <p className="mb-8">{error}</p>}
      <h1 className="flex-1 mx-5 my-10 text-5xl">{post.title}</h1>
      {isAuthor && (
        <div className="hidden xl:block xl:absolute right-6 top-36">
          <div className="flex flex-col">
            {post.status == "inactive" && (
              <Button disabled bgColor="bg-[#94a1b2]" className="my-3">
                Inactive
              </Button>
            )}
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
            <div className="my-3">
              <Button disabled={deleteLoading} onClick={deletePost}>
                {deleteLoading ? (
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
          </div>
        </div>
      )}
      <img
        src={appwriteService.getFilePreview(post.imageId)}
        alt={post.title}
        className="rounded-xl max-w-3xl"
      />

      <div className="py-10 max-lg:px-6 lg:px-20 2xl:px-28 leading-7">
        {parse(post.content)}
      </div>
    </Container>
  ) : (
    <div className="flex flex-col items-center">
      <BigLoadingSVG />
    </div>
  );
}
