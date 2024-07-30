// https://youtu.be/0Py5cGGW2lE?feature=shared&t=253
// if we need to change the service provider we'll only change the constructor and the method definitions

import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
        // calling another method here to login the user automatically after he signs up
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service::createAccout::error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Appwrite service::login::error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null; // this will work if there's no account found or instead of error something else is returned
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service::logout::error", error);
    }
  }
}
const authService = new AuthService();
export default authService;
