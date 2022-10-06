import Logo from '../assets/task-logo.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logOut } from '../redux/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <header className="header">
            <img src={Logo} alt="logo png" className="logo" />
            <div className="header__links">
                <Link to="/" className="header__link">Home</Link>
                {!user && <Link to="/login" className="header__link header__auth">Login</Link>}
                {user && <Link to="/posts" className="header__link">Posts</Link>}
                {user && <Link onClick={() => dispatch(logOut())} className="header__link header__auth">Logout</Link> }
            </div>
        </header>
    )
}

export default Header;