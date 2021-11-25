export type ConversationInput = {
  subject: string;
  fromUserId: number;
  toUserId: number;
  userId: number;
  trash: boolean;
  draft: boolean;
  unread: boolean;
};

export type Conversation = {
  id: number;
  subject: string;
  fromUserId: number;
  toUserId: number;
  userId: number;
  trash: boolean;
  draft: boolean;
  unread: boolean;
  dateCreated: boolean;
  dateModified: boolean;
};
