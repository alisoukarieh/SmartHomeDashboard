"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
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

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <CardTitle>To-Do List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardContent>
        <ScrollArea className="h-full mt-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.completed ? "line-through" : ""}>
                  {todo.text}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {todos.filter((todo) => !todo.completed).length} tasks remaining
        </p>
      </CardFooter>
    </Card>
  );
}
