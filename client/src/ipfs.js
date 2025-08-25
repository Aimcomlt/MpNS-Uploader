import { create } from "ipfs-http-client";

const client = create({ url: "http://localhost:5001/api/v0" });
export default client;
