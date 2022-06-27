import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
import { useNavigate } from 'react-router-dom';

// Add expense functional component
const AddExpensePage = (props) => {
    let navigate = useNavigate();
    return (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={(expense) => {
            props.dispatch(startAddExpense(expense));
            navigate('/');
        }} />
    </div>
)};

export default connect()(AddExpensePage);