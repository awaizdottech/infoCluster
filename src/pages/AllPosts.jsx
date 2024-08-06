import { Container, BigLoadingSVG, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((posts) => {
        if (posts) {
          console.log("posts", posts);
          setPosts(posts.documents);
        }
        //handle if posts arent received
      });
  }, []);

  return posts.length === 0 ? (
    <div className="flex flex-col items-center">
      <BigLoadingSVG />
    </div>
  ) : (
    <div>
      <Container className="grid grid-cols-4 gap-10 px-10">
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
}
