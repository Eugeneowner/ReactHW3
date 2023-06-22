import s from './header.module.scss'

import Logo from './logo/logo'
import Nav from './nav/nav'
import Buttons from './buttons/buttons'

const Header = (props) => {
    return (
        <header className={s.header}>
            <Nav/>
            <Logo/>
            <Buttons 
            countBuy = {props.countBuy} 
            countWish = {props.countWish}
            />
            {/* <button onClick={()=>localStorage.clear()}>Clear</button> */}
        </header>
    )
}

export default Header