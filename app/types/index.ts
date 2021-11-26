import { Request } from "express";
import { Model, Optional } from "sequelize/types";

export interface CustomRequest extends Request {
  currentUser: any;
}

export type ConversationInput = {
  subject: string;
  fromUserId: number;
  toUserId: number;
  userId: number;
  trash: boolean;
  draft: boolean;
  unread: boolean;
};

export type MessageInput = {
  message: string;
  userId: number;
};

export type Conversation = {
  id: number;
  subject: string;
  fromUserId: number;
  toUserId: number;
  userId: number;
  trash: boolean;
  draft: boolean;
  sharedId: string;
  unread: boolean;
  dateCreated: boolean;
  dateModified: boolean;
};

interface ConversationCreationAttributes extends Optional<Conversation, "id"> {}

export interface ConversationModel
  extends Model<Conversation, ConversationCreationAttributes>,
    Conversation {}

export type User = {
  id: number;
  username: string;
  email: string;
  avatar?: string;
};
