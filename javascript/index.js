import CalcFoodProtein from "./calc_food_protein.js";

addEventListener('DOMContentLoaded', (event) => {
  const calcButton = document.getElementById('calcData')
  const grainName1 = document.getElementById('grainName1')
  const grainProtein1 = document.getElementById('grainProtein1')
  const grainName2 = document.getElementById('grainName2')
  const grainProtein2 = document.getElementById('grainProtein2')
  const kilograms = document.getElementById('kilograms')
  const protein = document.getElementById('protein')
  let sourceData = {}
  
  console.log(document)
  console.log(calcButton)
  
  calcButton.addEventListener('click', (e) => {
    sourceData[grainName1.value] = grainProtein1.value
    sourceData[grainName2.value] = grainProtein2.value
  
    const calcFoodProtein = new CalcFoodProtein(sourceData, protein.value, kilograms.value)
    const data = calcFoodProtein.calc()
    
    document.getElementById('grain1Result').innerHTML = `
      <div>${grainName1.value}: ${data[grainName1.value].toFixed(1)}</div>
    `

    document.getElementById('grain2Result').innerHTML = `
      <div>${grainName2.value}: ${data[grainName2.value].toFixed(1)}</div>
    `
  })
});

