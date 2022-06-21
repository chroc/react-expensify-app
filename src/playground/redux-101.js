import { createStore } from 'redux';

// Action Generators
// increment count
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

// decrement count
const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

// set count
const setCount = ({ count }) => ({
    type: 'SET',
    count
});

// reset count
const resetCount = () => ({
    type: 'RESET'
});

// Reducers

const countReducer = (state = { count: 0 }, action) => {
    switch(action.type){
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    // Call getState
    console.log(store.getState());
});

// Increment the count +5
store.dispatch(incrementCount({
    incrementBy: 5
}));
// +1
store.dispatch(incrementCount());

// Reset the count to 0
store.dispatch(resetCount());

// Decrement the count -1
store.dispatch(decrementCount());
// -10
store.dispatch(decrementCount({ decrementBy: 10 }));

// Set a value
store.dispatch(setCount({ count: 400 }));