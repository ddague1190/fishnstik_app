import './banner.styles.scss';
import Featured from '../featured/featured.component';
import Figure from '../figure/figure.component';

const companies = [
    {
        'company': 'AFTCO',
        'image': 'https://fishnstik-pictures.s3.amazonaws.com/AFTCO.png'
    },
    {
        'company': 'ROSCO',
        'image': 'https://fishnstik-pictures.s3.amazonaws.com/ROSCO.png'
    },
    {
        'company': 'SAMPO',
        'image': 'https://fishnstik-pictures.s3.amazonaws.com/SAMPO.png'
    },
]

const Banner = () => (
    <div className='banner'>
        
        <div className='hero'>
            <header>
                <h1>
                    Wholesale Fishing and Terminal Tackle
                </h1>
            </header>
        </div>

        <Featured />

        <div className='companylogos'>
            <div className='companylogos__images'>
                {companies.map(({company, image}, index) => (
                    <img key={index} src={image} alt={company} />
                ))}
            </div>
            <div className='companylogos__description'>
               <h1>We carry the best brands ... </h1> 
               <h4>because you don't always get a do-over.</h4>
            </div>
        </div>
        <div className='banner__cards'>
            <div className='banner__advise'>
                <img src={'https://fishnstik-pictures.s3.amazonaws.com/expert.png'} alt='advise'/>
                <h1>Contact us</h1>
                <h3>(561) 686-7845</h3>
            </div>
            <div className='banner__manufacturing'>
                <img src={'https://fishnstik-pictures.s3.amazonaws.com/USMADE.png'} alt='advise'/>
                <h3>We make the world's best snaps right in house</h3>
            </div>  
        </div>

 
    </div>
)

export default Banner;