import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense, startRemoveExpense, startEditExpense } from '../actions/expenses';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

// Edit functional component
const EditExpensePage = (props) => {
    // define hooks
    //console.log(props);
    const navigate = useNavigate();
    const { id } = useParams();
    // const location = useLocation();
    // console.log(location);
    return (
        <div>
            <ExpenseForm expense={props.expense} onSubmit={(expense) => {
                props.dispatch(startEditExpense(props.expense.id, expense));
                navigate('/');
            }} />
            <button onClick={(e) => {
                props.dispatch(startRemoveExpense({ id }));
                navigate('/');
            }}>Remove</button>
    </div>
    );
};

const mapStateToProps = (state) => {
    try {
        const { id } = useParams();
        return {
            expense: state.expenses.find((expense) => expense.id === id)
        };
    } catch (e) {
        console.log('Error with the id');
    }
    
};

export default connect(mapStateToProps)(EditExpensePage);