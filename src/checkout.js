const bobsmenu = require('./bobsPrices');



class Checkout {
    constructor(basket, prices = bobsmenu) {
        this._basket = basket;
        this._prices = prices;
    }

    total() {
        let dealsObject = this.findDeals();
        let arrayDeals = Object.entries(dealsObject);
        let subtotal = 0;
        for(let i = 0; i < arrayDeals.length; i++) {
            subtotal += this._prices[arrayDeals[i][0]].Price * arrayDeals[i][1];
            
        }

        return Math.round(subtotal * 100) / 100;
    }

    findDeals() {
        let amountObject = {
            'BGLO': 0,
            'BGLP': 0,
            'BGLE': 0,
            'DLOB': 0,
            'DLPB': 0,
            'DLEB': 0,
            'DCOF': 0,
            'COF': 0
        }
        this._basket.items.forEach(item => {
            amountObject[item.id] ++;
        });
        while(amountObject['BGLO'] >= 6) {
            amountObject['BGLO'] -= 6;
            amountObject['DLOB'] ++;
        }
        while(amountObject['BGLP'] >= 12) {
            amountObject['BGLP'] -= 12;
            amountObject['DLPB'] ++;
        }
        while(amountObject['BGLE'] >= 6) {
            amountObject['BGLE'] -= 6;
            amountObject['DLEB'] ++;
        }
        while(amountObject['BGLP'] > 0 && amountObject['COF'] > 0) {
            amountObject['BGLP'] --;
            amountObject['COF'] --;
            amountObject['DCOF'] ++
        }
        return amountObject;
    }    

    printstatement() {
        
        let final = '~~~ bobs bagels ~~~  \n \n \
              2021 - 03 - 16 21: 38: 44 \n \n \
               ----------------------------- \n'

        let newBasket = this.findDeals();

        let totalCost = 0;
        let dAmount = 0;
        let totaldAmount = 0;

        for (let object in newBasket) {
            if (newBasket[object] != 0){
                let cost = Number((newBasket[object] * bobsmenu[object].basePrice).toFixed(2));
                totalCost += cost;
               
                final += `\t \t ${bobsmenu[object].Name} \t ${newBasket[object] * bobsmenu[object].amount} \t  ${Number(cost.toFixed(2) - bobsmenu[object].discount).toFixed(2)}\n `;

                if(object[0] === 'D') {
                    
                    dAmount = Number((newBasket[object] * bobsmenu[object].discount).toFixed(2));
                    totaldAmount += dAmount;
                    final += `\t\t\t\t\t(-£${dAmount})\n`;
                }
            }
        }

        final += `\t   ----------------------------- \n`

       


        totalCost = Number((totalCost - totaldAmount).toFixed(2))
        final += ` \t Total\t\t      \t${totalCost}\n \
        \n \
        Thank you \n \
        for your order!`

        if (totaldAmount != 0) {
            final +=`You have saved ${totaldAmount}\n`
        }
        return final;
        
    }
}

module.exports = Checkout;