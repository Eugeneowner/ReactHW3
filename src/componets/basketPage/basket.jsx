import s from './basket.module.scss'
import ListItem from '../list/listItem';
import { Fragment } from "react";
const Basket = (props) => {
    const autoBuy = props.auto.filter(autoItem => {
        if (props.basketList.indexOf(autoItem.id) !== -1){
            return autoItem
        }
    })
    
    const AutoCollections = autoBuy.map(autoItem => {
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
    }) 
    return (
     <Fragment>
         <h1 style={{textAlign:"center", display:"block", color:"#352F40"}}>Basket</h1>
        <div className={s.main_products}>
            {
                AutoCollections
            }
        </div>
    </Fragment>
    )
}
export  default Basket