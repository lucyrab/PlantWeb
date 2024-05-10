import React from "react"
import "../styles/Listings.css"

export default function Pagination(props) {
    return (
        <div className="pagination" >
            <button onClick={props.handlePreviousPageClick} className="listings--button">Previous Page</button>
            <div>{props.page}</div>
            <button onClick={props.handleNextPageClick} className="listings--button">Next Page</button>
        </div>
    )
}