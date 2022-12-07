let calculator = document.querySelector('.calcBody')
let calcButtons = document.querySelector('.calcButtons')
let inputWindow = document.querySelector('.inputWindow')

// 4-4
// 2+(2*4)
let calculate = (input) => {
  // if the input does not contain an operator
  if (
    !input.includes('+') &&
    !input.includes('-') &&
    !input.includes('*') &&
    !input.includes('/')
  ) {
    return input
    // so it doesn't loop forever and brick my computer
    // PEMDAS but lowkey fogetting PE for now
    // if split only has 1 element, there's is nothing to be added
  }
  let split = inputWindow.textContent.split('+');
  if (split.length !== 1) {
    let firstValue = split[0]
    let secondValue = split[1]
    input = parseFloat(firstValue) + parseFloat(secondValue);
  }
  split = inputWindow.textContent.split('-');
  if (split.length !== 1) {
    let firstValue = split[0]
    let secondValue = split[1]
    input = parseFloat(firstValue) - parseFloat(secondValue);
  }
  split = inputWindow.textContent.split('/');
  if (split.length !== 1) {
    let firstValue = split[0]
    let secondValue = split[1]
    input = parseFloat(firstValue) / parseFloat(secondValue);
  }
  split = inputWindow.textContent.split('*');
  if (split.length !== 1) {
    let firstValue = split[0]
    let secondValue = split[1]
    input = parseFloat(firstValue) * parseFloat(secondValue);
  }
  // now i have to replace the first instance of operation 
  
  /*if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'minus') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }*/

  return calculate(input.toString())
}


calcButtons.addEventListener('click', e => {
  if (e.target.matches('button')) {
    let key = e.target
    let action = key.dataset.action
    let keyContent = key.textContent
    let inputWindowNum = inputWindow.textContent
    let previousKeyType = calculator.dataset.previousKeyType

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('pushedButton'))

    if (!action) {
      if (inputWindowNum === '0' || previousKeyType === 'operator') {
        inputWindow.textContent = keyContent
      } else {
        inputWindow.textContent = inputWindowNum + keyContent
      }
    }

    if (action === 'decimal') {
      inputWindow.textContent = inputWindowNum + '.'
    }

    if (
      action === 'add' ||
      action === 'minus' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('pushedButton')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.firstValue = inputWindowNum
      calculator.dataset.operator = action
    }

    if (action === 'clear') {
      inputWindow.textContent = ''
    }

    if (action === 'equals') {
      // let firstValue = calculator.dataset.firstValue
      // let operator = calculator.dataset.operator
      // let secondValue = inputWindowNum
      // 1+1
      // 10+1
      // 1+10
      // 2+2+2



      inputWindow.textContent = calculate(inputWindow.textContent)
    }
  }
})

