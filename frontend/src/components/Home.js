import React, { Fragment, useEffect          } from 'react'
import { useDispatch, useSelector            } from 'react-redux'
import { Link                                } from 'react-router-dom'
import { Button                              } from '@mui/material'
import { getRandomProducts, getLatestProduct } from '../actions/productActions'
import MetaData                                from './layouts/MetaData'
import Slideshow                               from './layouts/images/Slideshow'
import Banner                                  from './layouts/images/Banner'
import Carousel                                from './layouts/images/Carousel'
import Callout                                 from './layouts/images/Callout'
import Latest                                  from './layouts/images/Latest'
import Social                                  from './layouts/Social'

const Home = () => {  
    
    const dispatch = useDispatch()
    const { randomProducts } = useSelector( state => state.randomProducts )
    const { latestProduct  } = useSelector( state => state.latestProduct  )

    useEffect(() => {  
        dispatch(getRandomProducts(12))  
        dispatch(getLatestProduct())
    }, [dispatch])

    return (
        <Fragment>
            <MetaData title={'Home'} />     
            {randomProducts && randomProducts.length > 0 && (
                <Slideshow data={randomProducts} />               
            )}    
            <div className="container">
                <div className="wrapper">  
                    <div className="d-flex justify-content-center" style={{ marginBottom: "40px" }}>
                        <Link to="/gallery/orientation/Portrait">
                            <Button variant="outlined" style={{ margin: "0 10px" }}>Portrait</Button>
                        </Link>
                        <Link to="/gallery">
                            <Button variant="outlined" style={{ margin: "0 10px" }}>LATEST ARTWORK</Button>
                        </Link>
                        <Link to="/gallery/orientation/Landscape">
                            <Button variant="outlined" style={{ margin: "0 10px" }}>Landscape</Button>
                        </Link>  
                    </div>
                    {latestProduct && latestProduct.length > 0 && (
                        <Latest product={latestProduct[0]} />
                    )}
                    <div className="parent" style={{ margin: "80px 0 0 0" }}>
                        <div className="col-6">
                            <h3>Share</h3>
                            <h4>SPREAD THE WORD ABOUT {process.env.REACT_APP_SITE_NAME}</h4>
                            <div className="icons">  
                                <Social />
                            </div> 
                        </div>
                        <div className="col-6">
                            <h2>{process.env.REACT_APP_SITE_NAME}</h2>
                            <p>{process.env.REACT_APP_SITE_DESCRIPTION}</p>
                        </div>                     
                    </div> 
                    {randomProducts && randomProducts.length > 0 && (
                        <Banner product={randomProducts[0]} />
                    )}
                    {randomProducts && randomProducts.length > 2 && (
                        <Carousel data={randomProducts} />       
                    )}                     
                </div>
            </div>   
            {randomProducts && randomProducts.length > 2 && (
                <div className="bg-grey">
                    <Callout data={randomProducts} />  
                </div>                      
            )} 
        </Fragment>
    )
}

export default Home