import { server } from "./app";

server.listen(4545, () => {
  console.log(`Serve is running at http://localhost:${4545}`);
});
