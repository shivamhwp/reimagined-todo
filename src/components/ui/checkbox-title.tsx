"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { db } from "@/db/db";
import { Todo } from "@/stores/todo";

export function CheckboxTitle({
  title,
  currTodo,
}: {
  title: string;
  currTodo: Todo;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={currTodo.status === "complete" ? true : false}
        id="terms"
        onClick={async () => {
          await db.todos.update(currTodo.id, {
            status: `${
              currTodo.status === "incomplete" ? "complete" : "incomplete"
            }`,
          });
        }}
      />
      <label
        htmlFor="terms"
        className={`font-semibold  leading-none peer-disabled:cursor-not-allowed ${
          currTodo.status === "complete" ? "line-through" : ""
        } peer-disabled:opacity-70`}
      >
        {title}
      </label>
    </div>
  );
}
