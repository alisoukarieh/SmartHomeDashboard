"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a todo app", completed: true },
    { id: 3, text: "Style it with Tailwind", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: 12, text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const remainingTasks = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg h-full w-full">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow mr-2 bg-black text-white"
        />
        <Button onClick={addTodo} className="bg-blue-500 hover:bg-blue-600">
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between bg-black p-3 rounded"
          >
            <div className="flex items-center">
              <Button
                onClick={() => toggleTodo(todo.id)}
                className={`mr-2 ${
                  todo.completed ? "bg-green-500" : "bg-gray-600"
                } hover:bg-opacity-80`}
              >
                <CheckIcon className="w-4 h-4" />
              </Button>
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
            <Button
              onClick={() => removeTodo(todo.id)}
              className="bg-red-500 hover:bg-red-600"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-400">
        {remainingTasks} task(s) remaining
      </div>
    </div>
  );
}
