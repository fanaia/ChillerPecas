const server = require("./server");

const app = async () => {
  try {
    await server.start();
  } catch (error) {
    console.error(error);
  }
};

app();
