import s from '../header.module.scss'
import logoImg from './logo.png'
import { NavLink } from 'react-router-dom'

const Logo = () =>{
return (
    <div className={s.header_logo}>
        <NavLink to='/'>
            <img className={s.header_logo_img} src={logoImg} alt="logo" title="logo"/>
        </NavLink>
    </div>
)
}

export default Logo