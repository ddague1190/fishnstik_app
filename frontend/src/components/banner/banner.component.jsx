import './banner.styles.scss';

const companies = [
    'ROSCO',
    'AFTCO',
    'SAMPO'
]

const Banner = () => (
    <div className='banner'>
        <div className='banner__brands'>
            <span className='banner__brands--catchphrase'>The best brands...</span>
            <div className='banner__brands--blackbox'></div>
        </div>
        <div className='banner__companylogos'>
                {companies.map((company, index) => (
                    <img key={index} src={require(`../../images/${company}.png`)} alt={company} />
                ))}
        </div>
        <div className='banner__advise'>
            <span>Call us (561) 686-7845</span>
        </div>
        <div className='banner__manufacturing'>
            <div className='banner__manufacturing--worldclass'>Worldclass snaps made in-house to order</div>
            <div className='banner__manufacturing--flag'>
                <img src={require(`../../images/usmade.png`)} alt='made_in_usa' />
            </div>
        </div>
 
    </div>
)

export default Banner;