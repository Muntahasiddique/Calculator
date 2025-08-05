let memory = 0;
let history = [];

exports.getCalculator = (req, res) => {
    res.render('calculator', { 
        display: '0', 
        lastOperation: null,
        memory: memory,
        history: history.slice(-5)
    });
};

exports.postCalculate = (req, res) => {
    let { display, operation, clear } = req.body;
    let newDisplay = display || '0';
    
    if (clear === 'true') {
        return res.render('calculator', { 
            display: '0', 
            lastOperation: null,
            memory: memory,
            history: history
        });
    }

    try {
        if (operation) {
            switch (operation) {
                case '=':
                    const result = safeEval(display);
                    const calculation = `${display} = ${result}`;
                    history.push(calculation);
                    newDisplay = result;
                    break;
                case 'C':
                    newDisplay = '0';
                    break;
                case 'CE':
                    newDisplay = newDisplay.length > 1 ? newDisplay.slice(0, -1) : '0';
                    break;
                case 'sqrt':
                    newDisplay = Math.sqrt(parseFloat(newDisplay)).toString();
                    break;
                case 'pow':
                    newDisplay = Math.pow(parseFloat(newDisplay), 2).toString();
                    break;
                case 'sin':
                    newDisplay = Math.sin(parseFloat(newDisplay)).toString();
                    break;
                case 'cos':
                    newDisplay = Math.cos(parseFloat(newDisplay)).toString();
                    break;
                case 'tan':
                    newDisplay = Math.tan(parseFloat(newDisplay)).toString();
                    break;
                case 'log':
                    newDisplay = Math.log10(parseFloat(newDisplay)).toString();
                    break;
                case 'ln':
                    newDisplay = Math.log(parseFloat(newDisplay)).toString();
                    break;
                case 'M+':
                    memory += parseFloat(newDisplay) || 0;
                    break;
                case 'M-':
                    memory -= parseFloat(newDisplay) || 0;
                    break;
                case 'MR':
                    newDisplay = memory.toString();
                    break;
                case 'MC':
                    memory = 0;
                    break;
                case 'pi':
                    newDisplay = Math.PI.toString();
                    break;
                case 'e':
                    newDisplay = Math.E.toString();
                    break;
                case 'fact':
                    const num = parseInt(newDisplay);
                    if (num < 0) newDisplay = 'Error';
                    else if (num === 0) newDisplay = '1';
                    else {
                        let fact = 1;
                        for (let i = 1; i <= num; i++) fact *= i;
                        newDisplay = fact.toString();
                    }
                    break;
                case 'in2cm':
                    newDisplay = (parseFloat(newDisplay) * 2.54).toString();
                    break;
                case 'cm2in':
                    newDisplay = (parseFloat(newDisplay) / 2.54).toString();
                    break;
                case 'lb2kg':
                    newDisplay = (parseFloat(newDisplay) * 0.453592).toString();
                    break;
                case 'kg2lb':
                    newDisplay = (parseFloat(newDisplay) / 0.453592).toString();
                    break;
                default:
                    newDisplay = newDisplay === '0' ? operation : newDisplay + operation;
            }
        }
    } catch (error) {
        console.error('Calculation error:', error);
        newDisplay = 'Error';
    }

    res.render('calculator', { 
        display: newDisplay, 
        lastOperation: operation,
        memory: memory,
        history: history.slice(-5)
    });
};

function safeEval(expression) {
    const sanitized = expression.replace(/[^0-9+\-*/.%()]/g, '');
    try {
        const result = new Function(`return ${sanitized}`)();
        if (isNaN(result)) throw new Error('Invalid result');
        return result.toString();
    } catch (error) {
        console.error('Evaluation error:', error);
        return 'Error';
    }
}

exports.getHistory = (req, res) => {
    res.render('history', { history: history });
};

exports.clearHistory = (req, res) => {
    history = [];
    res.redirect('/');
};