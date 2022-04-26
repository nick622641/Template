import React from 'react'
import { Link } from 'react-router-dom'
import RichtextOutput from '../richtext/RichtextOutput'
import './latest.css'

const Latest = ({ product }) => {     

    return (

        <div className="parent align-items-center">
            <div className="col-6">
                <img src={product.images.length === 1 ? product.images[0].url : product.images[1].url} alt={product.name} />
            </div>
            <div className="parent col-6 wrapper callout">
                <h3>BROWSE THE COLLECTION</h3>

                <h2>Latest Work</h2>

                <RichtextOutput text={`${product.description.substring(0, 155)}...`} />
                
                <br />

                <Link className="submit" to={`/artwork/${product.slug}`}>
                    Read More
                </Link>
            </div>
        </div>     

    )

}

export default Latest