import { NavLink } from 'react-router-dom';

export default function Nav() {
    return(
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/signup'>Sign Up</NavLink></li>
                <li><NavLink to='/login'>Login</NavLink></li>
            </ul>
        </nav>
    )
}
