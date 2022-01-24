import React from 'react';
import {useLocation} from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './paginate.styles.scss';

function Paginate({pages, page}) {


    const {pathname, search} = useLocation();
    
    const route = search ? `/products/${search}` : pathname;

    return ( pages>1 && (
        <div className='pagination u-margin-top-medium'>
            <Pagination>
                {[...Array(pages).keys()].map((x)=> (
                    <LinkContainer 
                        key={x+1}
                        to={`${route}&page=${x+1}`}
                    >   
                        <Pagination.Item
                            active={x+1 === page}
                        >
                            {x+1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        </div>
        )
    )
}

export default Paginate
