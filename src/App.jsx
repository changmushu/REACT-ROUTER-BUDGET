import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//路由
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import { mainLoader } from "./layouts/Main";
import Error from "./pages/Error";

//layouts
import Main from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },

]);

function App() {

  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;
