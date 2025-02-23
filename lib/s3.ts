import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.DO_SPACES_REGION!,
    endpoint: `https://${process.env.DO_SPACES_ENDPOINT}`,  // ✅ Ensure full URL
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY!,
        secretAccessKey: process.env.DO_SPACES_SECRET!,
    },
});

export default s3;
