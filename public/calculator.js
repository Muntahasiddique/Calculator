document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const buttons = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            '+': '+', '-': '-', '*': '*', '/': '/', '.': '.',
            'Enter': '=', 'Escape': 'C', 'Backspace': 'CE',
            '%': '%', 'p': 'pi', 'e': 'e', 's': 'sqrt'
        };
        
        if (buttons[key]) {
            e.preventDefault();
            const button = document.querySelector(`button[value="${buttons[key]}"]`);
            if (button) {
                button.click();
                // Add visual feedback
                button.classList.add('active');
                setTimeout(() => button.classList.remove('active'), 100);
            }
        }
    });
});