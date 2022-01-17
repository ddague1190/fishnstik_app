import './logo.styles.scss';

const Logo = () => (
     
<div className='logopanel'>
    <div className='logopanel--logo'>
        <img src={require('../../images/descriptlogo.png')} />
    </div>
    <div className='logopanel--description'>
        <p>wholesale tackle</p>
        <p>&</p>
        <p>custom tackle manufacturing</p>
    </div>
</div>
);

export default Logo;