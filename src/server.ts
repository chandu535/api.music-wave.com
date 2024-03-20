import { server } from "./app";

server.listen(9000, () => {
  console.log(`Serve is running at http://localhost:${9000}`);
});
