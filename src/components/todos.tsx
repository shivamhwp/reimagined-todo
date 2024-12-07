"use client";

import { db } from "@/db/db";

import { useLiveQuery } from "dexie-react-hooks";
import { CheckboxTitle } from "./ui/checkbox-title";
import { AddButton } from "./add-button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { redirect } from "next/navigation";

const Todos = () => {
  const todos = useLiveQuery(() => db.todos.toArray());

  return (
    <div className="flex items-center flex-col gap-4">
      {todos?.map((todo) => (
        <div
          key={todo.id}
          className="flex flex-col gap-2 text-black bg-white p-4 w-full rounded-lg"
        >
          <div className="flex justify-between">
            <CheckboxTitle title={todo.title} currTodo={todo} />
            <span className="text-slate-500 pl-16">{todo.status}</span>{" "}
          </div>
          <div className="gap-4 flex justify-between ">
            <span className="text-zinc-800">{todo.description}</span>
            <Options id={todo.id} />
            {/* <span>assigned: {dayjs().to(dayjs(todo.assignedDate))}</span> */}
            {/* <span> created: {dayjs().to(dayjs(todo.created))}</span> */}
            {/* <span>updated :{dayjs().to(dayjs(todo.updated))}</span> */}
          </div>
        </div>
      ))}
      <AddButton />
    </div>
  );
};

export default Todos;

const Options = ({ id }: { id: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="text-red-600 hover:cursor-pointer "
          onClick={async () => {
            await db.todos.delete(id);
            redirect("/");
          }}
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
