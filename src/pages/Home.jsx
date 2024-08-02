import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (Array.isArray(posts)) {
        setPosts(posts);
      }
    });
  }, []);

  console.log(posts.length);
  if (posts.length == 0) {
    return (
      <div>
        <Container>
          <div>
            <div>
              <h1>login to read posts</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <div>
          {posts?.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
