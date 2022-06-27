import { v1 as uuid }  from 'uuid';
import db from '../firebase/firebase';
import {getDatabase, ref, set, remove, update, onValue, push, onChildRemoved, onChildChanged, onChildAdded, get, child} from 'firebase/database'

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

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        remove(ref(db, `expenses/${id}`)).then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};

// Edit Expense
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        update(ref(db, `expenses/${id}`), updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    };
};

// Set Expenses
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
      const dbRef = ref(db);
      return get(child(dbRef, 'expenses')).then((snapshot) => {
        if (snapshot.exists()) {
          const expenses = []
          snapshot.forEach((childSnapshot) => {
            expenses.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          dispatch(setExpenses(expenses));
        } else {
          console.log("No Expenses");
        }
      }).catch((error) => {
        console.error(error);
      });
    };
  };