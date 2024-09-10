import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import appwriteService from "./appwrite/post";
import { addPosts } from "./store/postsSlice";

function App() {
  const [loading, setLoading] = useState(true); //true because useEffect starts right away when page starts loading
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          appwriteService.getPosts().then((posts) => {
            console.log(posts);
            if (posts) {
              // posts.documents.forEach((post) => {
              //   const response = appwriteService.getFilePreview(post.imageId);
              //   response.blob();
              // });
              dispatch(addPosts({ posts }));
            }
          });
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="bg-[#16161a] text-[#fffffe] flex flex-col sm:min-h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
