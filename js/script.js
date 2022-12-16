const previousOperationText = document.querySelector("#previous-operation");
const currectOperationText = document.querySelector("#currect-operations");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator{
    constructor(previousOperationText, currectOperationText){
        this.previousOperationText = previousOperationText;
        this.currectOperationText = currectOperationText;
        this.currectOperation = "";
    }

    //add digit
    addDigit(digit){
        // check is currect operation
        if (digit === "." && this.currectOperationText.innerText.includes(".")) {
            return;
        }

        this.currectOperation = digit
        this.updateScreen()
    }


    //Process all calculator
    processOperation(operation){
        //Check if currect is empty
        if(this.currectOperationText.innerText === "" && operation !== "C"){
            //Change operation
            if(this.previousOperationText.innerText !== ""){ 
                this.changeOperation(operation);
            }
            return;
        }
        
        //Get currect and previous value
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currectOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)   
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)   
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)   
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)   
                break;
            case "DEL":
                this.processDelOperation(); 
                break;
            case "CE":
                this.processClearCurrentOperation(); 
                break;
            case "C":
                this.processClearOperation(); 
                break;
            case "=":
                this.processEqualOperation(); 
                break;                                     
            default:
             return;   
        }
    }

    //Change values of the calculator
    updateScreen(
        operationValue = null, 
        operation = null,
        current = null,
        previous = null
    ){
        if(operationValue == null){
            this.currectOperationText.innerText += this.currectOperation;
        }else{
            // Check if value is zero
            if(previous === 0){
                operationValue = current
            }

            //Add currect
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currectOperationText.innerText = "";
        }
    }

    //Change math operation
    changeOperation(operation){

        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return           
        }

        this.previousOperationText.innerText = previousOperationText.innerText.slice(0,-1) + operation;
    }

    //Delete digit    
    processDelOperation(){
        this.currectOperationText.innerText = this.currectOperationText.innerText.slice(0, -1);
    }

    //Clear currect digit
    processClearCurrentOperation(){
        this.currectOperationText.innerText = "";
    }

    //Clear All operation
    processClearOperation(){
        this.currectOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Precess = Operation
    processEqualOperation(){

        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currectOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;

        if (+value >=0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})

