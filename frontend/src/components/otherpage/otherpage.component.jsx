import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './otherpage.styles.scss'

const categories = {
    'snap': [    
        {
            'keyword': 'sleeve',
            'title': 'FishNStik Snaps',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'collet',
            'title': 'FishNStik Bucks',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'CoastLock',
            'title': 'CoastLock',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'rod',
            'title': 'Rosco Oh-Snap',
            'description': '',
            'image': ''
        }
    ],

    'swivel': [    
        {
            'keyword': 'sleeve',
            'title': 'Barrel',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'collet',
            'title': 'Bearing',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'Glove',
            'title': 'Top shelf',
            'description': '',
            'image': ''
        },

    ],

    'line': [    
        {
            'keyword': 'sleeve',
            'title': 'Sleeves',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'collet',
            'title': 'Collets',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'Glove',
            'title': 'Gloves',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'rod',
            'title': 'Rods',
            'description': '',
            'image': ''
        }
    ],
    'hook': [    
        {
            'keyword': 'sleeve',
            'title': 'Mudstad',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'collet',
            'title': 'Collets',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'Glove',
            'title': 'Gloves',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'rod',
            'title': 'Rods',
            'description': '',
            'image': ''
        }
    ],
        'lure': [    
        {
            'keyword': 'sleeve',
            'title': 'Sleeves',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'collet',
            'title': 'Collets',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'Glove',
            'title': 'Gloves',
            'description': '',
            'image': ''
        },
        {
            'keyword': 'rod',
            'title': 'Rods',
            'description': '',
            'image': ''
        }
    ]
}





const CategoriesList = ({category}) => {
    const [activeIndex, setActiveIndex] = useState(NaN);
    useEffect(()=>{
        setActiveIndex(NaN)
    }, [category])
    return (
    <div className='otherpage'>
    {  
        categories[category].map(({keyword, title}, index) => (
            <Link 
                onClick={()=> setActiveIndex(index)}
                className={`otherpage__link ${index===activeIndex ? 'active' : ''}`}
                to={`/products/?keyword=${keyword}`}
            >
                {title}
            </Link>
        ))
    }
    </div>
    )
};

export default CategoriesList;