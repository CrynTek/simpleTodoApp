import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Trash, Edit } from "lucide-react"; // Import icons

import { Todo } from "@/types/todo"; // Import Todo type
import { deleteTodo, getTodos, updateTodo } from "@/services/todoService"; //  Import service functions


const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();

  //  Use `getTodos` function from the service
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  // Use `updateTodo` function from the service
  const handleToggleComplete = async (id: number) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

      // Call API function to update todo
      await updateTodo(updatedTodo); 

      // Update UI after successful update
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id); // Call API service to delete the todo
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (todo: Todo):void => {
    navigate(`/edit/${todo.id}`, 
      { state: { todo } }
    ); // Navigate to Edit page with todo data
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <Button onClick={() => navigate("/create")} className="mb-4">
        + Add Todo
      </Button>
      <div className="w-full max-w-md space-y-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Card key={todo.id} className="shadow-md">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{todo.title}</h2>
                <p className="text-gray-600">{todo.description}</p>
                <div className="flex justify-between ">

                  <Button
                    variant={todo.completed ? "secondary" : "default"}
                    className="mt-2"
                    onClick={() => handleToggleComplete(todo.id)}
                  >
                    {todo.completed ? "Completed" : "Mark as Done"}
                  </Button>
                  <div className="flex space-x-2">

                    <Button
                      variant="destructive"
                      className="mt-2"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <Trash size={24} />
                    </Button>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => handleEdit(todo)}

                    >
                      <Edit size={24} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
