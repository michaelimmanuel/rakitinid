import { S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import https from "https";

const s3 = new S3Client({
  region: process.env.DO_SPACES_REGION as string, // e.g., 'sgp1'
  endpoint: `https://${process.env.DO_SPACES_ENDPOINT}`, // e.g., 'https://sgp1.digitaloceanspaces.com'
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY as string,
    secretAccessKey: process.env.DO_SPACES_SECRET as string,
  },
});

export default s3;
