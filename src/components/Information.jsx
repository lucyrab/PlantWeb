import React from "react"
import "../styles/Details.css"

export default function Information(props) {
    return (
        <>
        {props.default_image && props.default_image.original_url && props.default_image.original_url != "https://perenual.com/storage/image/upgrade_access.jpg" && (
            <img className="details--img" src={props.default_image.original_url} />
        )}
        <div className="details">
        <h2 className="details--name">{props.common_name && props.common_name.charAt(0).toUpperCase() + props.common_name.slice(1)}</h2>
        {props.scientific_name && <div className="details--scientific-name">{props.scientific_name[0]}</div>}
        {props.description && <div className="details--description">{props.description}</div>}

        <table className="table">
            <tbody>
            {props.tableElements}
            </tbody>
        </table>
        </div>
    </>
    )
}