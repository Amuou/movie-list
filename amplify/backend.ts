// amplify/backend.ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';

const backend = defineBackend({
  auth,
  data
});

const bucketStack = backend.createStack('BucketStack');
const bucket = new s3.Bucket(bucketStack, 'movie-covers', {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
});

const authRole = backend.auth.resources.authenticatedUserIamRole;
bucket.grantReadWrite(authRole);
