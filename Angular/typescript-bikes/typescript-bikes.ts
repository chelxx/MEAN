class Bike {
    constructor(
        public price: number,
        public max_speed: string,
        public miles?: number,
    ) {
        this.miles = 0;
    }
    
    displayInfo = () => {
        console.log("Price: " + this.price + ", Max Speed: " + this.max_speed + ", Miles: " + this.miles);
        return this;
    }

    ride = () => {
        this.miles += 10;
        console.log("Riding! I rode the bike for " + this.miles + " miles!");
        return this;
    }

    reverse = () => {
        if(this.miles >= 5){
            this.miles -= 5;
            console.log("Reversing! I reversed the bike for 5 miles!");
            return this;
        }
        else {
            console.log("You cannot reverse when you don't have enough miles!");
            return this;
        }
    }
}
let rick = new Bike(2000, "250mph");
let morty = new Bike(1500, "50mph");
let summer = new Bike(5000, "200mph");

rick.ride().ride().ride().reverse().displayInfo();
console.log("*******************************");
morty.ride().ride().reverse().reverse().displayInfo();
console.log("*******************************");
summer.reverse().reverse().reverse().displayInfo();