import './Header.css';

export default function Header(){

    return(
        <div className="header" id="header">
            <img src="./logoHNew_bis.jpg" alt="headerPicture"/>
            <div className="headerTitle">
                <a href='/'>My Afro Blog</a>
            </div>
            <div className="subHeaderTitle">
                Le blog afro par excellence
            </div>
        </div>
    );
}