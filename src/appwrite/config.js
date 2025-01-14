import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Services {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwrite_endpoint).setProject(conf.appwrite_project_id);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  //   create post
  async createPost({ status, userId, slug, heroImage, heroName, story, tags, scheduledPublishDate, views, likes, heroAward, heroRank, heroBirthDateAndTime, publishDateAndTime }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
        status,
        userId,
        heroImage,

        heroName,
        story,
        tags,
        scheduledPublishDate,
        views,
        likes,
        heroAward,
        heroRank,
        heroBirthDateAndTime,
        publishDateAndTime,
      });
    } catch (error) {
      throw error;
    }
  }

  //   update post
  async updatePost({ status, userId, slug, heroImage, heroName, story, tags, scheduledPublishDate, views, likes, heroAward, heroRank, heroBirthDateAndTime, publishDateAndTime }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
        status,
        userId,
        heroImage,

        heroName,
        story,
        tags,
        scheduledPublishDate,
        views,
        likes,
        heroAward,
        heroRank,
        heroBirthDateAndTime,
        publishDateAndTime,
      });
    } catch (error) {
      throw error;
    }
  }
  // delete post
  async deletePost({ slug }) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
      return true;
    } catch (error) {
      throw error;
    }
  }

  //   get post by id
  async getPostById({ slug }) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
      return true;
    } catch (error) {
      throw error;
    }
  }

  //   get all post
  async getAllPost() {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId);
    } catch (error) {
      throw error;
    }
  }

  //   get document status is active
  async getPostActive(queries = [Query.equal("status", "active")]) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
    } catch (error) {
      throw error;
    }
  }

  // create file upload
  async uploadFile(file) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.storage.createFile(conf.appwrite_bucket_id, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }
  // delete file
  async deleteFile(fileId) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.storage.deleteFile(conf.appwrite_bucket_id, fileId);
    } catch (error) {
      throw error;
    }
  }
  // get file preview
  async getFilePreview(fileId) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.storage.getFilePreview(conf.appwrite_bucket_id, fileId);
    } catch (error) {
      throw error;
    }
  }
}

const service = new Services();

export default service;
