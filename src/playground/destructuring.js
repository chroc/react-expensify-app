// Challenge 1: Object Destructuring
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName); // Penguin, Self-Published

// Challenge 2: Array Destructuring
const item = ['Coffe (Iced)', '$2.00', '$3.50', '$2.75'];

const [itemName, , mediumPrice,] = item;

console.log(`A ${itemName} costs ${mediumPrice}`);