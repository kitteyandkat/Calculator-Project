/* Left to work on 
-̶ S̶i̶m̶p̶l̶i̶f̶y̶ o̶u̶t̶p̶u̶t̶ t̶o̶ o̶n̶l̶y̶ d̶i̶s̶p̶l̶a̶y̶ c̶e̶r̶t̶a̶i̶n̶ n̶u̶m̶b̶e̶r̶ o̶f̶ d̶i̶g̶i̶t̶s̶
  -̶ .̶t̶o̶F̶i̶x̶e̶d̶ t̶o̶ o̶n̶l̶y̶ s̶h̶o̶w̶ s̶i̶g̶n̶i̶f̶i̶c̶a̶n̶t̶ d̶i̶g̶i̶t̶s̶
- Clear window unless operator is pressed, then compound
- PEMDAS Functionality
  - Add Parenthesis button
- Negative Number Functionality
  -̶ A̶r̶i̶t̶h̶m̶e̶t̶i̶c̶ w̶i̶t̶h̶ n̶e̶g̶a̶t̶i̶v̶e̶ n̶u̶m̶b̶e̶r̶s̶
  - +/- button functionality
- Percentage function
- Can only press operator once
-Keyboard functionality
*/

let calculator = document.querySelector('.calcBody')
let calcButtons = document.querySelector('.calcButtons')
let inputWindow = document.querySelector('.inputWindow')
let clearWindow = false
// 4-4
// 2+(2*4)
let calculate = (input) => {
  // console.log(input)
  // if the input does not contain an operator
  // so it doesn't loop forever and brick my computer
  // PEMDAS but lowkey fogetting PE for now
  if (
    !input.includes('+') &&
    !input.includes('-') &&
    !input.includes('*') &&
    !input.includes('/')
  ) {
    return input
    // input.includes (""'-'"") if contains - must also contain 2 numbers 
  }
  if (
    input.split('-')[0] === ''
  ) {
    console.log('negative number')
    return input
  }
  // if split only has 1 element, there's is nothing to be added
  let split = input.split('+');
  if (split.length !== 1) {
    let firstValue = split[0]
    let secondValue = split[1]
    // parseFloat vs parseInt because we're working with decimals and not just whole numbers
    let newValue = parseFloat((parseFloat(firstValue) + parseFloat(secondValue)).toFixed(10)).toString();
    //This is a method, that replaces the old value, with the calculated value
    input = input.replace(`${firstValue}+${secondValue}`, newValue)
  }
  // if answer is negative, return absolute value and string '-'
  split = input.split('-');
  if (split.length !== 1) {
    let firstValue = split[0]
    let secondValue = split[1]
    let newValue = parseFloat((parseFloat(firstValue) - parseFloat(secondValue)).toFixed(10)).toString();
    //This is a method, that replaces the old value, with the calculated value
    console.log(newValue)
    input = input.replace(`${firstValue}-${secondValue}`, newValue)
  }
  split = input.split('/');
  if (split.length !== 1) {
    let firstValue = split[0]
    let secondValue = split[1]
    let newValue = parseFloat((parseFloat(firstValue) / parseFloat(secondValue)).toFixed(10)).toString();
    //This is a method, that replaces the old value, with the calculated value
    input = input.replace(`${firstValue}/${secondValue}`, newValue)
  }
  split = input.split('*');
  if (split.length !== 1) {
    let firstValue = split[0]
    let secondValue = split[1]
    let newValue = parseFloat((parseFloat(firstValue) * parseFloat(secondValue)).toFixed(10)).toString();
    //This is a method, that replaces the old value, with the calculated value
    input = input.replace(`${firstValue}*${secondValue}`, newValue)
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

  return calculate(input)
}

//add to clear after equals, last clicked button === 'equals'

calcButtons.addEventListener('click', e => {
  if (e.target.matches('button')) {
    let key = e.target
    let action = key.dataset.action
    let keyContent = key.textContent
    let previousKeyType = calculator.dataset.previousKeyType

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('pushedButton'))

    if (clearWindow) {
      inputWindow.textContent = ''
      clearWindow = false
      console.log(clearWindow)
    }

    if (!action) {
      if (inputWindow.textContent === '0' || previousKeyType === 'operator') {
        inputWindow.textContent = keyContent
      } else {
        inputWindow.textContent = inputWindow.textContent + keyContent
      }
    }
    
    if (action === 'decimal') {
      inputWindow.textContent += '.'
    }
    
    // multiply input by -1 to get +/-
    if (action === 'negative') {
      console.log('negative button!')
      inputWindow.textContent = inputWindow.textContent *-1
    }
   
    //percentage functionalty 
    if (action === 'percent') {
      console.log('percent')
      inputWindow.textContent = inputWindow.textContent/100 
    }

    
    if (
      action === 'add' ||
      action === 'minus' ||
      action === 'multiply' ||
      action === 'divide'
      ) {
        key.classList.add('pushedButton')
        calculator.dataset.previousKeyType = 'operator'
        // calculator.dataset.firstValue = inputWindowNum
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
      // if (
      //   input.includes('+') &&
      //   input.includes('-') &&
      //   input.includes('*') &&
      //   input.includes('/')
      // ){
      clearWindow = true
      // }
      //need to add in clear unless operator is entered
    }
  }
})
