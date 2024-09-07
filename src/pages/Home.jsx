import { Container, BigLoadingSVG, PostCard } from "../components";
import { useSelector } from "react-redux";

export default function Home() {
  const posts = useSelector((state) => state.allposts.posts);

  return posts ? (
    <Container className="grid grid-cols-4 gap-6 px-10">
      {posts.documents.map((post) => (
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
