'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const billInput = document.getElementById('bill');
    const customTipInput = document.getElementById('custom');
    const peopleInput = document.getElementById('noOfPeople');
    const tipButtons = document.querySelectorAll('.tips--number');
    const tipAmountPerPerson = document.querySelector('.tip');
    const totalAmountPerPerson = document.querySelector('.total');
    const resetButton = document.querySelector('.reset');

    let billValue;
    let tipValue;
    let peopleValue;

    billValue = 0;
    tipValue = 0;
    peopleValue = 1;

    function updateDisplay(tipAmount, totalAmount) {
        tipAmountPerPerson.innerText = `$${tipAmount.toFixed(2)}`;
        totalAmountPerPerson.innerText = `$${totalAmount.toFixed(2)}`;
    }

    function calculateTip() {
        if (peopleValue >= 1) {
            const tipAmount = (billValue * tipValue);
            const totalAmount = ((billValue * tipValue) * peopleValue);
            updateDisplay(tipAmount, totalAmount);
        }
    }

    billInput.addEventListener('input', function () {
        billValue = Number(parseFloat(billInput.value));
        if (isNaN(billValue)) {
            billValue = 0;
        }
        calculateTip();
    });

    customTipInput.addEventListener('input', function () {
        tipValue = Number(parseFloat(customTipInput.value) / 100);
        if (isNaN(tipValue)) {
            tipValue = 0;
        }
        tipButtons.forEach(btn => btn.classList.remove('active-tip'));
        calculateTip();
    });

    tipButtons.forEach(button => {
        button.addEventListener('click', function () {
            tipButtons.forEach(btn => btn.classList.remove('active-tip'));
            button.classList.add('active-tip');
            tipValue = Number(parseFloat(button.innerText) / 100);
            customTipInput.value = '';
            calculateTip();
        });
    });

    peopleInput.addEventListener('input', function () {
        peopleValue = Number(parseFloat(peopleInput.value));
        if (isNaN(peopleValue) || peopleValue < 1) {
            peopleValue = 1;
        }
        calculateTip();
    });

    resetButton.addEventListener('click', function () {
        billInput.value = '';
        customTipInput.value = '';
        peopleInput.value = '';
        tipButtons.forEach(btn => btn.classList.remove('active-tip'));
        tipAmountPerPerson.innerText = '$0.00';
        totalAmountPerPerson.innerText = '$0.00';
        billValue = 0;
        tipValue = 0;
        peopleValue = 1;
    });
});
