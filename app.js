/* eslint-disable require-jsdoc */
window.onload = function() {
  const inputDom = document.getElementById('prompt');
  const buttonDoms = document.querySelectorAll('button');
  const saveDom = document.getElementById('save');

  let prevNumber = NaN;
  let operator = '';


  // input prompt 이벤트 추가
  inputDom.addEventListener('change', (e) => {
    let string = e.target.value;

    string = string.replace(/[^0-9.-]/g, ''); // 숫자 체크

    inputDom.value = string;
  });

  // 각 버튼마다 이벤트 추가
  buttonDoms.forEach((dom) => {
    dom.addEventListener('click', onClickButtonHandler);
  });

  function onClickButtonHandler(e) {
    const string = e.target.innerText;
    console.log(string);
    if ((parseInt(string)>=0 && parseInt(string)<=9) || string==='.') {
      inputPrompt(string);
    } else if ('÷×+-'.indexOf(string) > -1) {
      saveNumberAndOperator(string);
    } else if (string === '=') {
      displayResult();
    } else if (string === 'del') {
      deleteString();
    } else if (string === '±') {
      changeSign();
    } else if (string === 'x²') {
      square();
    } else if (string === '√x') {
      sqrt();
    } else if (string === 'CE') {
      inputReset();
    } else if (string === 'C') {
      allReset();
    } else if (string === '1/x') {
      getReciprocal();
    } else if (string === '%') {
      calculatePercentage();
    }
  }

  // prompt에 number를 뒤에다 추가하는 함수
  function inputPrompt(number) {
    const input = inputDom.value;

    if (input.length >= 2 && input[input.length-1] === '.' &&
     number === '.') {
      return;
    }

    let result = parseFloat((''+input) + number);

    if (number === '.') {
      result = result + '.';
    }

    inputDom.value = result;
  }

  // prompt에 입력한 숫자랑 연산자를 저장하는 함수
  function saveNumberAndOperator(tempOperator) {
    let num1 = parseFloat(prevNumber);
    const num2 = parseFloat(inputDom.value);

    if (!isNaN(num1) && operator.length > 0) {
      num1 = getAnswer(num1, num2, operator);
    } else {
      num1 = num2;
      operator = tempOperator;
    }

    inputDom.value = '';
    operator = tempOperator;
    prevNumber = num1;

    saveDom.innerText = prevNumber + operator;
  }

  // = 연산자를 클릭하였을 때, input창에 결과 표시하고
  // save 창의 display 정보를 지운다.
  function displayResult() {
    const num1 = parseFloat(prevNumber);
    const num2 = parseFloat(inputDom.value);
    const tempOperator = operator;

    const answer = getAnswer(num1, num2, tempOperator);

    inputDom.value = answer;
    saveDom.innerText = '';
  }

  // 연산 결과 반환
  function getAnswer(num1, num2, oper) {
    switch (oper) {
      case '+':
        num1 = num1 + num2;
        break;
      case '-':
        num1 = num1 - num2;
        break;
      case '×':
        num1 = num1 * num2;
        break;
      case '÷':
        if (num2 === 0) {
          arithmeticException();
        }
        num1 = num1 / num2;
        break;
    }

    return num1;
  }

  function deleteString() {
    let string = inputDom.value;
    if (string.length > 0) {
      string = string.substring(0, string.length-1);
      inputDom.value = string;
    }
  }

  function changeSign() {
    const string = inputDom.value;
    const number = parseFloat(string);

    inputDom.value = -number;
  }

  function square() {
    const string = inputDom.value;
    const number = parseFloat(string);

    inputDom.value = number * number;
  }

  function sqrt() {
    const string = inputDom.value;
    const number = parseFloat(string);

    inputDom.value = Math.sqrt(number);
  }

  function inputReset() {
    inputDom.value = '';
  }

  function allReset() {
    inputDom.value = '';
    saveDom.innerText = '';
    operator = '';
    prevNumber = '';
  }

  function getReciprocal() {
    const string = inputDom.value;
    const number = parseFloat(string);

    if (number === 0) {
      return;
    }

    inputDom.value = 1/number;
  }

  function arithmeticException() {
    allReset();
    inputDom.value = 'not divisible by zero';
    // eslint-disable-next-line no-throw-literal
    throw 'not divisible by zero';
  }

  function calculatePercentage() {
    const string = inputDom.value;
    const number = parseFloat(string);
  
    if (isNaN(number)) {
      return;
    }
  
    const percentage = number / 100;
    const result = prevNumber * percentage;
  
    inputDom.value = result;
    saveDom.innerText = prevNumber + '*' + number + '%';
  }
};
