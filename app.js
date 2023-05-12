window.onload = function() {
  let inputDom = document.getElementById('prompt');
  let buttonDoms = document.querySelectorAll('button');

  let prevNumber = NaN;
  let operator = '';


  // input prompt 이벤트 추가
  inputDom.addEventListener('change', (e) => {
    let string = e.target.value;
    
    string = string.replace(/[^0-9]/g,''); //숫자 체크
    inputDom.value = parseInt(string==Nan ? '' : string);

    console.log(string);
  });

  // 각 버튼마다 이벤트 추가
  buttonDoms.forEach(dom => {
    dom.addEventListener('click', onClickButtonHandler);
  });

  function onClickButtonHandler(e) {
    let string = e.target.innerText;
    console.log(string);
    if (parseInt(string)>=0 && parseInt(string)<=9) {
      inputPrompt(string);
    } else if ("÷×+-".indexOf(string) > -1) {
      saveNumberAndOperator(string);
    } else if (string === "=") {
      displayResult();
    }
  }

  // prompt에 number를 뒤에다 추가하는 함수
  function inputPrompt(number) {
    let input = inputDom.value;

    inputDom.value = parseInt((""+input) + number);
  }

  // prompt에 입력한 숫자랑 연산자를 저장하는 함수
  function saveNumberAndOperator(temp_operator) {
    let num1 = parseInt(prevNumber);
    let num2 = parseInt(inputDom.value);

    if (num1 !== NaN && operator.length > 0) {
      num1 = getAnswer(num1, num2, operator);
    } else {
      num1 = num2;
      operator = temp_operator;
    }

    inputDom.value = '';
    operator = temp_operator;
    prevNumber = num1;

    console.log("prevNumber : " + prevNumber);

  }

  function displayResult() {
    let num1 = parseInt(prevNumber);
    let num2 = parseInt(inputDom.value);
    let temp_operator = operator;

    let answer = getAnswer(num1, num2, temp_operator);

    inputDom.value = answer;
  }

  function getAnswer(num1, num2, oper) {
    switch(oper) {
      case '+' :
        num1 = num1 + num2;
        break;
      case '-' :
        num1 = num1 - num2;
        break;
      case '×' :
        num1 = num1 * num2;
        break;
      case '÷' :
        num1 = num1 / num2;
        break;
    }

    return num1;
  }
} 