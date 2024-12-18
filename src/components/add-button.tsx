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

export const AddButton = () => {
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
    resetTodo();
  }

  return (
    <div className="">
      <Dialog>
        <DialogTrigger className="fixed max-sm:right-4 bottom-4 z-50 p-4 hover:cursor-pointer rounded-full shadow-sm hover:shadow-2xl bg-white transition duration-300">
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
                <SelectItem value="complete">complete</SelectItem>
                <SelectItem value="incomplete">incomplete</SelectItem>
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
