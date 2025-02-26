document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('button');
  let lastInputWasOperator = false;
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonValue = button.value;

      if (button.classList.contains('clear')) {
        display.value = '';
        lastInputWasOperator = false;
      } else if (button.classList.contains('calculate')) {
        try {
          display.value = eval(display.value.replace(/x/g, '*').replace(/÷/g, '/'));
          lastInputWasOperator = false;
        } catch (e) {
          display.value = 'Error';
        }
      } else if (buttonValue === '.') {
        const currentExpression = display.value;
        const lastPart = currentExpression.split(/[\+\-\*\/]/).pop();
        if (!lastPart.includes('.')) {
          display.value += buttonValue;
          lastInputWasOperator = false;
        }
      } else if (buttonValue === '%') {
        const currentExpression = display.value;
        const lastPart = currentExpression.split(/[\+\-\*\/]/).pop();
        if (!isNaN(lastPart) && lastPart !== '') {
          const percentageValue = parseFloat(lastPart) / 100;
          display.value = currentExpression.slice(0, -lastPart.length) + percentageValue.toString();
        }
        lastInputWasOperator = false;
      } else if (button.classList.contains('operator')) {
        if (!lastInputWasOperator) {
          display.value += buttonValue;
          lastInputWasOperator = true;
        }
      } else if (button.classList.contains('delete')) {
        display.value = display.value.slice(0, -1);
        lastInputWasOperator = false;
      } else {
        display.value += buttonValue;
        lastInputWasOperator = false;
      }
    });
  });
});