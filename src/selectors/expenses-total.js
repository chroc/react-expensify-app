// Returns the total amount of all the expenses
export default (expenses) => {
    if(expenses.length === 0){
        return 0;
    }else{
        const expensesAmounts = expenses.map((expense) => expense.amount);
        const totalExpenses = expensesAmounts.reduce((previousValue, currentValue) => previousValue + currentValue);
        return totalExpenses;
    }
};