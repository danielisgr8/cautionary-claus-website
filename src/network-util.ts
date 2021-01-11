import axios from "axios";
import { User } from "./models";

const baseUrl = "https://68v9d9lkff.execute-api.us-west-2.amazonaws.com";

export const getUser = async (username: string, auth: string): Promise<User> => {
  const response = await axios.get(`${baseUrl}/profile/${username}`, {
    headers: {
      "Authorization": `Basic ${auth}`
    }
  });
  return response.data;
};

export const getAllUsers = async (auth: string): Promise<string[]> => {
  const response = await axios.get(`${baseUrl}/users`, {
    headers: {
      "Authorization": `Basic ${auth}`
    }
  });
  return response.data;
};
