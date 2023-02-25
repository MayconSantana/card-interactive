// Select Elements
const inputs = document.querySelectorAll('input');

const btnConfirm = document.querySelector('#confirm'),
btnContinue = document.querySelector('#continue'),
completedDiv = document.querySelector('#completed'),
formDiv = document.querySelector('#form'),
errorMessageName = document.querySelector('#error-message-name'),
errorMessageNumber = document.querySelector('#error-message-number'),
errorMessageMM = document.querySelector('#error-message-mm'),
errorMessageYY = document.querySelector('#error-message-yy'),
errorMessageCVC = document.querySelector('#error-message-cvc');

const nameInput = document.querySelector('#name-input'),
numberInput = document.querySelector('#number-input'),
mmInput = document.querySelector('#MM-input'),
yyInput = document.querySelector('#YY-input'),
cvcInput = document.querySelector('#cvc-input');

const numberCard = document.querySelector('#number-card'),
nameCard = document.querySelector('#name-card'),
mmCard = document.querySelector('#mm-card'),
yyCard = document.querySelector('#yy-card'),
CVCcard = document.querySelector('#cvc-card');

const arrayInputs = [mmInput, yyInput, cvcInput];

// Functions
const changeScreen = () => {
    completedDiv.classList.toggle('none');
    formDiv.classList.toggle('none');
}

const onlyNumbers = (text) => {
    return text.replace(/[^0-9\s]/g, "");
}

const emptyInput = (value, span) => {
    if (value === '') {
        span.innerHTML = "Invalid Input!";
    } else {
        span.innerHTML = "";
    }
}

const validOthersInputs = (input, limit, errorMessage, message) => {
    if (input.value.length < limit) {
        errorMessage.innerHTML = message;
        return;
    } else {
        errorMessage.innerHTML = "";
        return;
    }
}

const cleanInputs = () => {
    nameInput.value = ""
    numberInput.value = ""
    mmInput.value = ""
    yyInput.value = ""
    cvcInput.value = ""

}

const addReplace = (card, valueInput) => {
    card.innerHTML = valueInput.value
}


// Events
btnConfirm.addEventListener("click", (e) => {
    e.preventDefault();

    let inputVazio = false;

    for (let i of inputs) {
        if (i.value.trim() === '') {
          inputVazio = true;
          break;
        }
    }

     
    if (inputVazio) {
        emptyInput(nameInput.value, errorMessageName)
        emptyInput(numberInput.value, errorMessageNumber)
        emptyInput(mmInput.value, errorMessageMM)
        emptyInput(yyInput.value, errorMessageYY)
        emptyInput(cvcInput.value, errorMessageCVC)
        return;
    }

    if (inputs[1].value !== '' && inputs[1].value.length < 19) {
        console.log("number")
        validOthersInputs(numberInput, 19, errorMessageNumber, "Invalid Number!")
        return;
    }

    if (inputs[2].value !== '' && inputs[2].value.length < 2) {
        console.log("mm")
        validOthersInputs(mmInput, 2, errorMessageMM, "Invalid MM!")
        return;
    }

    if (inputs[3].value !== '' && inputs[3].value.length < 2) {
        console.log("yy")
        validOthersInputs(yyInput, 2, errorMessageYY, "Invalid YY!")
        return;
    }

    if (inputs[4].value.length > 0 && inputs[4].value.length < 3) {
        console.log("cvc")
        validOthersInputs(cvcInput, 3, errorMessageCVC, "Invalid CVC!")
        return;
    }

    changeScreen();
})

btnContinue.addEventListener("click", () => {
    changeScreen();
    cleanInputs();
    window.location.reload(true);
})

numberInput.addEventListener("input", (e) => {
    e.target.value = onlyNumbers(numberInput.value)

    if (e.target.value.length === 4 || e.target.value.length === 9 || e.target.value.length === 14) {
        e.target.value += " ";
    }
    
    addReplace(numberCard, e.target);
})

nameInput.addEventListener("input", () => {
    addReplace(nameCard, nameInput)
})

mmInput.addEventListener("input", () => {
    addReplace(mmCard, mmInput)
})

yyInput.addEventListener("input", () => {
    addReplace(yyCard, yyInput)
})

cvcInput.addEventListener("input", () => {
    addReplace(CVCcard, cvcInput)
})

arrayInputs.forEach((input) => {
    input.addEventListener("input", () => {
        let valor = input.value;
        input.value = onlyNumbers(valor);
    })
})