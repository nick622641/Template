import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useMediaQuery } from 'react-responsive'
import { useSpring, animated } from 'react-spring'
import { getProducts } from '../actions/productActions'
import { getCategoryOnes, getCategoryTwos, getCategoryThrees } from '../actions/categoryActions'
import MetaData from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import IconButton from '@mui/material/IconButton'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import Checkbox from '@mui/material/Checkbox'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Rating from '@mui/material/Rating'
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Gallery = () => {

    const dispatch = useDispatch()
    const alert    = useAlert()    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const keyword  = useParams().keyword    
    const artistQuery      = useParams().artist 
    const orientationQuery = useParams().orientation 
    const mediumQuery      = useParams().medium 
    const rating           = useParams().rating 
    const artist      = artistQuery      ? artistQuery.replace(/-/g, ' ')      : ''
    const orientation = orientationQuery ? orientationQuery.replace(/-/g, ' ') : ''
    const medium      = mediumQuery      ? mediumQuery.replace(/-/g, ' ')      : ''

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ price,       setPrice       ] = useState([1, 10000])    
    const [ isMenuOpen,  setIsMenuOpen  ] = useState(false)   

    const { categoryOnes   } = useSelector( state => state.categoryOnes )    
    const { categoryTwos   } = useSelector( state => state.categoryTwos )  
    const { categoryThrees } = useSelector( state => state.categoryThrees )
    const { loading, products, resPerPage, filteredProductsCount, error } = useSelector( state => state.products )

    const menuAppear = useSpring({
        transform: isMenuOpen && isMobile ? 'translateX(0)' : 'translateX(-100%)'
    })

    const resetPage = () => {
        setCurrentPage(1)
        setIsMenuOpen(false)
        window.scrollTo(0, 0)           
    }

    useEffect( () => {
        dispatch(getCategoryOnes())        
        dispatch(getCategoryTwos())
        dispatch(getCategoryThrees())
        if(error) {
            return alert.error(error)        
        }         
        dispatch(getProducts(keyword, currentPage, price, artist, orientation, medium, rating))    

    }, [dispatch, alert, error, keyword, currentPage, price, artist, orientation, medium, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let title = 'Latest Work' 
     
    if ( keyword     ) { title = keyword }
    if ( artist      ) { title = artist }
    if ( orientation ) { title = orientation }
    if ( medium      ) { title = medium }
    if ( rating      ) { title = `Rating ${rating} / 5` }    

    return (       

        <Fragment>

            <MetaData title={`Gallery - ${title}`} />                                      

            <div className="container">

                <div className="breadcrumbs">
                    <Link to="/">
                        <small>Home</small>
                    </Link>
                    &nbsp;/&nbsp;
                    <Link to="/gallery">
                        <small>Gallery</small>
                    </Link>
                    &nbsp;/&nbsp;
                    <span>
                        <small>{title}</small>
                    </span>
                </div>

                <div className="wrapper parent">  

                    <aside>

                        <button 
                            className="filters"
                            onClick={() => {setIsMenuOpen(!isMenuOpen)}}
                        >
                            Show Menu
                        </button>

                        {(isMenuOpen || !isMobile) && (

                            <animated.div style={isMobile ? menuAppear : {}}>

                                <h3>
                                    Filters
                                    <Link to="/gallery">
                                        <IconButton className="float-r">
                                            <AutorenewIcon />
                                        </IconButton>
                                    </Link>
                                </h3>    

                                <h6>Price Range</h6>

                                <Range 
                                    marks={{
                                        1 : `$1`,
                                        1000 : `$1000`
                                    }}
                                    min={1}
                                    max={1000}
                                    defaultValue={[1, 1000]}
                                    tipFormatter={value => `$${value}`}
                                    tipProps={{
                                        placement: "top"                                                    
                                    }}
                                    value={price}
                                    onChange={(price) => {
                                        setPrice(price)                          
                                        resetPage()
                                    }}
                                    style={{ margin: "20px 0 50px 0" }}
                                />                            

                                <h6>Artist</h6>

                                <ul>   
                                    {categoryOnes && categoryOnes.map(a => (
                                        <li                                           
                                            key={a.name}                             
                                            className={artist === a.name ? 'link-active' : ''}
                                        >                                                                          
                                            <Link 
                                                to={`/gallery/artist/${a.name.replace(/ /g, '-')}`}
                                                className="whitespace-nowrap"
                                            >
                                                <Checkbox 
                                                    checked={artist === a.name ? true : false} 
                                                    size="small"
                                                    sx={{ py: 0.3 }}
                                                    color="primary"
                                                />                                      
                                                {a.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <h6>Orientation</h6>

                                <ul>
                                    {categoryTwos && categoryTwos.map(o => (
                                        <li                                           
                                            key={o.name}                               
                                            className={orientation === o.name ? 'link-active' : ''}
                                        >
                                            <Link to={`/gallery/orientation/${o.name.replace(/ /g, '-')}`}>
                                                <Checkbox 
                                                    checked={orientation === o.name ? true : false} 
                                                    size="small"
                                                    sx={{ py: 0.3 }}
                                                    color="primary"
                                                />                                            
                                                {o.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <h6>Media</h6>

                                <ul>
                                    {categoryThrees && categoryThrees.map(m => (
                                        <li                                           
                                            key={m.name}                                    
                                            className={medium === m.name ? 'link-active' : ''}
                                        >
                                            <Link to={`/gallery/medium/${m.name.replace(/ /g, '-')}`}>
                                                <Checkbox 
                                                    checked={medium === m.name ? true : false} 
                                                    size="small"
                                                    sx={{ py: 0.3 }}
                                                    color="primary"
                                                />                                       
                                                {m.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>                            

                                <h6>Ratings</h6>

                                <ul>
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <li key={star}>
                                            <Link to={`/gallery/rating/${star}`}>
                                                <Rating 
                                                    value={star} 
                                                    sx={{ color: "var(--primary-color)" }} 
                                                    readOnly
                                                />                                            
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <button 
                                    className="filters"
                                    onClick={resetPage}
                                >
                                    Hide Menu
                                </button>

                            </animated.div>
                        
                        )} 

                    </aside>

                    <article className={!isMobile ? 'relative' : ''}>                         

                        <h1>{title}</h1>

                        {loading ? <Loader /> : (  

                            <Fragment>

                                <div className="parent">
                                    <span>
                                        { price[0] > 1 || price[1] < 10000 ? ' From $' + price[0] + ' to $' + price[1]: ''}                        
                                    </span> 
                                    <small>
                                        {resPerPage * (currentPage - 1) + 1} 
                                        &nbsp;-&nbsp; 
                                        {resPerPage * currentPage > filteredProductsCount ? filteredProductsCount : resPerPage * currentPage} 
                                        &nbsp;  / &nbsp;{filteredProductsCount}
                                    </small> 
                                </div>

                                <div className="showroom">
                                    {products && filteredProductsCount > 0                             
                                        ?   products.map(product => (
                                                <Product key={product._id} product={product} />                                    
                                            )) 
                                        :   <p>No Results Found</p>
                                    }    
                                </div>

                                {resPerPage <= filteredProductsCount && (
                                    <div onClick={() => window.scrollTo(0, 0)}>
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={resPerPage}
                                            totalItemsCount={filteredProductsCount}                        
                                            onChange={setCurrentPageNo}   
                                            nextPageText={<KeyboardArrowRightIcon />}  
                                            prevPageText={<KeyboardArrowLeftIcon />} 
                                            firstPageText={<FirstPageIcon />} 
                                            lastPageText={<LastPageIcon />}  
                                        />
                                    </div>
                                )} 

                            </Fragment> 
                        
                        )}

                    </article> 

                </div>

            </div>  

        </Fragment>       

    )

}

export default Gallery
