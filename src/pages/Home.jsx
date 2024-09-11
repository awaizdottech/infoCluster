import { Container, BigLoadingSVG, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/post";
import { addPosts } from "../store/postsSlice";

export default function Home() {
  const posts = useSelector((state) => state.allposts.posts);
  const dispatch = useDispatch();
  if (!posts) {
    appwriteService.getPosts().then((posts) => {
      console.log(posts);
      if (posts) {
        // posts.documents.forEach((post) => {
        //   const response = appwriteService.getFilePreview(post.imageId);
        //   response.blob();
        // });
        console.log("got in");

        dispatch(addPosts({ posts }));
      }
    });
  }
  console.log(posts);

  return posts ? (
    <Container className="sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-5">
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
