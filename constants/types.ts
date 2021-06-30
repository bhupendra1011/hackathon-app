export type Props = Readonly<{
  data: {
    id: string;
    createdAt: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    duration: number;
    User: {
      name: string;
      initials: string;
      image: string;
    };
    techVotes: number;
    creativeVotes: number;
    valueVotes: number;
  };
  isEnabled?: boolean;
  size?: number;
}>;
