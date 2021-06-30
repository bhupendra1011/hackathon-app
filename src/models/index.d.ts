import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Comment {
  readonly id: string;
  readonly comment: string;
  readonly projectID?: string;
  readonly User?: User;
  readonly Project?: Project;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly image?: string;
  readonly votedTech?: boolean;
  readonly votedCreative?: boolean;
  readonly votedValue?: boolean;
  readonly Projects?: (Project | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly duration: number;
  readonly thumbnail: string;
  readonly videoUrl: string;
  readonly techVotes: number;
  readonly creativeVotes: number;
  readonly valueVotes: number;
  readonly User?: User;
  readonly Comments?: (Comment | null)[];
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Project>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}