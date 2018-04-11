var Bike = /** @class */ (function () {
    function Bike(price, max_speed, miles) {
        var _this = this;
        this.price = price;
        this.max_speed = max_speed;
        this.miles = miles;
        this.displayInfo = function () {
            console.log("Price: " + _this.price + ", Max Speed: " + _this.max_speed + ", Miles: " + _this.miles);
            return _this;
        };
        this.ride = function () {
            _this.miles += 10;
            console.log("Riding! I rode the bike for " + _this.miles + " miles!");
            return _this;
        };
        this.reverse = function () {
            if (_this.miles >= 5) {
                _this.miles -= 5;
                console.log("Reversing! I reversed the bike for 5 miles!");
                return _this;
            }
            else {
                console.log("You cannot reverse when you don't have enough miles!");
                return _this;
            }
        };
        this.miles = 0;
    }
    return Bike;
}());
var rick = new Bike(2000, "250mph");
var morty = new Bike(1500, "50mph");
var summer = new Bike(5000, "200mph");
rick.ride().ride().ride().reverse().displayInfo();
console.log("*******************************");
morty.ride().ride().reverse().reverse().displayInfo();
console.log("*******************************");
summer.reverse().reverse().reverse().displayInfo();
