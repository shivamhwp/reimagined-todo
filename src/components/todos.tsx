"use client";

import { db } from "@/db/db";

import { useLiveQuery } from "dexie-react-hooks";
import { CheckboxTitle } from "./ui/checkbox-title";
import { AddButton } from "./add-button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
import { redirect } from "next/navigation";
import UpdateTodo from "./update-todo";
import { toast } from "@/hooks/use-toast";

const Todos = () => {
  const todos = useLiveQuery(() => db.todos.toArray());

  return (
    <div className="flex  items-center flex-col gap-4">
      {todos?.map((todo) => (
        <div
          key={todo.id}
          className="flex flex-col gap-2 text-black bg-white p-4 w-full rounded-xl"
        >
          <div className="flex justify-between">
            <CheckboxTitle title={todo.title} currTodo={todo} />
            <span className="text-slate-500 pl-16 ">{todo.status}</span>
          </div>
          <div className="flex">
            <div className="gap-3 flex flex-col justify-between w-full">
              <span className="text-zinc-800">{todo.description}</span>
              <div className="flex  justify-between w-full">
                <span>
                  due: {dayjs(todo.assignedDate).format("DD/MM/YYYY")}
                </span>

                <div className="flex gap-2  items-center  justify-center">
                  <div
                    className="rounded-xl px-3 py-2 font-medium hover:bg-red-600 border hover:cursor-pointer transition duration-300  hover:text-white"
                    onClick={async () => {
                      await db.todos.delete(todo.id);
                      toast({ description: "the todo has been deleted" });
                      redirect("/");
                    }}
                  >
                    delete
                  </div>
                  <UpdateTodo currTodo={todo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton />
    </div>
  );
};

export default Todos;
