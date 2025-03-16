import { useEffect, useState } from "react"; // Manage state and side effects
import { useNavigate, useParams } from "react-router-dom";
import { getTodoById, updateTodo } from "@/services/todoService"; // Import API functions

import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { toast } from "sonner";

import {LoaderIcon} from "lucide-react"; // Import icons

import { Todo } from "@/types/todo";

const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); //  Get ID from URL
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todoId = Number(id); //  Convert id from string to number
        if (isNaN(todoId)) throw new Error("Invalid Todo ID");
        
        // toast.success("Loading todo..."); // ✅ Show loading toast only once
        
        const data = await getTodoById(todoId); //  Fetch todo by ID
        setTodo(data);
        setTitle(data.title);
        setDescription(data.description || "");
      } catch (error) {
        console.error("Error fetching todo:", error);
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    };
    if (id) fetchTodo();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <LoaderIcon className="animate-spin w-6 h-6" />
      </div>; // ✅ Show loading state
  }

  if (!todo) {
    toast.error("Todo not found");
    return null;
  }

  const handleUpdateTodo = async () => {
    if (!title.trim()) {
      toast.warning("Title is required");
      return;
    }
    
    const updatedTodo: Todo = {
      id: todo.id,
      title,
      description,
      completed: todo.completed, // Ensure we maintain the completed status
    };
    
    try {
      await updateTodo(updatedTodo); //  Call API function
      navigate("/"); // Redirect back to Todo List
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
          <Input
            placeholder="Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
          />
          <Input
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleUpdateTodo} className="w-full">
            Update Todo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTodo;
