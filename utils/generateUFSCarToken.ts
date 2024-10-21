import { Buffer } from "buffer";

const generateUFSCarToken = (uspCode: string, password: string) => {
  return Buffer.from(uspCode + ":" + password).toString("base64");
};

export default generateUFSCarToken;
