
class Product {
    constructor(name) {
        this.name = name;
    }
    init() {}
}

class Creator {
    create(name) {
        return new Product(name);
    }
}

const creator = new Creator();
const p = creator.create('beer');