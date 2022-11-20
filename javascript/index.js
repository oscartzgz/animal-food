import CalcFoodProtein from "./calc_food_protein.js";
import {grainsProteinData} from "./grains_protein.js"

class App {
  constructor() {
    this.calcButton = document.getElementById('calcData')
    this.grain1 = document.getElementById('grain1')
    this.grain2 = document.getElementById('grain2')
    this.kilograms = document.getElementById('kilograms')
    this.protein = document.getElementById('protein')
    // this.sourceData = {}

    this.bindingEvents()
    this.setupOptions()
  }

  bindingEvents = () => {
    this.calcButton.addEventListener('click', (e) => {
      const grain1Name = this.grain1.value
      const grain2Name = this.grain2.value
      const grain1Value = grainsProteinData[grain1Name]
      const grain2Value = grainsProteinData[grain2Name]

      const pirzonData = {}

      pirzonData[grain1Name] = grain1Value
      pirzonData[grain2Name] = grain2Value
    
      console.log("Sending this data: ", pirzonData)
      const calcFoodProtein = new CalcFoodProtein(pirzonData, this.protein.value, this.kilograms.value)
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
    this.buildOptions().forEach(option => this.grain1.appendChild(option))
    this.buildOptions().forEach(option => this.grain2.appendChild(option))
  }

  buildOptions = () => {
    return Object.keys(grainsProteinData).map((key) => {
      const value = grainsProteinData[key]
      const optionTag = document.createElement("option")
      const text = document.createTextNode(`${key} - ${value}%`)
      optionTag.setAttribute("value", key)
      optionTag.appendChild(text)
      return optionTag
    })
  }

}

addEventListener('DOMContentLoaded', (event) => new App)
