import { Container, BigLoadingSVG, PostCard } from "../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Home() {
  const posts = useSelector((state) => state.allposts.posts);
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    if (posts) {
      setFilteredPosts(
        posts.documents.filter((post) => {
          return post.status == "active";
        })
      );
      setLoading(false);
    }
  }, [posts]);

  return !loading ? (
    <Container className="sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-5">
      {filteredPosts.map((post) => (
        <div key={post.$id}>
          <PostCard {...post} />
        </div>
      ))}
    </Container>
  ) : (
    <div className="flex flex-col items-center">
      <BigLoadingSVG />
    </div>
  );
}
