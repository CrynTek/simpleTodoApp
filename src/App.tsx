import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Todolist from './components/Todolist';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import { Toaster} from 'sonner';

const router = createHashRouter([ // ✅ Changed to createHashRouter for GitHub Pages compatibility
  {path: '/', element: <Home />},
  {path: 'todos', element: <Todolist />},
  {path: 'create', element: <CreateTodo />},
  {path: 'edit/:id', element: <EditTodo />},
])

const App = () => {
  return (
    <div>
      <Toaster/>
      <RouterProvider router={router} /> {/* ✅ Corrected RouterProvider usage */}
    </div>
  );
};

export default App;