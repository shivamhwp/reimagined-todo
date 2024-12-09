import { Todo } from "@/stores/todo";
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
import { useToast } from "@/hooks/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";

import { db } from "@/db/db";

const UpdateTodo = ({ currTodo }: { currTodo: Todo }) => {
  const { toast } = useToast();
  const { todo, setTitle, setDescription, setStatus, resetTodo } =
    useTodoStore();

  async function updateTodoFn() {
    try {
      await db.todos.update(currTodo.id, {
        id: todo.id,
        title: todo.title === "" ? currTodo.title : todo.title,
        description:
          todo.description === "" ? currTodo.description : todo.description,
        updated: todo.updated === null ? currTodo.updated : todo.updated,
        status: todo.status,
        assignedDate:
          todo.assignedDate === null
            ? currTodo.assignedDate
            : todo.assignedDate,
      });
      toast({ description: "The todo has been updated ✅  " });
      resetTodo();
    } catch {
      toast({ description: "Failed to edit todo ❌" });
      resetTodo();
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-lg font-medium px-3 py-2 bg-zinc-800 text-white border hover:cursor-pointer transition duration-300  ">
        edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          placeholder={currTodo.title}
          value={todo.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder={currTodo.description}
          value={todo.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="gap-4 flex">
          <Select
            value={todo.status}
            onValueChange={(value) => setStatus(value as CompletionStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={currTodo.status}
                defaultValue={currTodo.status}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="complete">complete</SelectItem>
              <SelectItem value="incomplete">incomplete</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithPresets />
        </div>
        <DialogClose
          className="bg-black w-full text-white rounded-md py-2 hover:bg-zinc-800 font-medium"
          onClick={updateTodoFn}
        >
          Submit
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodo;
