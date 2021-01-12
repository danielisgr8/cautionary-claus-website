import axios from "axios";
import { toast } from "react-toastify";
import { User } from "./models";

const baseUrl = "https://68v9d9lkff.execute-api.us-west-2.amazonaws.com";

export const tryAxiosRequest = async (call: Function) => {
  try {
    await call();
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data);
    } else if (error.request) {
      toast.error(error.request);
    } else {
      toast.error(error.message);
    }
  }
};

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

export const registerUser = async (user: User, auth: string) => {
  await axios.post(`${baseUrl}/user`, user, {
    headers: {
      "Authorization": `Basic ${auth}`
    }
  });
};

export const updateProfile = async (username: string, user: User, auth: string) => {
  await axios.put(`${baseUrl}/profile/${username}`, user, {
    headers: {
      "Authorization": `Basic ${auth}`
    }
  });
};

export const addNote = async (username: string, message: string, auth: string): Promise<string> => {
  const response = await axios.put(`${baseUrl}/profile/${username}/note`, {
    message
  }, {
    headers: {
      "Authorization": `Basic ${auth}`
    }
  });
  return response.data.id;
};

export const deleteNote = async (username: string, id: string, auth: string) => {
  await axios.delete(`${baseUrl}/profile/${username}/note?id=${id}`, {
    headers: {
      "Authorization": `Basic ${auth}`
    }
  });
};
