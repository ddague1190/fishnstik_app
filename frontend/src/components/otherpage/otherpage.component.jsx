import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './otherpage.styles.scss'

const categories = {
    'snaps': [    
        {
            'subcategory': 'fishnstik',
            'title': 'FishNStik Snaps'
        },
        {
            'subcategory': 'coastlock',
            'title': 'CoastLock'
        },
    ],

    'swivels': [    
        {
            'subcategory': 'barrel',
            'title': 'Barrel'
        },
        {
            'subcategory': 'bearing',
            'title': 'Bearing'
        },
    ],

    'fishingline': [    
        {
            'subcategory': 'sleeves',
            'title': 'Sleeves'
        },
        {
            'subcategory': 'collet',
            'title': 'Collets'
        },
        {
            'subcategory': 'Glove',
            'title': 'Gloves'
        },
        {
            'subcategory': 'rod',
            'title': 'Rods'
        }
    ],
    'hooks': [    
        {
            'subcategory': 'mudstad',
            'title': 'Mudstad'
        },
        {
            'subcategory': 'collet',
            'title': 'Collets'
        },
        {
            'subcategory': 'Glove',
            'title': 'Gloves'
        },
        {
            'subcategory': 'rod',
            'title': 'Rods'
        }
    ],
        'lures': [    
        {
            'subcategory': 'sleeves',
            'title': 'Sleeves'
        },
        {
            'subcategory': 'collet',
            'title': 'Collets'
        },
        {
            'subcategory': 'Glove',
            'title': 'Gloves'
        },
        {
            'subcategory': 'rod',
            'title': 'Rods'
        }
    ]
}





const SubcategoriesList = ({category}) => {
    const [activeIndex, setActiveIndex] = useState(NaN);
    useEffect(()=>{
        setActiveIndex(NaN)
        return ()=>setActiveIndex(NaN)
    }, [category])
    return (
    <div className='otherpage'>
    {  
        categories[category].map(({subcategory, title}, index) => (
            <Link 
                key={index}
                onClick={()=> setActiveIndex(index)}
                className={`otherpage__link ${index===activeIndex ? 'otherpage__link--active' : ''}`}
                to={`/products/${category}/${subcategory}`}
            >
                {title}
            </Link>
        ))
    }
    </div>
    )
};

export default SubcategoriesList;