import React from "react"
import { useParams } from "react-router-dom"
import "../styles/Details.css"
import Information from "../components/Information"

export default function Details() {
    const { id } = useParams()

    const [plantInfo, setPlantInfo] = React.useState({})
    const [plantTable, setPlantTable] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function getPlant() {
      const res = await fetch(`https://perenual.com/api/species/details/${id}?key=sk-Jg9s663df495540785412`)
      const data = await res.json()
      setPlantInfo(data)
    }
    getPlant()
  }, [])

    React.useEffect(() =>{
      const propagation = plantInfo.propagation && plantInfo.propagation.join(', ')
      const sunlight = plantInfo.sunlight && plantInfo.sunlight.join(', ');
      const pruning = plantInfo.pruning_month && plantInfo.pruning_month.join(', ');
      if (plantInfo.id) {
        setPlantTable([
            {title: "Family", value: plantInfo.family ? plantInfo.family : "N/A"},
            {title: "Size", value: plantInfo.dimension ? plantInfo.dimension : "N/A"},
            {title: "Watering", value: plantInfo.watering && plantInfo.watering_general_benchmark && plantInfo.watering_general_benchmark.value ? plantInfo.watering + ", around " + plantInfo.watering_general_benchmark.value + " " + plantInfo.watering_general_benchmark.unit : "N/A"},
            {title: "Sunlight", value: plantInfo.sunlight ? sunlight : "N/A"},
            {title: "Propagation", value: plantInfo.propagation ? propagation : "N/A"},
            {title: "Pruning Months", value: plantInfo.pruning_month ? pruning : "N/A"},
          ])
          setIsLoading(false)

      }
    }, [plantInfo])

    const tableElements = plantTable.map((info) => {
      return (
        <tr className="table--row" key={info.title}>
          <td className="table--cell">{info.title}</td>
          <td className="table--cell">{info.value}</td>
        </tr>
      )
    })

    return (
        <>  
        {isLoading ? <span className="loading"></span> : <Information tableElements={tableElements} {...plantInfo}/> }
          </>
        
        
    )
}