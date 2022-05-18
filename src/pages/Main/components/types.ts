export enum EmailTopic {
  All = 'All',
  Hottest = 'Hottest',
}

export type TEmail = {
  email: string;
  topic: EmailTopic;
  request?: string;
};
