"use client";

import AddIcon from "./ui/add-icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithPresets } from "./ui/date-picker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { CompletionStatus, useTodoStore } from "@/stores/todo";

import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { db } from "@/db/db";

import { useLiveQuery } from "dexie-react-hooks";
import { CheckboxTitle } from "./ui/checkbox-title";

const Todos = () => {
  const todos = useLiveQuery(() => db.todos.toArray());

  // if (todos && todos.length === 0) {
  //   toast({ description: "no todos found, try adding some" });
  // }

  return (
    <div className="flex items-center flex-col gap-4">
      {todos?.map((todo) => (
        <div
          key={todo.id}
          className="flex flex-col gap-2 text-black bg-white p-4 w-full rounded-lg"
        >
          <div className="flex justify-between">
            <CheckboxTitle title={todo.title} />
            <span className="text-slate-500 pl-16">{todo.status}</span>{" "}
          </div>
          <div className="">
            <span>{todo.description}</span>
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

const AddButton = () => {
  const { toast } = useToast();
  const { todo, setTitle, setDescription, setStatus, resetTodo } =
    useTodoStore();

  async function addToDB() {
    if (todo.title === "") {
      toast({
        description: "Title can't be empty",
      });
      redirect("/");
    }

    try {
      await db.todos.add({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        created: todo.created,
        updated: todo.updated,
        status: todo.status,
        assignedDate: todo.assignedDate,
      });

      resetTodo();
    } catch {
      toast({ description: "Failed to add todo" });
      resetTodo();
    }

    console.log(
      todo.title,
      todo.description,
      todo.assignedDate,
      todo.created,
      todo.id,
      todo.status,
      todo.updated
    );
    resetTodo();
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="fixed bottom-4 p-4 hover:cursor-pointer rounded-full shadow-sm hover:shadow-2xl bg-white transition duration-300">
          <AddIcon />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Title"
            value={todo.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Desciption"
            value={todo.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="gap-4 flex ">
            <Select
              value={todo.status}
              onValueChange={(value) => setStatus(value as CompletionStatus)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Complete">Complete</SelectItem>
                <SelectItem value="Incomplete">Incomplete</SelectItem>
              </SelectContent>
            </Select>
            <DatePickerWithPresets />
          </div>
          <DialogClose
            className="bg-black w-full text-white rounded-md py-2 hover:bg-zinc-800 font-medium  "
            onClick={addToDB}
          >
            Submit
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};
