import Figure from '../figure/figure.component';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './varianttable.styles.scss';

const VariantTable = ({product, selectionVariantTable, checkedState}) => {
    return (
        <Table hover className='varianttable'>
            <thead>
                <tr className='varianttable__header'>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Price / each</th>
                </tr>
            </thead>

            <tbody>
        {product.variants.map((variant, index) => (
            <tr 
            onClick={()=> selectionVariantTable(index)} 
            className={`varianttable__data ${checkedState[index] ? 'marked' : ''}`}
            key={variant._id}
            >
                <td>
                    <Figure image={variant.image} alt={variant.name} height='120px'/>
                </td>
                <td>
                    {variant.description}
                    <br />
                    {variant.relatedProductLink && (
                    <Link to={`/product/${product._id}`} className='btn-sm small green'>Related product link</Link>
                    )}
                </td>
                <td className='smallscreenRow'>
                    {variant.price}
                </td>
            </tr>
        ))}
            </tbody>
        </Table>
    )
}

export default VariantTable;