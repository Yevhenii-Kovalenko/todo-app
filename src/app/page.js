import { Todo } from "@/components/Todo";

export default function Home() {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-5">
      <Todo />
    </div>
  );
}
