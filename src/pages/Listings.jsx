import React from "react"
import Card from "../components/Card.jsx"
import "../styles/Listings.css"
import { useParams, Link, useNavigate } from "react-router-dom"

export default function Listings() {
  

  const navigate = useNavigate();

  const { page } = useParams() 
  

  const [plantData, setPlantData] = React.useState([])
  const [shownItems, setShownItems] = React.useState([])
  const [lastPage, setLastPage] = React.useState(50)

  function handleNextPageClick() {
    if (page < lastPage) {
      navigate(`/${parseInt(page) + 1}`)
    }
  }

  function handlePreviousPageClick() {
    if (page > 1) {
      navigate(`/${parseInt(page) - 1}`)
    }
  }

  React.useEffect(() => {
    if (page) {
    } else {
      navigate(`/1`)
    }
  }, [])

  React.useEffect(() => {
    async function getPlants() {
      const res = await fetch(`https://perenual.com/api/species-list?key=sk-8gVA66391a39bbfae5366&indoor=1&order=asc&page=${page}`)
      const data = await res.json()
      setPlantData(data.data)
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
    setShownItems(plantData.filter(plant => plant.default_image && plant.default_image.original_url != "https://perenual.com/storage/image/upgrade_access.jpg"))
  }, [plantData])

  const plantElements = shownItems.map(plant => (
    <Card key={plant.id} {...plant}/>
  ))
  return (
    <>
    <div className="listings">
      {plantElements}
    </div>
    <div className="pagination" >
        <button onClick={handlePreviousPageClick} className="listings--button">Previous Page</button>
        <div>{page}</div>
        <button onClick={handleNextPageClick} className="listings--button">Next Page</button>
    </div>
    </>
  )
}