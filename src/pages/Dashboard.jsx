//react router dom imports
import { Link, useLoaderData } from "react-router-dom"
// helper function
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers"
import Intro from "../components/Intro"
// loader 加载器

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm"
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";


export function dashboardLoader() {
    const userName = fetchData("userName")
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { userName, budgets, expenses }
}

export async function dashboardAction({ request }) {
    await waait();
    //获取数据
    const data = await request.formData();
    //将数据传递给formData
    const { _action, ...values } = Object.fromEntries(data);
    //判断传递的数据是不是userName
    if (_action === "newUser") {
        try {
            // throw new Error('ya done')
            //存储在本地localStorage中
            localStorage.setItem("userName", JSON.stringify(values.userName))
            //使用toast轮子展现提醒消息
            return toast.success(`Welcome,${values.userName}`)
        } catch (e) {
            throw new Error("There was a problem creating your account.")
        }
    }

    if (_action === "createBudget") {
        try {
            // throw new Error("you failed")
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            })
            return toast.success("Budget created!")
        } catch {
            throw new Error("There was a problem creating your budget.")
        }
    }

    if (_action === "createExpense") {
        try {
            // throw new Error("you failed")
            //create an expense
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch {
            throw new Error("There was a problem creating your expense.")
        }
    }

    if (_action === "deleteExpense") {
        try {
            // throw new Error("you failed")
            //create an expense
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success("Expense delete!")
        } catch {
            throw new Error("There was a problem deleting your expense.")
        }
    }
}


const Dashboard = () => {

    const { userName, budgets, expenses } = useLoaderData()

    return (
        <>
            {userName
                ?
                <div className="dashboard">
                    <h1>Welcome back,
                        <span className="accent">
                            {userName}
                        </span>
                    </h1>
                    <div className="grid-sm">
                        {
                            budgets && budgets.length > 0
                                ? (
                                    <div className="grid-lg">
                                        <div className="flex-lg">
                                            <AddBudgetForm />
                                            <AddExpenseForm budgets={budgets} />
                                            {/* budgets={budgets}为数据传递 */}
                                        </div>
                                        <h2>Existing Budgets</h2>
                                        <div className="budgets">
                                            {
                                                budgets.map((budget) => (
                                                    <BudgetItem key={budget.id} budget={budget} />
                                                ))
                                            }
                                        </div>
                                        {
                                            expenses && expenses.length > 0 && (
                                                <div className="grid-md">
                                                    <h2>Recent Expenses</h2>
                                                    <Table expenses={expenses
                                                        .sort((a, b) => b.createAt - a.createAt)
                                                        .slice(0, 8)
                                                    } />
                                                    {expenses.length > 8 && (
                                                        <Link
                                                            to="expenses"
                                                            className="btn btn--dark"
                                                        >
                                                            view all expenses
                                                        </Link>
                                                    )}
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div className="grid-sm">
                                        <p>Personal budgeting is the secret to financial freedom.</p>
                                        <p>Create a budget to get started!</p>
                                        <AddBudgetForm />
                                    </div>
                                )
                        }
                    </div>
                </div>
                :
                <Intro />}
        </>
    )
}

export default Dashboard