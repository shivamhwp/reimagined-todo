import CalendarView from "@/components/calendar-view";
import Todos from "@/components/todos";

export default function Home() {
  return (
    <div className="bg-[#F3F4F6] h-screen w-screen flex flex-col gap-4 items-center">
      <CalendarView />
      <Todos />
    </div>
  );
}
