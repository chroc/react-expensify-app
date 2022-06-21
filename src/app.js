import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense,removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

// subscribe to the store
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

// console.log('dispatch 1: add expense 1');
store.dispatch(addExpense({ description: 'Water bill', amount: 300, createdAt: 3000 }));
// console.log('dispatch 2: add expense 2');
store.dispatch(addExpense({ description: 'Gas bill', amount: 250, createdAt: 88000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 1600, createdAt: 5500 }));

// console.log('bill filter');
// store.dispatch(setTextFilter('water'));

// console.log('get state');
// console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));