import React from "react"
import "../styles/Card.css"
import { Link } from 'react-router-dom';


export default function Card(props) {
    const name = props.common_name.charAt(0).toUpperCase() + props.common_name.slice(1)
    const [isImageError, setIsImageError] = React.useState(false)
    const [otherImage, setOtherImage] = React.useState("")
    const [isImageShowing, setIsImageShowing] = React.useState(true)

    const outliers = [8766, 7681, 7918, 7163, 3986, 8596, 6405, 6208, 6178, 3349, 5738, 3972, 5726, 7409, 8549, 3256, 5257, 8314]
    const remove = [3986, 5726, 3256]

    function handleImageError() {
        setIsImageError(true)
    }
    React.useEffect(() => {
        async function getImage() {
            if (props.id) {
                try {
                    if (outliers.includes(props.id)) {
                        if (remove.includes(props.id)) {
                            setOtherImage("")
                            setIsImageShowing(false)
                        } else {
                            const res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=images&prop=imageinfo&gimlimit=5&redirects=1&titles=${props.scientific_name}&iiprop=timestamp|user|userid|comment|canonicaltitle|url|size|dimensions|sha1|mime|thumbmime|mediatype|bitdepth&format=json`)
                            const data = await res.json()
                            const keys = Object.keys(data.query.pages)
                            setOtherImage(data.query.pages[keys[2]].imageinfo[0].url)
                            setIsImageError(false)
                            setIsImageShowing(true)
                        }
                        
                    } else {
                        const res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=images&prop=imageinfo&gimlimit=5&redirects=1&titles=${props.scientific_name}&iiprop=timestamp|user|userid|comment|canonicaltitle|url|size|dimensions|sha1|mime|thumbmime|mediatype|bitdepth&format=json`)
                        const data = await res.json()
                        const keys = Object.keys(data.query.pages)
                        setOtherImage(data.query.pages[keys[1]].imageinfo[0].url)
                        setIsImageError(false)
                        setIsImageShowing(true)
                    }
                
                } catch (error) {
                    setOtherImage("")
                    setIsImageShowing(false)
                }
        }
        if (props.default_image && props.default_image.original_url && props.default_image.original_url != "https://perenual.com/storage/image/upgrade_access.jpg") {
            setIsImageShowing(true)
        }
    }
        getImage()
    }, [props.id])

    return (
        <>
        {isImageShowing ? (
            
            <div className="card">
        <Link className="card--link" to={`/details/${props.id}`}>
            {props.default_image && props.default_image.original_url && props.default_image.original_url != "https://perenual.com/storage/image/upgrade_access.jpg" ? (
                !isImageError && <img onError={handleImageError} className="card--img" src={props.default_image.original_url} /> ) :  !isImageError && <img onError={handleImageError} className="card--img" src={otherImage} />}
                
            <p className="card--name">{name}</p>
            <p className="card--scientific-name">{props.scientific_name[0]}</p>
        </Link>
        </div>
        ) : <></>}
        </>
    )
}