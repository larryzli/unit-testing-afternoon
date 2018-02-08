const cart = require("./cart");
const cars = require("./data/cars");

describe("Cart Properties:", () => {
    // TEST INITIAL CART
    test("Initial cart property on cart is empty array", () => {
        expect(Array.isArray(cart.cart)).toBe(true);
        expect(cart.cart.length).toBe(0);
    });
    // TEST INITAL TOTAL
    test("Initial total property on car is integer 0", () => {
        expect(Number.isInteger(cart.total)).toBe(true);
        expect(cart.total).toBe(0);
    });
});

describe("Cart Methods:", () => {
    // AFTER EACH TEST RESET CART ARRAY AND TOTAL
    afterEach(() => {
        cart.cart = [];
        cart.total = 0;
    });

    // TEST ADD TO CART METHOD
    test("addToCart method add 1 car", () => {
        // ADD SINGLE CAR
        cart.addToCart(cars[0]);
        // TEST LENGTH AND OBJECT
        expect(cart.cart.length).toBe(1);
        expect(cart.cart[0]).toBe(cars[0]);
    });
    test("addToCart method add 2 cars", () => {
        // ADD 2 CARS
        cart.addToCart(cars[2]);
        cart.addToCart(cars[3]);
        // TEST LENGTH AND OBJECT
        expect(cart.cart.length).toBe(2);
        expect(cart.cart[0]).toBe(cars[2]);
        expect(cart.cart[1]).toBe(cars[3]);
    });
    test("addToCart method should increase price accordingly", () => {
        // ADD 3 CARS
        cart.addToCart(cars[1]);
        cart.addToCart(cars[4]);
        cart.addToCart(cars[5]);
        // TEST TOTAL
        expect(cart.total).toBe(cars[1].price + cars[4].price + cars[5].price);
    });

    // TEST REMOVE FROM CART
    test("removeFromCart method remove 1 car", () => {
        // ADD 4 CARS
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[5]);
        cart.addToCart(cars[8]);
        // REMOVE 1ST CAR
        cart.removeFromCart(0, cars[0].price);
        // TEST LENGTH AND OBJECTS
        expect(cart.cart.length).toBe(3);
        expect(cart.cart).toEqual([cars[1], cars[5], cars[8]]);
    });
    test("removeFromCart method remove 2 car", () => {
        // ADD 5 CARS
        cart.addToCart(cars[14]);
        cart.addToCart(cars[7]);
        cart.addToCart(cars[11]);
        cart.addToCart(cars[9]);
        cart.addToCart(cars[16]);
        // REMOVE 3RD CAR
        cart.removeFromCart(2, cars[11].price);
        expect(cart.cart.length).toBe(4);
        // TEST LENGTH AND OBJECTS
        cart.removeFromCart(1, cars[7].price);
        expect(cart.cart.length).toBe(3);
        expect(cart.cart).toEqual([cars[14], cars[9], cars[16]]);
    });
    test("removeFromCart method should decrease price accordingly", () => {
        // ADD 3 CARS
        cart.addToCart(cars[1]);
        cart.addToCart(cars[5]);
        cart.addToCart(cars[0]);
        // REMOVE 2ND CAR
        cart.removeFromCart(1, cars[5].price);
        // TEST TOTAL
        expect(cart.total).toBe(cars[1].price + cars[0].price);
    });

    // TEST CHECKOUT
    test("checkout method should reset cart to initial total and reset empty array", () => {
        // BUILD SAMPLE CART
        cart.addToCart(cars[2]);
        cart.addToCart(cars[7]);
        cart.addToCart(cars[6]);
        cart.removeFromCart(0, cars[2].price);
        cart.addToCart(cars[4]);
        // CART CHECKOUT
        cart.checkout();
        // TEST TOTAL = 0 AND CART ARRAY IS EMPTY
        expect(cart.cart.length).toBe(0);
        expect(cart.total).toBe(0);
    });
});
