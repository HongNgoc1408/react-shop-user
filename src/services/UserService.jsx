import axios from "axios";

// Function to register a new user
export const createUser = async (data) => {
  console.log(data);
  try {
    const res = await axios.post(
      "http://localhost:3000/api/user/register",
      data
    );
    console.log(res);
    return res.data;
  } catch (error) {
    // Handle error
    console.error("Error registering user:", error);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/user/login", data);
    return res.data;
  } catch (error) {
    // Handle error
    console.error("Error logging in:", error);
    throw error;
  }
};
