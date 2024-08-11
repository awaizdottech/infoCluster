import { useEffect, useState } from "react";
import appwriteService from "../appwrite/post";
import { Container, BigLoadingSVG, PostCard } from "../components";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return posts.length === 0 ? (
    <div className="flex flex-col items-center">
      <BigLoadingSVG />
    </div>
  ) : (
    <Container className="grid grid-cols-4 gap-6 px-10">
      {posts.map((post) => (
        <div key={post.$id}>
          <PostCard {...post} />
        </div>
      ))}
    </Container>
  );
}
