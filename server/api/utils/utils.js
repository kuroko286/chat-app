const fs = require("fs/promises");
const authUser = async (username) => {
  const users = await getAllUsers();
  if (users.includes(username)) {
    return {
      isValid: false,
      message: "Username existed!",
    };
  } else {
    await addUser(username);
    return {
      isValid: true,
      message: "Login successfully!",
    };
  }
};
const getAllUsers = async () => {
  try {
    const users = await fs.readFile("./data.txt");
    return users;
  } catch (error) {
    console.log(error);
  }
};
const addUser = async (username) => {
  try {
    await fs.appendFile("./data.txt", `${username} `);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { authUser };
