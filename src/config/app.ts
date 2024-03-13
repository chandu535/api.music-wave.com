import dotenv from "dotenv";
dotenv.config({ path: `.env` });
const DB = {
  mongo_connection_string: process.env.MONGO_URL,
};

const configData = {
  db: DB,
};

export default configData;
