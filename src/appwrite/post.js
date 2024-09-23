import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, imageId, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          imageId,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service::createPost::error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, imageId, status }) {
    // no userid as we're giving edit option to only the owner of the blog
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          imageId,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service::updatePost::error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service::deletePost::error", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service::getPost::error", error);
      throw error;
    }
  }

  // async getPosts(queries = [Query.equal("status", "active")]) {
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
        // queries
      );
    } catch (error) {
      console.log("Appwrite service::getPosts::error", error);
      throw error;
    }
  }

  //file upload service, needs to be put into separate file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service::uploadFile::error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service::deleteFile::error", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service::getFilePreview::error", error);
      throw error;
    }
  }
}

export default new Service();
