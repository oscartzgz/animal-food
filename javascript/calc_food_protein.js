export default class CalcFoodProtein {
  constructor(food, protein_percentage, kilos) {
    this.food = food
    this.protein_percentage = protein_percentage
    this.kilos = kilos
  }

  calc = () => {
    const pirzon_data = this.pirzon_values(this.food, this.protein_percentage)
    console.log('pirzon_data: ', pirzon_data)
    const factor = this.calc_factor(pirzon_data)
    console.log('factor: ', factor)
    const kilos_result = this.calc_kilos(pirzon_data, factor, this.kilos)
    console.log('kilos_result: ', kilos_result)

    return kilos_result
  }

  pirzon_values = (food, wanted) => {
    let calc_data = food
    Object.keys(food).forEach((key) => {
      calc_data[key] = Math.abs(calc_data[key] - wanted)
    })
    return calc_data
  }

  calc_factor = (pirzon_data) => {
    console.log(pirzon_data)
    return Object.values(pirzon_data).reduce((sum, key) => sum + key, 0)
  }

  calc_kilos = (data, factor) => {
    let calc_data = {}
    Object.keys(data).forEach((key) => {
      calc_data[key] = data[key] * this.kilos / factor
    })
    
    return calc_data
  }
}

// export default CalcFoodProtein