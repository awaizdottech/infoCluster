export default conf = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
};
// we created this so that we dont run into errors later where our env variables sometimes arent in string format