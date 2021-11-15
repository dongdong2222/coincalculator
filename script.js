class Suject {
    registObserver(){}
    deleteObserver(){}
    notifyObserver(){}
}
class Observer{
    update(){}
}

class Money {
    constructor(n){
        this.price = n;
    }
    price;
    setPrice(n) {
        this.price = n;
    }
    getPrice() {
        return this.price;
    }

}
class InitialPurchase extends Money{
    constructor(n){
        super(n);
    }
}
class InitialRevenue extends Money{
    constructor(n){
        super(n);
    }
}
class InitialAveragePrice extends Money{
    constructor(n){
        super(n);
    }
}


class PurchaseUnit { //implement Observer
    constructor(unitTable) {
        this.unitTable = unitTable;
        //this.num = num;
        this.create();
    }

    purchasePrice;
    priceOfCoin;
    numofCoin;
    averagePrice;

    setPurchasePrice(n){
        this.purchasePrice = n;
        var input
    }
    setPriceOfCoin(n){
        this.priceOfCoin = n;
        this.numOfCoin = this.purchasePrice/n;
        this.purchasePrice = numOfCoin*n;
    }

    notifyObserver() {
        this.unitTable.update(this.currentPurchase, this.currentAveragePrice);
    }
    calculateAveragePrice(){

        var totalNumOfCoin = (this.currentPurchase/currentAveragePrice) + this.numOfCoin;
        this.currentPurchase += this.purchasePrice;
        this.currentAveragePrice += this.currentPurchase/ totalNumOfCoin;
        this.notifyObserver();
        this.averagePrice = this.currentAveragePrice;
        this.notifyObserver();
    }
    update (purchase, priceOfCoin) {
        this.setPurchasePrice(purchase);
        this.setPriceOfCoin(priceOfCoin);
    }
    create(){
        var parent = document.getElementById("table");
        var addUnit = document.getElementById("add-unit-unit");
        var unit = document.createElement("div");
        var input;
        var lable;
        unit.setAttribute("class", "unit");

        lable = document.createElement("lable");
        input = document.createElement("input");
        lable.setAttribute("for", "purchase");
        lable.innerText = "매수금";
        input.setAttribute("name", "purchase");
        unit.appendChild(lable);
        unit.appendChild(input);
        unit.onchange = this.inputHandler;


        lable = document.createElement("lable");
        input = document.createElement("input");
        lable.setAttribute("for", "priceOfCoin");
        lable.innerText = "코인가격";
        input.setAttribute("name", "priceOfCoin");
        unit.appendChild(lable);
        unit.appendChild(input);

        lable = document.createElement("lable");
        input = document.createElement("p");
        lable.setAttribute("for", "average");
        lable.innerText = "평단가";
        input.setAttribute("name", "average");
        unit.appendChild(lable);
        unit.appendChild(input);
        parent.insertBefore(unit, addUnit);

        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.innerText = "-";
        button.onclick = ()=>{  this.unitTable.deleteObserver(this);
                                unit.remove();
        };
        unit.appendChild(button);
    }
    inputHandler(){
        console.log("")
    }

    
}
class PurchaseTable {//implement Subject
    constructor() {
        this.remoteCalculate = new RemoteCalculate();
    }
    initialPurchase; //초기 매수값
    initialAveragePrice; //초기

    purchaseUnits = [];
    currentPurchase;
    currentAveragePrice;

    totalPurchase;
    totalPriceofCoin;
    createUnit(){
        var unit = new PurchaseUnit(this);
        var command = new CalculateAverageCommand(unit);
        this.remoteCalculate.setCommand(command);
        this.purchaseUnits.push(unit);
    }

    setCurrentPurchase (n) {
        this.currentPurchase = n;
    }
    setCurrentAveragePrice (n) {
        this.currentAveragePrice = n;
    }
    setInitialValue(a, b){
        this.initialPurchase = a;
        this.initialAveragePrice = b;
        this.currentPurchase = this.initialPurchase;
        this.currentAveragePrice = this.initialAveragePrice;
    }
    registerObserver (ob){
        this.purchaseUnits.push(ob);
    }
    deleteObserver(ob){
        var i = this.purchaseUnits.indexOf(ob);
        if(i<0){
            this.purchaseUnits.slice(i,1);
        }
        this.remoteCalculate.deleteCommand(ob);
    }
    notifyObserver(){
        for(var i=0; i<this.purchaseUnits.length;i++){
            this.purchaseUnits.update(purchase, priceOfCoin);
        }
    }
    update (currentPurchase, currentAveragePrice) {
        this.currentPurchase = currentPurchase;
        this.currentAveragePrice = currentAveragePrice;
    }
    

}



class RemoteCalculate {
    slot = [];
    setCommand(c){
        this.slot.push(c);
    }
    deleteCommand(c){
        for(var i=0; i<this.slot.length;i++){
            if(this.slot[i] === c){
                this.slot.slice(i,1);
            }
        }
    }
    calculate(){
        for(var i=0;i<this.slot.length; i++){
            this.slot[i].excute();
        }
    }

}

class CalculateAverageCommand {
    purchaseUnit;
    constructor (unit) {
        this.purchaseUnit = unit;
    }
    execute () {
        this.purchaseUnit.calculate();
    }
}
var set =new PurchaseTable();

