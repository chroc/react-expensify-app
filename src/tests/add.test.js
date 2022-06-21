const generateGreetingMessage = (name) => `Hello ${name}!`;

test('should greet name', () => {
    const greeting = generateGreetingMessage('Sergio');
    expect(greeting).toBe('Hello Sergio!');
});