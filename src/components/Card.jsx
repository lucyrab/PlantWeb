import React from "react"
import "../styles/Card.css"
import { Link } from 'react-router-dom';


export default function Card(props) {
    const name = props.common_name.charAt(0).toUpperCase() + props.common_name.slice(1)
    return (
        <div className="card">
        <Link className="card--link" to={`/details/${props.id}`}>
            {props.default_image && props.default_image.original_url && props.default_image.original_url != "https://perenual.com/storage/image/upgrade_access.jpg" && (
            <img className="card--img" src={props.default_image.original_url} />
            )}
        
            <p className="card--name">{name}</p>
            <p className="card--scientific-name">{props.scientific_name[0]}</p>
        </Link>
        </div>
    )
}