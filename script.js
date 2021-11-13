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
class TotalPurchase extends Money{
    constructor(n){
        super(n);
    }
}
class TotalAveragePrice extends Money{
    constructor(n){
        super(n);
    }
}


class PurchaseUnit { //implement Observer
    constructor(unitTable, num) {
        this.unitTable = unitTable;
        this.num = num;
    }

    purchasePrice;
    priceOfCoin;
    averagePrice;
    current
    setPurchasePrice(n){
        this.purchasePrice = n;
    }
    setPriceOfCoin(n){
        this.priceOfCoin = n;
    }
    calculateAveragePrice(){
        this.
    }

    
}
class PurchaseTable {//implement Subject
    constructor() {
        this.totalPurchase = new TotalPurchase(0);
        this.totalAveragePrice = new TotalAveragePrice(0);
        
    }

    purchaseUnits = [];
    currentPurchase;
    currentAveragePrice;


    setCurrentPurchase (n) {
        this.currentPurchase = n;
    }
    setCurrentAvervagePrice (n) {
        this.currentAveragePrice = n;
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
            this.purchaseUnits[i].update(this.currentPurchase,this.currentRevenue);
        }
    }
    

}