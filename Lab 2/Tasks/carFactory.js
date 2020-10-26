function solve(input) {
    let {model, power, color, carriage, wheelsize} = input;

    let car = {model};
    
    let volume;
    if (power <= 90) {
        power = 90;
        volume = 1800;
    } else if (power <= 120) {
        power = 120;
        volume = 2400;
    } else {
        power = 200;
        volume = 3500;
    };

    car.engine = {
        power, 
        volume
    }

    car.carriage = {
        type: carriage, 
        color
    }

    car.wheels = [];

    if (wheelsize % 2 === 0) {
        wheelsize--;
    }

    let counter = 4;
    while(counter-- !== 0) {
        car.wheels.push(wheelsize); 
    }

    return car;
}

console.log(solve( 
    { model: 'Opel Vectra',
  power: 110,
  color: 'grey',
  carriage: 'coupe',
  wheelsize: 17 }

));