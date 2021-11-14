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
    currentPurchase;
    currentAveragePrice;

    setPurchasePrice(n){
        this.purchasePrice = n;
    }
    setPriceOfCoin(n){
        this.priceOfCoin = n;
        this.numOfCoin = this.purchasePrice/n;
        this.purchasePrice = numOfCoin*n;
    }
    update (currentPurchase, currentAveragePrice) {
        this.currentPurchase = currentPurchase;
        this.currentPriceOfCoin = currentAveragePrice;

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
    }
    create(){
        var parent = document.getElementById("table");
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
        unit.addEventListener("input",this.inputHandler);


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
        parent.appendChild(unit);
    }
    inputHandler(){
        console.log("ww");
    }

    
}
class PurchaseTable {//implement Subject
    constructor() {
        this.initialPurchase = new InitialPurchase(0);
        this.initialAveragePrice = new InitialAveragePrice(0);
        this.initialRevenue = new InitialRevenue(0);
        
    }
    //총매수금 총수익 현재 평단가
    purchaseUnits = [];
    currentPurchase;
    currentAveragePrice;

    createUnit(){
        var unit = new PurchaseUnit(this);
        this.purchaseUnits.push(unit);
    }

    setCurrentPurchase (n) {
        this.currentPurchase = n;
    }
    setCurrentAveragePrice (n) {
        this.currentAveragePrice = n;
    }
    setInitialValue(a, b, c){
        this.initialPurchase.setPrice(a);
        this.initialRevenue.setPrice(b);
        this.initialAveragePrice.setPrice(c);
        this.currentPurchase = this.initialPurchase.getPrice();
        this.currentAveragePrice = this.initialAveragePrice.getPrice();
    }
    registerObserver (ob){
        this.purchaseUnits.push(ob);
    }
    deleteObserver(ob){
        var i = this.purchaseUnits.indexOf(ob);
        if(i<0){
            this.purchaseUnits.slice(i,1);
        }
    }
    notifyObserver(){
        for(var i=0;i<this.purchaseUnits.length;i++){
            this.purchaseUnits[i].update(this.currentPurchase, this.currentAveragePrice);
        }
    }
    update (currentPurchase, currentAveragePrice) {
        this.currentPurchase = currentPurchase;
        this.currentAveragePrice = currentAveragePrice;
    }
    

}


class Invock {
    slot = [];
    setCommand(c){
        this.slot.push(c);
    }
    pressed(){
        for(var i=0;i<this.slot.length; i++){
            this.slot[i].excute();
        }
    }

}
var set =new PurchaseTable();
set.createUnit();
