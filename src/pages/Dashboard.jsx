//react router dom imports
import { useLoaderData } from "react-router-dom"
// helper function
import { createBudget, fetchData } from "../helpers"
import Intro from "../components/Intro"
// loader 加载器

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBudgetForm from "../components/AddBudgetForm";

export function dashboardLoader() {
    const userName = fetchData("userName")
    const budgets = fetchData("budgets");
    return { userName, budgets }
}

export async function dashboardAction({ request }) {
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
}


const Dashboard = () => {

    const { userName, budgets } = useLoaderData()

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
                        {/* {budgets ? (): ()} */}
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddBudgetForm />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Intro />}
        </>
    )
}

export default Dashboard