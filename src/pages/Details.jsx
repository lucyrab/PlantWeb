import React from "react"
import { useParams } from "react-router-dom"
import "../styles/Details.css"

export default function Details() {
    const { id } = useParams()

    const [plantInfo, setPlantInfo] = React.useState({})
    const [plantTable, setPlantTable] = React.useState([])

  React.useEffect(() => {
    async function getPlant() {
      const res = await fetch(`https://perenual.com/api/species/details/${id}?key=sk-wN5e663c6215172aa5395`)
      const data = await res.json()
      setPlantInfo(data)
    }
    getPlant()
  }, [])

    React.useEffect(() =>{
      const propagation = plantInfo.propagation && plantInfo.propagation.join(', ')
      const sunlight = plantInfo.sunlight && plantInfo.sunlight.join(', ');
      const pruning = plantInfo.pruning_month && plantInfo.pruning_month.join(', ');
      setPlantTable(
        [
          {title: "Family", value: plantInfo.family ? plantInfo.family : "N/A"},
          {title: "Size", value: plantInfo.dimension ? plantInfo.dimension : "N/A"},
          {title: "Watering", value: plantInfo.watering && plantInfo.watering_general_benchmark && plantInfo.watering_general_benchmark.value ? plantInfo.watering + ", around " + plantInfo.watering_general_benchmark.value + " " + plantInfo.watering_general_benchmark.unit : "N/A"},
          {title: "Sunlight", value: plantInfo.sunlight ? sunlight : "N/A"},
          {title: "Propagation", value: plantInfo.propagation ? propagation : "N/A"},
          {title: "Pruning Months", value: plantInfo.pruning_month ? pruning : "N/A"},

        ]

      )
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
        {plantInfo.default_image && plantInfo.default_image.original_url && plantInfo.default_image.original_url != "https://perenual.com/storage/image/upgrade_access.jpg" && (
            <img className="details--img" src={plantInfo.default_image.original_url} />
          )}
        <div className="details">
          
          <h2 className="details--name">{plantInfo.common_name && plantInfo.common_name.charAt(0).toUpperCase() + plantInfo.common_name.slice(1)}</h2>
          {plantInfo.scientific_name && <div className="details--scientific-name">{plantInfo.scientific_name[0]}</div>}
          {plantInfo.description && <div className="details--description">{plantInfo.description}</div>}

          <table className="table">
            <tbody>
              {tableElements}
            </tbody>
          </table>
        </div>
          </>
        
        
    )
}