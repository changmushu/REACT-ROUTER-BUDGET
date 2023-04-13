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

//删除localstorage内信息
export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key)
}