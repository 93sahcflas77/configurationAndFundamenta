const Minio = require('minio');

const client = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: process.env.MINIO_PORT,
  useSSL: process.env.MINIO_USESSL === true,
  accessKey: process.env.MINIO_ACCESSKEY,
  secretKey: process.env.MINIO_SECRETKEY,
  region: "ap-south-1",
  
});

const checkconnection = async () => {
  try {
    await client.listBuckets();
    console.log('MinIO connected successfully');
  } catch (err) {
    console.error('MinIO connection failed', err);
    process.exit(1);
  }
};

module.exports = { client, checkconnection };