import { Client, Account, ID,  } from "appwrite";
import conf from "../conf/conf";

// Initialize Appwrite Client
const client = new Client();
client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

// Initialize Appwrite Account Service
const account = new Account(client);


export const authService = {
  signup: async (email, password, name) => {
    try {
      const response = await account.create(ID.unique(), email, password, name);
      return response;
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Failed to create account. Please try again.");
    }
  },

  login: async (email, password) => {
    try {
      // console.log("Account:", account);
      // await account.deleteSession("current"); // Ensure any existing session is deleted
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Failed to login. Please try again.");
    }
  },

  logout: async () => {
    try {
      await account.deleteSessions();
    } catch (error) {
      throw new Error(error.message || "Failed to logout");
    }
  },

  getUser: async () => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      throw new Error("Failed to fetch user", error.message);
    }

    return null;
  },
};
