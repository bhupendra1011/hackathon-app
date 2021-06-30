// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comment, User, Project } = initSchema(schema);

export {
  Comment,
  User,
  Project
};