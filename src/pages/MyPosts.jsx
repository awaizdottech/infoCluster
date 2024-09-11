import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/post";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        //handle if posts arent received
      });
  }, []);

  return posts.length === 0 ? (
    <div className="flex flex-col items-center text-3xl">
      <p>Add your blogs to see in this tab :)</p>
    </div>
  ) : (
    <div>
      <Container className="sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-5">
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
}
