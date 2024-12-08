"use client";

import { db } from "@/db/db";

import { useLiveQuery } from "dexie-react-hooks";
import { CheckboxTitle } from "./ui/checkbox-title";
import { AddButton } from "./add-button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import { ScrollArea } from "@/components/ui/scroll-area";

dayjs.extend(relativeTime);
import { redirect } from "next/navigation";
import UpdateTodo from "./update-todo";
import { toast } from "@/hooks/use-toast";
import { useDayStore } from "@/stores/todo";

const Todos = () => {
  const { selectedDay } = useDayStore();
  const todos = useLiveQuery(() => db.todos.toArray());

  const filteredTodos = todos?.filter((todo) =>
    dayjs(dayjs(todo.assignedDate).date()).isSame(selectedDay)
  );

  return (
    <div className="flex items-center flex-col gap-4 w-auto ">
      {filteredTodos?.map((todo) => (
        <div
          key={todo.id}
          className="flex flex-col gap-2 text-black bg-white p-4 w-full rounded-xl  "
        >
          <div className="flex justify-between ">
            <CheckboxTitle title={todo.title} currTodo={todo} />
            <span className="text-slate-500 pl-16 max-sm:text-sm">
              {todo.status}
            </span>
          </div>

          <div className="text-zinc-800 text-base max-sm:text-sm max-w-96  overflow-clip  flex">
            {todo.description}
          </div>

          <div className="flex">
            <div className="flex justify-between w-full">
              <span className="pr-16 flex items-center justify-center max-sm:text-sm">
                due: {dayjs(todo.assignedDate).format("DD/MM/YYYY")}
              </span>

              <div className="flex gap-2 items-center justify-center">
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
      ))}
      <AddButton />
    </div>
  );
};

export default Todos;
