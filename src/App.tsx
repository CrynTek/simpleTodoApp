import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Todolist from './components/Todolist';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import { Toaster,toast } from 'sonner';

const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: 'todos', element: <Todolist />},
  {path: 'create', element: <CreateTodo />},
  {path: 'edit/:id', element: <EditTodo />},
  
])
const App = () => {
  return (
  <div>
    <Toaster/>
  <RouterProvider router={router}>
  </RouterProvider>
  </div>
  );
};
export default App;
