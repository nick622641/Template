import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProductDetails, deleteReview } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET, DELETE_REVIEW_RESET } from '../../constants/productConstants'
import { clearErrors } from '../../actions/userActions'
import { useSpring } from 'react-spring'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import Modal from '../modals/Modal'
import Review from '../modals/Review'
import Contact from '../modals/Contact'
import ListReviews from '../review/ListReviews'
import Lightbox from '../layouts/images/Lightbox'
import Social from '../layouts/Social'
import FormattedPrice from '../layouts/FormattedPrice'
import IconButton from '@mui/material/IconButton'
import EmailIcon from '@mui/icons-material/Email'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LoginIcon from '@mui/icons-material/Login'
import Quantity from './Quantity'
import Rating from '@mui/material/Rating'
import StructuredData from './StructuredData'
import RichtextOutput from '../layouts/richtext/RichtextOutput'

const ProductDetails = () => { 

    const slug = useParams().slug    

    const alert    = useAlert()
    const dispatch = useDispatch()

    const { error: reviewError, success   } = useSelector( state => state.newReview )
    const { loading, product, error       } = useSelector( state => state.productDetails )
    const { user, isAuthenticated         } = useSelector( state => state.auth )  
    const { isDeleted, error: deleteError } = useSelector( state => state.review ) 

    const [ modalType,         setIModalType        ] = useState()    
    const [ quantity,          setQuantity          ] = useState(1)
    const [ imageIndex,        setIImageIndex       ] = useState(0)   
    const [ isModalVisible,    setIsModalVisible    ] = useState(false)
    const [ isLightboxVisible, setIsLightboxVisible ] = useState(false)          

    let rating = 0
    let comment = ''  

    if ( user && product && product.numOfReviews > 0 ) {
        for (let i = 0; i < product.numOfReviews; i++) {
            if ( product.reviews[i].user === user._id ) {                    
                rating = product.reviews[i].rating
                comment = product.reviews[i].comment
            }
        }
    } 

    const toggleModal = (modalType) => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)  
        setIModalType(modalType)   
    }   
    const toggleLightbox = (imgIndex) => {   
        setIImageIndex(imgIndex)      
        setIsLightboxVisible(wasLightboxVisible => !wasLightboxVisible)   
    } 
    const slideTopAnimation = useSpring({     
        opacity: isLightboxVisible ? 1 : 0,
        transform: isLightboxVisible ? `translateY(0%)` : `translateY(-100%)`
    })

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, product._id))        
    }  

    useEffect( () => {   

        dispatch(getProductDetails(slug))
        
        if(error) {            
            alert.error(error)  
            dispatch(clearErrors())          
        } 
        if(reviewError) { 
            alert.error(reviewError)
            dispatch(clearErrors())
         } 
         if(success) {
            alert.success('Review Posted Successfully')
            dispatch({ type: NEW_REVIEW_RESET })
            setIsModalVisible(false)
        } 
        if (deleteError) {
            alert.error(error)
            dispatch(clearErrors())
        }          
      
        if(isDeleted) {
            alert.success('Review Deleted Successfully')            
            dispatch({ type: DELETE_REVIEW_RESET })
        }         
    }, [dispatch, success, alert, error, reviewError, slug, deleteError, isDeleted ])

    const addToCart = () => {
        dispatch(addItemToCart(product.slug, quantity))
        alert.success('Item Added to Cart')
    }        

    return (

        <Fragment>  

            {loading ? <Loader /> : (

                <Fragment>

                    <MetaData title={product.name} description={product.description} />

                    {product.images && (
                        <StructuredData
                            title={product.name}
                            description={product.description}
                            thumb={product.images[0].thumbUrl}
                            image={product.images[0].url}
                            date={product.datePublished}
                            artist={product.artist}
                            medium={product.media}
                            rating={product.ratings}
                        />
                    )}

                    
                    <div className="bg-grey">

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
                                {product.artist && (
                                    <Link to={`/gallery/artist/${product.artist.replace(/ /g, '-')}`}>
                                        <small>{product.artist}</small>
                                    </Link>
                                )}                                
                                &nbsp;/&nbsp;
                                <span>
                                    <small>{product.name}</small>
                                </span>
                            </div>
                                
                            <div className="wrapper">

                                <div className={product.orientation !== 'Landscape' ? 'portrait parent' : 'landscape'}>

                                    <div className={product.orientation !== 'Landscape' ? 'col-6' : '' }>
                                        {product.images && (
                                            <img src={product.images[0].url} alt={product.name} />
                                        )}
                                        <ul className="thumbnails">
                                        {product.images && product.images.map((image, index) => (
                                            <li 
                                                key={image.public_id}
                                                onClick={() => toggleLightbox(index)}
                                            >
                                                <img 
                                                    src={image.thumbUrl} 
                                                    alt={product.name} 
                                                    className="object-fit"
                                                />
                                            </li>
                                        ))}
                                        </ul>                                       
                                    </div>                                    

                                    <div className={`parent ${product.orientation !== 'Landscape' ? 'col-6' : ''}`}>  

                                        <h1 className="text-center">{product.name}</h1>                                        

                                        <table>  
                                            <tbody>                                                 
                                                <tr>
                                                    <th className="text-right">Artist</th>
                                                    <td><Link to="#!"><b>{product.artist}</b></Link></td>
                                                </tr>       
                                                <tr>
                                                    <th className="text-right">Dimensions</th>
                                                    <td>{product.width} cm <small>x</small> {product.height} cm</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-right">Media</th>
                                                    <td>{product.media}</td>
                                                </tr>                    
                                                <tr>
                                                    <th className="text-right">Published</th>
                                                    <td>                                                       
                                                        {product.datePublished && (                                                        
                                                            new Date(product.datePublished).getFullYear()                                                       
                                                        )}                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-right">Status</th>
                                                    <td className={product.stock === 0 ? "danger" : ""}>                                              
                                                        {product.stock > 0 ? product.stock : null}                                                     
                                                        &nbsp;
                                                        {product.stock > 0 ? 'in Stock' : 'Out of Stock'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-right">Price</th>    
                                                    <td>
                                                        <span className="price">                                                                                                              
                                                            {product.price && (
                                                                <FormattedPrice number={product.price} />
                                                            )}  
                                                        </span>
                                                    </td>
                                                </tr>                                              
                                                <tr>
                                                    <th className="text-right">Reviews</th>    
                                                    <td className="whitespace-nowrap">
                                                        <Rating                                                            
                                                            value={product.ratings} 
                                                            sx={{ color: "var(--primary-color)" }} 
                                                            precision={0.5} 
                                                            readOnly 
                                                        /> 
                                                        <br />                                                      
                                                        ({product.numOfReviews} Reviews)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                    {user ? 
                                                        <Fragment>
                                                            <IconButton onClick={() => {toggleModal(<Review  rating={rating} comment={comment} />)}}>
                                                                <EditOutlinedIcon />
                                                            </IconButton>
                                                            Post Review  
                                                        </Fragment>      
                                                    : 
                                                        <Link to={`/login?redirect=artwork/${slug}`}>
                                                            <IconButton>
                                                                <LoginIcon />
                                                            </IconButton>    
                                                            Login to Post a Review                                                      
                                                        </Link>
                                                    } 
                                                    </td>
                                                </tr>
                                                {isAuthenticated && user.role === 'admin' && (
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <Link to={`/admin/product/${product._id}`}>
                                                                <IconButton>
                                                                    <EditOutlinedIcon />
                                                                </IconButton>  
                                                                Edit Page                                                            
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )} 
                                            </tbody>     
                                        </table>  

                                        <br />

                                        <div> 
                                            <div className="text-center">  
                                                <button                                                    
                                                    className="submit"
                                                    onClick={addToCart}
                                                    disabled={product.stock === 0 ? true : false}
                                                >
                                                    Add to Cart 
                                                </button>     
                                            </div>  
                                            <br />
                                            <div className="whitespace-nowrap text-center">
                                                Quantity &nbsp;                                               
                                                <Quantity 
                                                    quantity={quantity}
                                                    stock={product.stock}
                                                    setQuantity={setQuantity}                                                       
                                                />                                               
                                            </div>  
                                        </div>
                                        
                                    </div>
                                </div> 
                            </div>
                        </div>   
                    </div>

                    <div className="container">	
                        <div className="wrapper">	
                            <div className="parent">        
                                <div className="col-6">
                                    <h3>Share</h3>                                
                                    <h2>Spread the word about {product.name}</h2>                                    
                                    <Social />
                                </div>
                                <div className="col-6" style={{ fontSize: "14px" }}>

                                    {product.description && (
                                        <RichtextOutput text={product.description} />
                                    )}
                                    
                                    <div style={{ marginTop: "40px" }}>         

                                        <small>Contact Us</small>  

                                        <IconButton onClick={() => {toggleModal(<Contact />)}} color="primary">
                                            <EmailIcon />                                        
                                        </IconButton>    

                                    </div>                                   
                                 
                                </div>                                
                            </div>                             
                        </div>                        
                    </div>  

                    <div className={product.orientation !== 'Landscape' ? 'container' : ''}>
                        <div className="wrapper">                              
                            {product.images && (
                                <img src={product.images[0].url} alt={product.name} />
                            )} 
                        </div>
                    </div>

                    {product.reviews && product.reviews.length > 0 && (  
                        <div className="bg-grey">                                    
                            <div className="container">
                                <div className="wrapper">                                    
                                    <ListReviews 
                                        reviews={product.reviews} 
                                        user={user} 
                                        toggleModal={toggleModal}
                                        deleteReviewHandler={deleteReviewHandler}
                                    />   
                                </div>
                            </div>
                        </div>                                                        
                    )}                                    

                    {isLightboxVisible && (
                        <Lightbox 
                            product={product} 
                            isLightboxVisible={isLightboxVisible} 
                            toggleLightbox={() => toggleLightbox(imageIndex)}  
                            slideTopAnimation={slideTopAnimation}
                            imgIndex={imageIndex}  
                        />
                    )}                        
                    
                    <Modal
                        isModalVisible={isModalVisible} 
                        onBackdropClick={toggleModal}   
                        content={modalType}
                    />  

                </Fragment>

            )}

        </Fragment>    

    )

}

export default ProductDetails
