import CalcFoodProtein from "./calc_food_protein.js";

class App {
  constructor() {
    this.foodList = document.querySelector(".food-list")
    this.calcButton = document.getElementById("calcButton")
    this.addFoodButton = document.getElementById("addFood")
    this.protein = document.getElementById("protein")
    this.kilograms = document.getElementById("kilograms")
    this.resultsList = document.querySelector(".results-list")

    this.bindingEvents()
  }

  bindingEvents = () => {
    this.addFoodButton.addEventListener('click', (e) => {
      this.addFoodItem(e)
    })

    this.calcButton.addEventListener('click', (e) => {
      if(this.validateData()) {
        const data = this.buildData()
        // console.log(data)
        const calc = new CalcFoodProtein(data, this.protein.value, this.kilograms.value)
        this.showResults(calc.calc())
      }
    })
  }

  showResults = (data) => {
    this.resultsList.innerHTML = ""

    Object.keys(data).forEach((food) => {
      const text = `${food}: ${data[food].toFixed(1)} Kg`

      let li = document.createElement("li")
      li.appendChild(document.createTextNode(text))

      this.resultsList.appendChild(li)
    })
    
  }

  validateData = () => {
    return document.querySelectorAll("input:invalid").length === 0
  }

  addFoodItem = (e) => {
    e.preventDefault()
    this.foodList.append(this.foodItem())
    this.resetRemoveListeners()
  }

  removeFoodItem = (e) => {
    e.preventDefault()
    e.target.parentElement.remove()
  }

  resetRemoveListeners =() => {
    const removeButtons = document.querySelectorAll("button.danger")
    removeButtons.forEach((button) => button.removeEventListener("click", this.removeFoodItem))
    removeButtons.forEach((button) => button.addEventListener("click", (e) => this.removeFoodItem(e)))
  }

  foodItem = () => {
    let li = document.createElement("li")
    li.setAttribute("class", "food-item")
    
    let foodInput = document.createElement("input")
    foodInput.setAttribute("type", "text")
    foodInput.setAttribute("placeholder", "Alimento")
    foodInput.setAttribute("class", "food")
    foodInput.setAttribute("required", "true")

    let proteinInput = document.createElement("input")
    proteinInput.setAttribute("type", "number")
    proteinInput.setAttribute("placeholder", "Proteina")
    proteinInput.setAttribute("class", "protein")
    proteinInput.setAttribute("required", "true")

    let removeButton = document.createElement("button")
    removeButton.setAttribute("class", "danger")
    removeButton.appendChild(document.createTextNode("X"))

    li.appendChild(foodInput)
    li.appendChild(proteinInput)
    li.appendChild(removeButton)

    return li
  }

  buildData = () => {
    const items = document.querySelectorAll('.food-item')

    const values = [...items].map((item) => {
      const foodName = item.querySelector('.food').value
      const foodProtein = item.querySelector('.protein').value
      return [foodName, foodProtein]
    })

    return Object.fromEntries(values)
  }
}

addEventListener('DOMContentLoaded', (event) => new App)
