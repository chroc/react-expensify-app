import { createStore, combineReducers } from 'redux';
import { v1 as uuid }  from 'uuid';

// Actions:

// Add Expense
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// Remove Expense
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// Edit Expense
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Set Text Filter
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// Sort by Amount
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// Soirt by Date
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// Set Start Date
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// Set End Date
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});


// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return ({
                        ...expense,
                        ...action.updates
                    });
                }else{
                    return expense;
                }
            });
        default:
            return state;
    }
};

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return { ...state, text: action.text };
        case 'SORT_BY_AMOUNT':
            return { ...state, sortBy: 'amount' };
        case 'SORT_BY_DATE':
            return { ...state, sortBy: 'date' };
        case 'SET_START_DATE':
            return { ...state, startDate: action.startDate };
        case 'SET_END_DATE':
            return { ...state, endDate: action.endDate };
        default:
            return state;
    }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// Store creation
const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

// subscribe to the store
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

// dispatch the actions
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 500, createdAt: 50 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 700, createdAt: 30 }));
// const expenseRemoved = store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// console.log('filtering text...');
// store.dispatch(setTextFilter());
// store.dispatch(setTextFilter());

console.log('sortBy amount...');
store.dispatch(sortByAmount()); // amount
// console.log('sortBy date...');
// store.dispatch(sortByDate()); // date

// console.log('set startd date ...');
// store.dispatch(setStartDate(0));
// console.log('set startd date Default value');
// store.dispatch(setStartDate());
// console.log('set end date 1250...');
// store.dispatch(setEndDate(100));

// console.log(expenseOne);
// console.log(expenseTwo);
// console.log(expenseRemoved);

const demoState = {
    expenses: [{
        id: 'abc001',
        description: 'June Rent',
        note: 'Monthly payment',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: 'Jess',
//     age: 25
// };

// console.log({
//     ...user,
//     city: 'Mel',
//     age: 27
// });