import { UUIDTypes } from "uuid";

export type completionStatus = "complete" | "incomplete";

export interface Todo {
  id: UUIDTypes;
  title: string;
  description: string;
  created: Date;
  updated?: Date;
  completionStatus: completionStatus;
}
