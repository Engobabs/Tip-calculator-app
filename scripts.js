'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const billInput = document.getElementById('bill');
    const customTipInput = document.getElementById('custom');
    const peopleInput = document.getElementById('noOfPeople');
    const tipButtons = document.querySelectorAll('.tips--number');
    const mainPage = document.getElementById('main');
    const tipAmountPerPerson = document.querySelector('.tip');
    const totalAmountPerPerson = document.querySelector('.total');
    const resetButton = document.querySelector('.reset');

    let billValue = 0;
    let tipValue = 0;
    let peopleValue = 1;
    let isBillTouched = false;
    let isPeopleTouched = false;

    // Allow only numbers in input
    function enforceNumericInput(inputElement) {
        inputElement.addEventListener('input', () => {
            const cleaned = inputElement.value.replace(/[^0-9.]/g, '');
            if (inputElement.value !== cleaned) {
                inputElement.value = cleaned;
            }
        });
    }

    enforceNumericInput(billInput);
    enforceNumericInput(customTipInput);
    enforceNumericInput(peopleInput);

    // SVG Generator
    function createDollarSVG() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "11");
        svg.setAttribute("height", "17");
        svg.setAttribute("viewBox", "0 0 11 17");
        svg.style.verticalAlign = "middle";
        svg.style.marginRight = "4px";

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", "hsl(172, 67%, 45%)");
        path.setAttribute("d", "M6.016 16.328v-1.464c1.232-.08 2.22-.444 2.964-1.092.744-.648 1.116-1.508 1.116-2.58v-.144c0-.992-.348-1.772-1.044-2.34-.696-.568-1.708-.932-3.036-1.092V4.184c.56.144 1.012.4 1.356.768.344.368.516.816.516 1.344v.288h1.824v-.432c0-.448-.088-.876-.264-1.284a3.783 3.783 0 00-.744-1.116A4.251 4.251 0 007.54 2.9a5.324 5.324 0 00-1.524-.492V.872H4.288V2.36a5.532 5.532 0 00-1.416.324c-.448.168-.84.392-1.176.672-.336.28-.604.616-.804 1.008-.2.392-.3.844-.3 1.356v.144c0 .96.316 1.708.948 2.244.632.536 1.548.884 2.748 1.044v3.912c-.704-.16-1.248-.472-1.632-.936-.384-.464-.576-1.08-.576-1.848v-.288H.256v.576c0 .464.08.924.24 1.38.16.456.404.88.732 1.272.328.392.744.728 1.248 1.008s1.108.476 1.812.588v1.512h1.728zM4.288 7.424c-.688-.128-1.164-.332-1.428-.612-.264-.28-.396-.644-.396-1.092 0-.464.176-.832.528-1.104.352-.272.784-.448 1.296-.528v3.336zm1.728 5.712V9.344c.768.128 1.328.328 1.68.6.352.272.528.688.528 1.248 0 .544-.196.984-.588 1.32-.392.336-.932.544-1.62.624z");

        svg.appendChild(path);
        return svg;
    }

    function updateDisplay(tipAmount = '0.00', totalAmount = '0.00') {
        tipAmountPerPerson.innerHTML = '';
        totalAmountPerPerson.innerHTML = '';

        const dollarSVG = createDollarSVG();

        tipAmountPerPerson.appendChild(dollarSVG.cloneNode(true));
        tipAmountPerPerson.appendChild(document.createTextNode(tipAmount));

        totalAmountPerPerson.appendChild(dollarSVG.cloneNode(true));
        totalAmountPerPerson.appendChild(document.createTextNode(totalAmount));
    }

    function validateInputs(inputType) {
        const inputElement = inputType === 'bill' ? billInput : peopleInput;
        const errorElement = inputType === 'bill' ? document.querySelector('.error1') : document.querySelector('.error2');

        if (inputType === 'bill') isBillTouched = true;
        else isPeopleTouched = true;

        const value = inputElement.value.trim();
        const isEmpty = value === '';
        const isZero = parseFloat(value) === 0;

        if (isEmpty) {
            errorElement.classList.add('hide-error');
            inputElement.classList.remove('invalid-input');
        } else {
            errorElement.classList.toggle('hide-error', !isZero);
            inputElement.classList.toggle('invalid-input', isZero);
        }
    }

    function calculateValues() {
        if (billValue > 0 && tipValue >= 0 && peopleValue > 0) {
            const totalTip = billValue * tipValue;
            const tipPerPerson = totalTip / peopleValue;
            const totalPerPerson = (billValue + totalTip) / peopleValue;

            updateDisplay(tipPerPerson.toFixed(2), totalPerPerson.toFixed(2));
        } else {
            updateDisplay();
        }
    }

    // Input Events
    billInput.addEventListener('input', function () {
        billValue = parseFloat(this.value) || 0;
        validateInputs('bill');
        if (isPeopleTouched) calculateValues();
    });

    peopleInput.addEventListener('input', function () {
        peopleValue = parseFloat(this.value) || 0;
        validateInputs('people');
        if (isBillTouched) calculateValues();
    });

    customTipInput.addEventListener('input', function () {
        tipValue = parseFloat(this.value) / 100 || 0;
        tipButtons.forEach(btn => btn.classList.remove('active-tip'));
        calculateValues();
    });

    tipButtons.forEach(button => {
        button.addEventListener('click', function () {
            tipButtons.forEach(btn => btn.classList.remove('active-tip'));
            this.classList.add('active-tip');
            tipValue = parseFloat(this.textContent) / 100;
            customTipInput.value = '';
            calculateValues();
        });
    });

    billInput.addEventListener('blur', () => validateInputs('bill'));
    peopleInput.addEventListener('blur', () => validateInputs('people'));

    resetButton.addEventListener('click', function () {
        billInput.value = '';
        customTipInput.value = '';
        peopleInput.value = '';
        tipButtons.forEach(btn => btn.classList.remove('active-tip'));

        billInput.classList.remove('invalid-input');
        peopleInput.classList.remove('invalid-input');

        billValue = 0;
        tipValue = 0;
        peopleValue = 1;
        isBillTouched = false;
        isPeopleTouched = false;

        updateDisplay();
    });

    // Initialize
    updateDisplay();

    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';

});
