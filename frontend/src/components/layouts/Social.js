import React, { Fragment }  from 'react'
import IconButton           from '@mui/material/IconButton'
import TwitterIcon          from '@mui/icons-material/Twitter'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'

const Social = () => {

    return (

        <Fragment>

            <IconButton color="primary">
                <a 
                    href={process.env.REACT_APP_FACEBOOK} 
                    target="_biank"
                    style={{ fontSize: 0 }}
                >
                    <FacebookOutlinedIcon/>
                </a>
            </IconButton>
            
            <IconButton color="primary">
                <a 
                    href={process.env.REACT_APP_TWITTER} 
                    target="_biank"
                    style={{ fontSize: 0 }}
                >
                    <TwitterIcon/>
                </a>
            </IconButton>

        </Fragment>

    )

}

export default Social
