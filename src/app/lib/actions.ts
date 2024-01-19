'use server';

import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

export async function uploadMovie(formData: FormData) {
  'use server'

  try {

    const file = formData.get('file') as File;
    const imageType = file.type
    const imageBuffer = Buffer.from(await file.arrayBuffer())
    const s3Client = new S3Client({ region: 'us-east-2' });
    await s3Client.send(
      new PutObjectCommand({
        Bucket: 'movie-covers',
        Key: uuidv4(),
        Body: imageBuffer,
        ContentType: imageType,
      })
    );
  } catch (e) {
    console.error('Error', e)
  }
}