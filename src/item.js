class Item {
    constructor(id, price) {
        this._id = id;
        this._price = price;
    }

    get id() {
        return this._id;
    }

    get price() {
        return this._price;
    }
}

module.exports = Item;