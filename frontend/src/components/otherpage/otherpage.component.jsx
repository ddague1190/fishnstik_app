import { LinkElement } from '../navBarElement/navBarElement.component';
import './otherpage.styles.scss'

const categories = [
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
    },
]

const OtherPage = () => {

    return (
    <div className='otherpage'>
    {  
        categories.map(({keyword, title}, index) => (
            <LinkElement to={`/products/?keyword=${keyword}`}>{title}</LinkElement>
        ))
    }
    </div>
    )
};

export default OtherPage;