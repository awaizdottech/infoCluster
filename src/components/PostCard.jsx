import { Link } from "react-router-dom";
import appwriteService from "../appwrite/post";

export default function PostCard({ $id, title, imageId, status }) {
  // we are using appwrite for retrieving the info directly & it has the variable $id
  return (
    <Link to={`/post/${$id}`}>
      <div
        className={`bg-[#242629] rounded-3xl p-4 max-sm:my-6 ${
          status == "inactive" ? "grayscale" : null
        } hover:text-[#7f5af0]`}
      >
        <img
          className="aspect-[4/3] rounded-3xl"
          src={appwriteService.getFilePreview(imageId)}
          alt={title}
        />
        <h2 className="pt-4">{title}</h2>
      </div>
    </Link>
  );
}
