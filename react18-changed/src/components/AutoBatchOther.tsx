import { useState } from "react";
import { flushSync } from "react-dom";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const AutoBatchOther = () => {
  // setStateを3つにすると3回呼ばれる
  console.log(
    "AutoBatchOther set関数が二つあるので再レンダリングが起こり2回呼ばれる"
  );
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isFinishApi, setIsFinishApi] = useState<boolean>(false);

  const onClickExecuteApi = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        flushSync(() => {
          setTodos(data);
        });
        setIsFinishApi(true);
      });
  };

  return (
    <div>
      <p>Automatic Batching確認用(その他)</p>
      <button onClick={onClickExecuteApi}>API実行</button>
      <p>isFinishApi: {isFinishApi ? "true" : "false"}</p>
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
};
