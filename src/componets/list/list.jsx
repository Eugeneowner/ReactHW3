import s from './list.module.scss'
import ListItem from './listItem'

const List = (props) => {
    let AutoCollections = []
    if (props.auto){
     AutoCollections = props.auto.map(autoItem => {
        return (
            <ListItem
                key = {autoItem.id}
                handleBuy = {props.handleBuy}
                handleWish = {props.handleWish}
                handleRemoveBasket = {props.handleRemoveBasket}
                handleRemoveWish = {props.handleRemoveWish}
                id = {autoItem.id} 
                img={autoItem.img} 
                name={autoItem.name}
                price={autoItem.price}
                wishList = {props.wishList}
                basketList = {props.basketList}
            />
        )
    }) } 
    return (
        <div className={s.main_products}>
            {AutoCollections}
        </div>
    )
}

export default List