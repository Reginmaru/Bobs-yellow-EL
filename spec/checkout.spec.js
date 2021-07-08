const Basket = require('../src/basket');
const Checkout = require('../src/checkout');
const Item = require('../src/item');

let userBasket, item1, item2, item3, item4, item5, item6, item7, item8, checkout, deal1, deal2;

describe('Testing checkout class total', () => {
    it('basket.total sums the price of items', () => {
        userBasket = new Basket(3);
        item1 = new Item('BGLP', 0.39);
        item2 = new Item('BGLP', 0.39);
        item3 = new Item('BGLP', 0.39);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        userBasket.addItem(item3);
        checkout = new Checkout(userBasket);
        expect(checkout.total()).toEqual(1.17);
    })
})

describe('Checking deals and changing them for summary', () => {
    it('Adding 1 deal, checking that total is correct', () => {
        userBasket = new Basket();
        deal1 = new Item('DLOB', 2.49);
        item1 = new Item('BGLP', 0.39);
        userBasket.addItem(deal1);
        userBasket.addItem(item1);
        checkout = new Checkout(userBasket);
        expect(checkout.total()).toEqual(2.88)
    })
    
    it('Adding a deal and same bagel type, checking that total is correct (i.e 9 onion bagels)', () => {
        userBasket = new Basket(5);
        deal1 = new Item('DLOB', 2.49);
        item1 = new Item('BGLO', 0.49);
        item2 = new Item('BGLO', 0.49);
        item3 = new Item('BGLO', 0.49);
        userBasket.addItem(deal1)
        userBasket.addItem(item3)
        userBasket.addItem(item2)
        userBasket.addItem(item1)
        checkout = new Checkout(userBasket);
        expect(checkout.total()).toEqual(3.96)
    })

    it('Example order 1', () => {
        userBasket = new Basket(10);
        deal1 = new Item('DLPB', 3.99);
        deal2 = new Item('DLEB', 2.49);
        item1 = new Item('BGLO', 0.49);
        item2 = new Item('BGLO', 0.49);
        item3 = new Item('COF', 0.99);
        item4 = new Item('COF', 0.99);
        item5 = new Item('COF', 0.99);
        userBasket.addItem(deal1);
        userBasket.addItem(deal2);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        userBasket.addItem(item3);
        userBasket.addItem(item4);
        userBasket.addItem(item5);
        checkout = new Checkout(userBasket);
        expect(checkout.total()).toEqual(10.43);
    })

    it('Example order 2', () => {
        userBasket = new Basket(10);
        deal1 = new Item('DLPB', 3.99);
        item1 = new Item('BGLP', 0.39);
        item2 = new Item('BGLP', 0.39);
        item3 = new Item('BGLP', 0.39);
        item4 = new Item('BGLP', 0.39);
        userBasket.addItem(deal1);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        userBasket.addItem(item3);
        userBasket.addItem(item4);
        checkout = new Checkout(userBasket);
        expect(checkout.total()).toEqual(5.55);
    })

    it('Adding 6 onion bagels and recognising a deal', () => {
        userBasket = new Basket(6);
        item1 = new Item('BGLO', 0.49);
        item2 = new Item('BGLO', 0.49);
        item3 = new Item('BGLO', 0.49);
        item4 = new Item('BGLO', 0.49);
        item5 = new Item('BGLO', 0.49);
        item6 = new Item('BGLO', 0.49);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        userBasket.addItem(item3);
        userBasket.addItem(item4);
        userBasket.addItem(item5);
        userBasket.addItem(item6);
        checkout = new Checkout(userBasket);
        expect(checkout.total()).toEqual(2.49);
    })

    it('Adding 8 onion bagels and recognising a deal', () => {
        userBasket = new Basket(100);
        item1 = new Item('BGLO', 0.49);
        item2 = new Item('BGLO', 0.49);
        item3 = new Item('BGLO', 0.49);
        item4 = new Item('BGLO', 0.49);
        item5 = new Item('BGLO', 0.49);
        item6 = new Item('BGLO', 0.49);
        item7 = new Item('BGLO', 0.49);
        item8 = new Item('BGLO', 0.49);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        userBasket.addItem(item3);
        userBasket.addItem(item4);
        userBasket.addItem(item5);
        userBasket.addItem(item6);
        userBasket.addItem(item7);
        userBasket.addItem(item8);
        checkout = new Checkout(userBasket);
        expect(checkout.total()).toEqual(3.47);
    })
})

fdescribe('testing that the recipt prints correctly', () => {
    it('first example of a recipt', () => {
        userBasket = new Basket(10);
        deal1 = new Item('DLPB', 3.99);
        deal2 = new Item('DLEB', 2.49);
        item1 = new Item('BGLO', 0.49);
        item2 = new Item('BGLO', 0.49);
        item3 = new Item('COF', 0.99);
        item4 = new Item('COF', 0.99);
        item5 = new Item('COF', 0.99);
        userBasket.addItem(deal1);
        userBasket.addItem(deal2);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        userBasket.addItem(item3);
        userBasket.addItem(item4);
        userBasket.addItem(item5);
        checkout = new Checkout(userBasket);
        
        let output =(`~~~ bobs bagels ~~~  
     
        2021 - 03 - 16 21: 38: 44 

         ----------------------------- 
      onion bagel     2       0.98
      Plain bagel     12      3.99
                            (-£0.69)
      Everything bagel        6       2.49
                            (-£0.45)
      Coffee                  3       2.97
    ----------------------------- 
    Total               10.43
        You saved a total of £1.14
            on this shop
    Thank you 
    for your order!   `)
        expect(checkout.printstatement()).toEqual(output);
    })
})