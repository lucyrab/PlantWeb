import React from "react"
import "../styles/Listings.css"

export default function CardList(props) {
    return (
        <div className="listings">
      {props.plantElements}
    </div>
    )
}