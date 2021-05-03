class Product {
    constructor (
        id,
        userId,
        name, 
        imageURL,
        description,
        price,
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }
}

export default Product;