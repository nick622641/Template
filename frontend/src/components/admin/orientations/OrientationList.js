import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryTwos, deleteCategoryTwo, clearErrors } from '../../../actions/categoryActions'
import { DELETE_CATEGORYTWO_RESET } from '../../../constants/categoryConstants'
import MetaData from '../../layouts/MetaData'
import Loader from '../../layouts/Loader'
import Sidebar from '../Sidebar'
import Modal from '../../modals/Modal'
import Confirm from '../../modals/Confirm'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import { Tooltip } from '@mui/material'
import CopyToClipboard from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const OrientationList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, categoryTwos  }  = useSelector( state => state.categoryTwos )
    const { error: deleteError, isDeleted } = useSelector( state => state.categoryTwo )

    const [ isModalVisible,  setIsModalVisible ] = useState(false)
    const [ id,              setId             ] = useState('')
    const [ fullscreen,      setFullscreen     ] = useState(false)

    useEffect(() => {

        dispatch(getCategoryTwos())

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        } 
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }      
        if(isDeleted) {
            alert.success('Orientation Deleted Successfully')            
            dispatch({ type: DELETE_CATEGORYTWO_RESET })
        }

    }, [dispatch, navigate, alert, error, isDeleted, deleteError])

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategoryTwo(id))
    }

    const setCategories = () => {
        const data = {
            columns: [                
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 150                  
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                }                
            ],
            rows: []
        }   
        categoryTwos && categoryTwos.forEach( orientation => {
            data.rows.push({                
                actions: 
                <Fragment>  
                    <CopyToClipboard text={orientation._id}>
                        <IconButton onClick={() => alert.success('ID Copied')}>
                            <Tooltip title="Copy ID" arrow>
                                <ContentCopyIcon color="primary" />  
                            </Tooltip>
                        </IconButton>                    
                    </CopyToClipboard> 
                    <Link to={`/admin/orientation/${orientation._id}`}>
                        <Tooltip title="Update" arrow>
                            <IconButton>
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Link> 
                    <Tooltip title="Delete" arrow>
                        <IconButton 
                            onClick={() => {
                                setIsModalVisible(!isModalVisible)
                                setId(orientation._id)
                            }}
                        >
                            <DeleteOutlineIcon color="danger" />
                        </IconButton> 
                    </Tooltip>  
                </Fragment>,
                name: orientation.name 
            })
        })

        return data
    }    

    return (

        <Fragment>

            <MetaData title={'All Orientations'} noIndex={true} />

            <div className="container">

                <div className="wrapper parent">

                    <aside>
                        
                        <Sidebar />
                        
                    </aside>            

                    <article className={fullscreen ? 'fullscreen relative' : 'relative'}>
                        
                        {loading ? <Loader /> : (

                            <div className="user-form cart">

                                <h1>Orientation Category</h1>

                                <p className="text-right">
                                    <Link to="/admin/orientation">
                                        Add
                                        <IconButton>
                                            <AddIcon />
                                        </IconButton>
                                    </Link>
                                </p>  

                                <MDBDataTableV5 
                                    data={setCategories()}   
                                    fullPagination   
                                    scrollX  
                                    // scrollY   
                                    searchTop
                                    searchBottom={false}  
                                />

                                <Link to="/admin/dashboard">
                                    <Fab 
                                        size="small" 
                                        className="close" 
                                        color="primary"
                                        sx={{ position: 'absolute', top: 10, right: 10 }}
                                    >
                                        <CloseIcon />
                                    </Fab>
                                </Link>

                                <Tooltip title="Expand" arrow>
                                    <IconButton 
                                        color="primary" 
                                        sx={{ position: 'absolute', top: 10, left: 10 }}
                                        onClick={() => setFullscreen(!fullscreen)}
                                    >
                                        <FitScreenIcon />
                                    </IconButton>
                                </Tooltip>

                            </div>

                        )}

                    </article>

                </div>

            </div>

            <Modal
                isModalVisible={isModalVisible} 
                onBackdropClick={toggleModal}   
                content={
                    <Confirm 
                        onBackdropClick={toggleModal} 
                        onConfirm={() => deleteCategoryHandler(id)} 
                        message="Delete Orientation"
                    />
                }
            />
            
        </Fragment>

    )

}

export default OrientationList
