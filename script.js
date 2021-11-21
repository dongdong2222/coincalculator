class UnitTable {
    constructor (){
        this.units.push(new InitialUnit(this));
    }
    units = [];
    count = 0;

    Price = {"currentPurchasePrice": 0,
            "currentAverageCoinPrice": 0,
            "numOfCoin": 0
    }
    registUnit(unit){
        this.units.push(unit);
    }
    deleteUnit(unit){
        for(var i=0;i<this.units.length;i++){
            if(this.units[i] == unit){
                this.units.slice(i,1);
            }
        }
    }
    notifyUnit(){
        for(var i=0;i<this.units.length;i++){
            this.Price = this.units[i].updateAverageCoinPrice(this.Price);
        }
    }
    createUnit() {
        console.log(this.count);
        this.count++;
        this.units.push(new PurchaseUnit(this, this.count));
    }
}
class TotalRegulator {
    units =[];

    totalPurchase;
    totalCoinPrice;
    registUnit(unit){
        this.units.push(unit);
    }

    setPurchase(n){
        this.totalPurchase = n;
        this.notifyUnit();
    }
    setCoinPrice(n) {
        this.totalcoinPrice = n;
        this.setPurchase(this.totalpurchase-(this.totalpurchase%this.totalcoinPrice));
    }
    notifyUnit(){
        for(var i=1;i<this.units.length;i++){
            this.Price = this.units[i].updateSetting(this.totalPurchase, this.totalCoinPrice);
        }
    }
}

class Unit {

    updateAverageCoinPrice(){

    }
    updateSetting(){

    }
}

class InitialUnit extends Unit {
    constructor(table){
        super();
        this.unitTable = table; //set 했을때 notifyUnit을 호출하기 위해
    }
    initialPurchasePrice;
    initialAverageCoinPrice;

    setInitialPurchasePrice(n){ //초기 총평가값 입력시 updateAverage 모두 작동하게
        this.initialPurchasePrice = n;
        this.unitTable.notifyUnit();
    }
    setInitialAverageCoinPrice(n){
        this.initialAverageCoinPrice = n;
        this.unitTable.notifyUnit();
    }
    updateAverageCoinPrice(Price){
        var coin = this.initialPurchasePrice/this.initialAverageCoinPrice;
        return { "currentPurchasePrice": this.initialPurchasePrice,
                 "currentAverageCoinPrice": this.initialAverageCoinPrice,
                 "numOfCoin" : coin};
    }

}

class PurchaseUnit extends Unit {
    constructor (table, number) {
        super();
        this.unitTable = table;
        this.number = number;
        this.create();
    }

    purchasePrice;
    coinPrice = 1;
    numOfCoin;

    setPurchasePrice(n) {
        this.purchasePrice = n;
        this.numOfCoin = Math.floor(this.purchasePrice/this.coinPrice);
        this.unitTable.notifyUnit();
    }
    setCoinPrice(n) {
        this.coinPrice = n;
        this.setPurchasePrice(this.purchasePrice-(this.purchasePrice%this.coinPrice));
    }

    updateAverageCoinPrice(Price){
        var totalPurchase = Price.currentPurchasePrice + this.purchasePrice;
        var coin = Price.numOfCoin + this.numOfCoin;
        var totalAverageCoinPrice = totalPurchase/coin;
        //평단가 화면 업데이트
        console.log("update:");
        console.log(totalPurchase);
        var p = document.getElementById("average-coin-price-"+this.number);
        p.innerText = ""+totalAverageCoinPrice;
        return { "currentPurchasePrice": totalPurchase,
                 "currentAverageCoinPrice": totalAverageCoinPrice,
                 "numOfCoin" : coin};

    }
    updateSetting(purchase, coinPrice) {
        this.setPurchasePrice(purchase);
        this.setCoinPrice(coinPrice);
    }

    create(){
        console.log("create:"+this.number);
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
        input.setAttribute("type", "number");
        input.setAttribute("name", "purchase");
        input.setAttribute("id", "purchase-price-"+this.number);
        unit.appendChild(lable);
        unit.appendChild(input);
        unit.addEventListener("change", this.inputHandler.bind(this));


        lable = document.createElement("lable");
        input = document.createElement("input");
        lable.setAttribute("for", "priceOfCoin");
        lable.innerText = "코인가격";
        input.setAttribute("type", "number");
        input.setAttribute("name", "priceOfCoin");

        input.setAttribute("id", "price-of-coin-"+this.number);
        unit.appendChild(lable);
        unit.appendChild(input);

        lable = document.createElement("lable");
        input = document.createElement("p");
        lable.setAttribute("for", "average");
        lable.innerText = "평단가";
        input.setAttribute("name", "average");
        input.innerText = 0;
        input.setAttribute("id", "average-coin-price-"+this.number);
        unit.appendChild(lable);
        unit.appendChild(input);
        parent.insertBefore(unit, addUnit);

        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.innerText = "-";
        button.onclick = ()=>{  this.unitTable.deleteUnit(this); //손보기
                                unit.remove();
        };
        unit.appendChild(button);
    }
    inputHandler(){
        var element1 = document.getElementById("purchase-price-"+this.number);
        console.log(this.id);
        console.log(this);
        var element2 = document.getElementById("price-of-coin-"+this.number);
        console.log(typeof Number(element1.value));
        this.setPurchasePrice(Number(element1.value*1));
        this.setCoinPrice(Number(element2.value*1));
    }
    
}
var set = new UnitTable();