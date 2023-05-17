import React from 'react';
import '../styles.css';
const Layout = ({title='Title',description='Description',className,children}) => {
    return ( <div>
        <div className='jumbotron'>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <div className={className}>
            {children}
        </div>
    </div> );
}
 
export default Layout;