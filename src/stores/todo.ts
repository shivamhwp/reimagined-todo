import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

export type CompletionStatus = "complete" | "incomplete";

export interface Todo {
  id: string;
  title: string;
  description: string;
  created: Date;
  updated: Date;
  assignedDate: Date | null;
  status: CompletionStatus;
}

type State = {
  todo: Todo;
};
type Actions = {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setStatus: (status: CompletionStatus) => void;
  setAssignedDate: (date: Date) => void;
  resetTodo: () => void;
};

export const useTodoStore = create<State & Actions>()(
  immer<State & Actions>((set) => ({
    todo: {
      id: uuidv4(),
      title: "",
      description: "",
      created: new Date(),
      assignedDate: new Date(),
      updated: new Date(),
      status: "incomplete",
    },
    setTitle: (title) =>
      set((state) => {
        state.todo.title = title;
        state.todo.updated = new Date();
      }),
    setDescription: (description) =>
      set((state) => {
        state.todo.description = description;
        state.todo.updated = new Date();
      }),
    setStatus: (status) =>
      set((state) => {
        state.todo.status = status;
        state.todo.updated = new Date();
      }),

    setAssignedDate: (date) =>
      set((state) => {
        state.todo.assignedDate = date;
        state.todo.updated = new Date();
      }),
    resetTodo: () =>
      set((state) => {
        state.todo = {
          id: uuidv4(),
          title: "",
          description: "",
          created: new Date(),
          updated: new Date(),
          assignedDate: null,
          status: "incomplete",
        };
      }),
  }))
);
