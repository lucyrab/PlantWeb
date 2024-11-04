import React from "react"
import Card from "../components/Card.jsx"
import CardList from "../components/CardList.jsx"
import Pagination from "../components/Pagination.jsx"
import "../styles/Listings.css"
import { useParams, Link, useNavigate } from "react-router-dom"

export default function Listings() {
  
  const navigate = useNavigate();
  const { page } = useParams() 
  
  const [isLoading, setIsLoading] = React.useState(true)
  
  const [plantData, setPlantData] = React.useState([])
  const [shownItems, setShownItems] = React.useState([])
  const [lastPage, setLastPage] = React.useState(50)

  function handleNextPageClick() {
    if (page < lastPage) {
      setIsLoading(true)
      navigate(`/PlantWeb/${parseInt(page) + 1}`)
    }
  }

  function handlePreviousPageClick() {
    if (page > 1) {
      setIsLoading(true)
      navigate(`/PlantWeb/${parseInt(page) - 1}`)
    }
  }

  React.useEffect(() => {
    if (page) {
      if (Number.isInteger(page) == False) {
        navigate(`/PlantWeb/1`)
      }
    } else {
      navigate(`/PlantWeb/1`)
    }
  }, [])

  React.useEffect(() => {
    async function getPlants() {
      const res = await fetch(`https://perenual.com/api/species-list?key=sk-LK8y663f68e03d7325424&indoor=1&order=asc&page=${page}`)
      const data = await res.json()
      setPlantData(data.data.map((plant)=> {      
        return {
          ...plant
        }
      }))
      setLastPage(data.last_page)
    }
    getPlants()
   
  }, [page])

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
    if (plantData && plantData[0] && plantData[0].id) {
      //setShownItems(plantData.filter(plant => plant.default_image && plant.default_image.original_url != "https://perenual.com/storage/image/upgrade_access.jpg"))
      setShownItems(plantData)
      setIsLoading(false)
    }
  }, [plantData])

  const plantElements = shownItems.map(plant => (
    <Card key={plant.id} {...plant}/>
  ))
  return (
    <>
    {isLoading ? <span className="loading"></span> : (
    <>
      <CardList plantElements={plantElements} /> 
      <Pagination page={page} handleNextPageClick={handleNextPageClick} handlePreviousPageClick={handlePreviousPageClick} />
    </>
  )}
    </>
  )
}