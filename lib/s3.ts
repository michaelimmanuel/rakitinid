import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.DO_SPACES_REGION as string, // e.g., 'sgp1'
  endpoint: process.env.DO_SPACES_ENDPOINT as string, // e.g., 'https://sgp1.digitaloceanspaces.com'
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY as string,
    secretAccessKey: process.env.DO_SPACES_SECRET as string,
  },
});

export default s3;
