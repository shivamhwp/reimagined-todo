import { Todo } from "@/types";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("todoDb") as Dexie & {
  todos: EntityTable<Todo, "id">;
};

// whenever modifying the schema also update the version number.
// go to : https://dexie.org/docs/Tutorial/Understanding-the-basics before migrating deleting or updating the database.

db.version(1).stores({
  todos: "id, title, description, created, updated, completionStatus",
});
