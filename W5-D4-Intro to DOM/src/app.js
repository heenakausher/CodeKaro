
let height = document.getElementById('Height')
let heightunit = document.getElementById('HeightUnit')
let weight =  document.getElementById('Weight')
let weightunit = document.getElementById('WeightUnit')
let bmi = document.getElementById('BMI')
let bmiprime = document.getElementById('BMIPrime')
let weightloss = document.getElementById("WeightLoss");
let categoryelement = document.getElementById("Category")


function heighttometer(){
    let value = Number(height.value)
    if (heightunit.value=="meters/centimeters(m/cm)"){return value}
    if (heightunit.value=="centimeters(cm)"){return value/100}
    if (heightunit.value=="meters(m)"){return value}
    if (heightunit.value=="inches(in)"){return value*0.0254}
    if (heightunit.value=="feet(ft)"){return value*0.3048}
    if (heightunit.value=="feet/inches(ft/in)"){return value*0.3048}
}


function weighttokilogram(){
    let value = Number(weight.value)
    if (weightunit.value=="kilograms(kg)"){return value}
    if (weightunit.value=="pounds(lb)"){return value*0.453592}
    if (weightunit.value=="stones(st)"){return value*6.35029}
}


function calculate(){
    let heightInMeters = heighttometer();
    let weightInKg = weighttokilogram();
    let result = weightInKg/(heightInMeters*heightInMeters);
    bmi.value = result;
    let prime = result/25;
    bmiprime.value = prime;
    let category;
    if (result<18.5) {category = "You are Underweight";}
    else if (result<25) {category = "You have Normal Weight";}
    else if (result<30) {category = "You are Overweight";}
    else if (result<35) {category = "You have Obesity";}
    else {category = "You have Severe Obesity";}
    categoryelement.innerText = category

    let healthyWeight = 25 * heightInMeters * heightInMeters;
    let weightToLose = weightInKg - healthyWeight;
    if (weightToLose > 0) {
        weightloss.innerText =
            "You need to lose approximately " +
            weightToLose.toFixed(1) +
            " kg to reach a BMI of 25.";
    } else {
        weightloss.innerText =
            "You do not need to lose weight to reach a BMI of 25.";
    }
}


function bmiprimeinfo(){
    let title =document.getElementById('BMIPrimeInfo')
    title.innerText = "The BMI Prime is a nifty modification to our own BMI calculator. It's a decimal number where 1.0 = the upper limit to the 'normal BMI' range. It's a super easy way to see if you're overweight or not. If your BMI Prime is more than 1, then you've got some weight to lose."
}
