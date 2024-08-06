import { Header, Footer } from "../components";

export default function Error404() {
  return (
    <div className="bg-[#16161a] text-[#fffffe] text-xl flex flex-col min-h-screen">
      <Header />
      <div className="grow flex flex-col justify-center">
        <h1 className="text-5xl pb-4">404 Not Found</h1>
        <p>The page you are looking for doesn't exist.</p>
      </div>
      <Footer />
    </div>
  );
}
