let accountBalance = 1000.00;
let cashBalance = 1000.00;

const ACC_BALANCE_INPUT_ID = "current-balance";
const CASH_BALANCE_INPUT_ID = "current-cash";
const LOG_AREA_ID = "log";

let transactionCount = 1;

function writeLog(text) {
    const log = document.getElementById(LOG_AREA_ID);

    const newLogEntry = `${transactionCount}, ${text}\n`; 

    log.value = newLogEntry + log.value;
    transactionCount++;
}

function balanceUpdate(isInitial = false) {

    const accInput = document.getElementById(ACC_BALANCE_INPUT_ID);
    const cashInput = document.getElementById(CASH_BALANCE_INPUT_ID);

    accInput.value = accountBalance.toFixed(2);
    cashInput.value = cashBalance.toFixed(2);

    if (!isInitial) {
        writeLog(`Current account balance: ${accountBalance.toFixed(2)}, Current cash balance: ${cashBalance.toFixed(2)}`);
    }
}

function action() {
    const actionType = document.getElementById("operation").value;
    const amountInput = document.getElementById("Amount");
    let amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        writeLog("Invalid amount. Please enter a positive number.");
        return;
    }

    if (actionType === "Deposit") {
  
        if (amount > cashBalance) {
            writeLog("Couldn't deposit entered balance. (Insufficient cash balance)");
            return;
        }

        accountBalance += amount;
        cashBalance -= amount;

    } else if (actionType === "Withdraw") {

        if (amount > accountBalance) {
            writeLog("Couldn't withdraw entered balance. (Insufficient account balance)");
            return;
        }

        accountBalance -= amount;
        cashBalance += amount;
    }

    amountInput.value = '';

    balanceUpdate();
}

balanceUpdate(true);
writeLog("Initial Balances Set.");