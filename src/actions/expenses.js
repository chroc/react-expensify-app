import { v1 as uuid }  from 'uuid';
import db from '../firebase/firebase';
import {getDatabase, ref, set, remove, update, onValue, push, onChildRemoved, onChildChanged, onChildAdded} from 'firebase/database'

// Action generators:

// Add Expense
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
        const expense = {description, note, amount, createdAt};
        push(ref(db, 'expenses'), expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// Remove Expense
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// Edit Expense
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});