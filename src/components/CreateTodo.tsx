import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { createTodo } from "@/services/todoService"; // Import createTodo function

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreateTodo = async () => {
    if (!title.trim()) return;
    
    const newTodo = { title, description, completed: false };
    
    try {
      await createTodo(newTodo); // Use service function
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Create a New Todo</h2>
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
          <Button onClick={handleCreateTodo} className="w-full">
            Add Todo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTodo;
