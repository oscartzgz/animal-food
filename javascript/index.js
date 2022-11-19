import CalcFoodProtein from "./calc_food_protein.js";
import {grainsProteinData} from "./grains_protein.js"

class App {
  constructor() {
    this.calcButton = document.getElementById('calcData')
    this.grain1 = document.getElementById('grain1')
    this.grainProtein1 = document.getElementById('grainProtein1')
    this.grain2 = document.getElementById('grain2')
    this.grainProtein2 = document.getElementById('grainProtein2')
    this.kilograms = document.getElementById('kilograms')
    this.protein = document.getElementById('protein')
    this.sourceData = {}

    this.bindingEvents()
    this.setupOptions()
  }

  bindingEvents = () => {
    this.calcButton.addEventListener('click', (e) => {
      const grain1Name = grainsProteinData[this.grain1.value].name
      const grain2Name = grainsProteinData[this.grain2.value].name
      const grain1Value = grainsProteinData[this.grain1.value].value
      const grain2Value = grainsProteinData[this.grain2.value].value

      this.sourceData[grain1Name] = grain1Value
      this.sourceData[grain2Name] = grain2Value
    
      const calcFoodProtein = new CalcFoodProtein(this.sourceData, protein.value, kilograms.value)
      const data = calcFoodProtein.calc()
      
      document.getElementById('grain1Result').innerHTML = `
        <div class="result-container">
          ${grain1Name}: <b>${data[grain1Name].toFixed(1)} Kg</b>
        </div>
      `

      document.getElementById('grain2Result').innerHTML = `
        <div class="result-container">
          ${grain2Name}: <b>${data[grain2Name].toFixed(1)} Kg</b>
        </div>
      `
    })
  }

  setupOptions = () => {   
    // console.log("setupOptions: ", this.setupOptions())
    this.buildOptions().forEach(option => this.grain1.appendChild(option))
    this.buildOptions().forEach(option => this.grain2.appendChild(option))
  }

  buildOptions = () => {
    return grainsProteinData.map((grain, index) => {
      const optionTag = document.createElement("option")
      const text = document.createTextNode(`${grain.name} - ${grain.value}%`)
      optionTag.setAttribute("value", index)
      optionTag.appendChild(text)
      return optionTag
    })
  }

}

addEventListener('DOMContentLoaded', (event) => new App)
