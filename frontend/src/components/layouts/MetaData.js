import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title, description, noIndex=false }) => {

    return (
        
        <Helmet>
            <title>{`${title} - ${process.env.REACT_APP_SITE_NAME}`}</title>
            <meta 
                name="description" 
                content={description 
                    ? description.replace(/(<([^>]+)>)/gi, "").substring(0, 155) + '...' 
                    : process.env.REACT_APP_SITE_DESCRIPTION
                } 
            />
            {noIndex === true && (
                 <meta name="robots" content="noindex" />
            )}           
        </Helmet>

    )

}

export default MetaData