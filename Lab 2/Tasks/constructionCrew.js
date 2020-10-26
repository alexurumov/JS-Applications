function solve(input) {

    let {weight, experience, levelOfHydrated, dizziness} = input;

    if (dizziness) {
        input.levelOfHydrated += weight * experience * 0.1;
        input.dizziness = false;
    }

    return input;
}

console.log(solve(
    { weight: 95,
        experience: 3,
        levelOfHydrated: 0,
        dizziness: false }
      
      
));