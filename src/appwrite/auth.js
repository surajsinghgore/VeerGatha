import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteEndPoint).setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // create account
  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // call another method to make them login directly
        this.loginUser({ email, password });
        return userAccount;
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //   login user
  async loginUser({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // getCurrentUser data
  async getCurrentUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
      console.log("current user is not logged in");
      throw error;
    }
  }

  //   logout user
  async logoutCurrentUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("current user is not logged in");
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
