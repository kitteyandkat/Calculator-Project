let calculator = document.querySelector('.calcBody')
let calcButtons = document.querySelector('.calcButtons')
let inputWindow = document.querySelector('.inputWindow')


let calculate = (n1, operator, n2) => {
  let result = ''
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }

  return result
}


calcButtons.addEventListener('click', e => {
  if (e.target.matches('button')) {
    let key = e.target
    let action = key.dataset.action
    let keyContent = key.textContent
    let inputWindowNum = inputWindow.textContent
    let previousKeyType = calculator.dataset.previousKeyType

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

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
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.firstValue = inputWindowNum
      calculator.dataset.operator = action
    }

    if (action === 'clear') {
      console.log('clear key!')
    }

    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue
      let operator = calculator.dataset.operator
      let secondValue = inputWindowNum

      inputWindow.textContent = calculate(firstValue, operator, secondValue)
    }
  }
})
