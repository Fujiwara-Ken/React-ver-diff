import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Todo = {
  userId: number;
  id: number;
  title: string;
};

const fetchTodos = async () => {
  const result = await axios.get<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return result.data;
};

export const TodoList = () => {
  const { data } = useQuery<Todo[]>(["todos"], fetchTodos, {
    suspense: true,
  });

  return (
    <div
      style={{
        height: "300px",
        border: "2px solid gray",
        background: "mistyrose",
        overflowY: "scroll",
      }}
    >
      <h2>Todo</h2>
      {data?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
};
