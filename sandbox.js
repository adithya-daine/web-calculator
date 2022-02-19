class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))return
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current))return

        switch(this.operation){
            case '+':
                computation = prev + current;
                break;

            case '-':
                computation = prev - current;
                break;
        
            case '*':
                computation = prev * current;
                break;

            case '/':
                computation = prev / current;
                break;

            default:
                return;
          
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const intergerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalNumber = stringNumber.split('.')[1];
  
        let intergerDisplay;
        if(isNaN(intergerDisplay)){
            intergerDisplay = '';

        }else{
            intergerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if(decimalNumber != null){
            return `${intergerDisplay}.${decimalNumber}`
        }else{
            return intergerDisplay;
        }

    }

    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandText.innerText = `${this.getDisplayNumber(previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandText.innerText = ''
        }


    }
}


const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const clearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const numberButton = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');

const calculator = new Calculator(previousOperandText, currentOperandText);

//For all the buttons to function
numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})



