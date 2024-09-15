import { BigLoadingSVG, Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function MyPosts() {
  const [loading, setLoading] = useState(true);
  const posts = useSelector((state) => state.allposts.posts);
  const userData = useSelector((state) => state.auth.userData);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (posts) {
      setFilteredPosts(
        posts.documents.filter((post) => {
          return post.userId == userData.$id;
        })
      );
      setLoading(false);
    }
  }, [posts]);

  return loading ? (
    <div className="flex flex-col items-center">
      <BigLoadingSVG />
    </div>
  ) : (
    <div>
      {filteredPosts.length !== 0 ? (
        <Container className="sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-5">
          {filteredPosts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}{" "}
        </Container>
      ) : (
        <div className="flex flex-col items-center text-xl">
          <p>Add your blogs to see in this tab :)</p>
        </div>
      )}
    </div>
  );
}
