import './Header.css';
import {useHistory} from "react-router-dom";


export default function Header(){

    const history = useHistory();
    const handleHome = () => {
        history.push({ pathname:'/'});
    }

    return(
        <div className="header">
            <div className="headerTitle">
                <a href={handleHome}>My Afro Blog</a>
            </div>
            <div className="subHeaderTitle">
                Le blog afro par excellence
            </div>
        </div>
    );
}