import s from '../header.module.scss'
const Nav = () => {
    return (
        <nav className={s.header_nav}>
            <ul className={s.header_nav_list}>
                <li>MODEL</li>
                <li>SHOP</li>
                <li>OWNERSHIP</li>
                <li>CONTACT</li>
            </ul>
        </nav>
    )
}

export default Nav