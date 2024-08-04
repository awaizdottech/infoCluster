import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

export default function PostCard({ $id, title, imageId }) {
  // we are using appwrite for retrieving the info directly & it has the variable $id
  return (
    <Link to={`/post/${$id}`}>
      <div>
        <div>
          <img src={appwriteService.getFilePreview(imageId)} alt={title} />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}
