import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from '../admin/Sidebar'
import FormattedPrice from '../layouts/FormattedPrice'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Dashboard = () => {

    const dispatch = useDispatch()
    const { users                        } = useSelector( state => state.allUsers  )
    const { products                     } = useSelector( state => state.products  )    
    const { loading, orders, totalAmount } = useSelector( state => state.allOrders ) 

    let outOfStock = 0
    products && products.forEach(product => {
        if(product.stock === 0) {
            outOfStock += 1;
        }
    })

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center'
      }))

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])

    return (

        <Fragment>              

            <MetaData title={'Admin Dashboard'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>

                        <Sidebar />

                    </aside>

                    <article className="relative dashboard-panels">

                        {loading ? <Loader /> : (
                    
                            <Fragment>

                                <h1>Dashboard</h1>  

                                <Box sx={{ width: '100%' }}>

                                    <Grid container>
                                        <Grid item xs={12} sx={{ mb: 2 }}>
                                            <Item  sx={{ background: 'var(--primary-color)' }}>

                                                <div>
                                                    <h3>Total Amount</h3>
                                                    <h2>{totalAmount && <FormattedPrice number={totalAmount} />}</h2>
                                                </div>
                                                                                                  
                                            </Item>
                                        </Grid>

                                        <Grid container columnSpacing={2}>

                                            <Grid item xs={12} md={3} sx={{ mb: 2 }}>
                                                <Item sx={{ background: 'var(--cta-green)' }}>
                                                    <Link to="/admin/products">   

                                                        <div>
                                                            <h3>Artwork</h3>
                                                            <h2>{products && products.length}</h2>
                                                            <Button 
                                                                size="small" 
                                                                sx={{ color: 'white', width: '100%' }}
                                                            >
                                                                View Details
                                                            </Button>
                                                        </div>  
                                                
                                                    </Link>
                                                </Item>
                                            </Grid> 

                                            <Grid item xs={12} md={3} sx={{ mb: 2 }}>
                                                <Item sx={{ background: '#ffbb00'}}>
                                                    <Link to="/admin/orders">  

                                                        <div>
                                                            <h3>Orders</h3>
                                                            <h2>{orders && orders.length}</h2>
                                                            <Button 
                                                                size="small" 
                                                                sx={{ color: 'white', width: '100%' }}
                                                            >
                                                                View Details
                                                            </Button>
                                                        </div>                                                                      
                                                                                                
                                                    </Link>
                                                </Item>
                                            </Grid>

                                            <Grid item xs={12} md={3} sx={{ mb: 2 }}>
                                                <Item sx={{ background: '#66aff5'}}>
                                                    <Link to="/admin/users">  

                                                        <div>
                                                            <h3>Users</h3>
                                                            <h2>{users && users.length}</h2>
                                                            <Button 
                                                                size="small" 
                                                                sx={{ color: 'white', width: '100%' }}
                                                            >
                                                                View Details
                                                            </Button>
                                                        </div> 
                                                       
                                                    </Link>
                                                </Item>
                                            </Grid>                                            

                                            <Grid item xs={12} md={3}>
                                                <Item sx={{ background: '#ea4845' }}>

                                                    <div>
                                                        <h3>Out of Stock</h3>
                                                        <h2>{outOfStock}</h2>
                                                        <Button 
                                                            size="small" 
                                                            sx={{ color: 'white', width: '100%' }}
                                                        >
                                                            &nbsp;
                                                        </Button>
                                                    </div>
                                                    
                                                </Item>
                                            </Grid>

                                        </Grid>

                                    </Grid>

                                </Box>  

                            </Fragment>

                            )}                                                              
                        
                    </article>
                    
                </div>

            </div>                
            
        </Fragment>

    )

}

export default Dashboard
