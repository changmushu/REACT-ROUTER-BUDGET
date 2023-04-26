export const waait = () => new Promise(res => setTimeout(res, Math.random() * 2000))

//设置颜色的值以随机化 65% 50%为hls百分比
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

//获取Local storage内信息
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const createBudget = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(), //随机id
        name: name,
        createAt: Date.now(),//获取时间
        amount: +amount,
        color: generateRandomColor()//获得随机颜色
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

export const createExpense = ({
    name, amount, budgetId
}) => {
    const newItem = {
        id: crypto.randomUUID(), //随机id
        name: name,
        createAt: Date.now(),//获取时间
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}


//删除localstorage内信息
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key)
}

//百分比计算
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}

//货币转换
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}

//计算金额总和
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        // check if expense.id === budgetId I passed in
        if (expense.budgetId !== budgetId) return acc

        // add the current amount to my total
        return acc += expense.amount
    }, 0)
    return budgetSpent;
}

//时间转换
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

//处理budget与expense
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
}