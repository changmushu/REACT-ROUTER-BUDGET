import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData, waait } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function expensesLoader() {
    const expenses = fetchData("expenses");
    return { expenses }
}

export async function expensesAction({ request }) {
    //获取数据
    const data = await request.formData();
    //将数据传递给formData
    const { _action, ...values } = Object.fromEntries(data);
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

const ExpensesPage = () => {

    const { expenses } = useLoaderData()


    return (
        <div className="grid-lg">
            <h1>ALL Expenses</h1>
            {
                expenses && expenses.length > 0
                    ?
                    (
                        <div className="grid-md">
                            <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                            <Table expenses={expenses} />
                        </div>
                    )
                    :
                    <p>No Expenses to show</p>

            }
        </div >
    )
}

export default ExpensesPage