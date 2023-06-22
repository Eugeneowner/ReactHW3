import s from "./list.module.scss"
import starIcon from "./img/favorite.png"
// import gohstImg from "./img/ghost.webp"
const ListItem = (props) => {
    const isWish = props.wishList.indexOf(props.id) 
    const isBuy =  props.basketList.indexOf(props.id)
    const renderWish = () => {
        if (isWish === -1){
            return(
                <button onClick = {() =>{props.handleWish(props.id)}} className={s.main_products_item_container_btn}>Add to wish</button> 
            )
        } else { 
            return (
                <button onClick={() => {props.handleRemoveWish(props.id)}} className={s.main_products_item_container_btn}>
                    <img className={s.main_products_item_container_btn_img} src={starIcon} alt="star" />
                </button>
            )
        }
    }
    const renderBuy =() => {
        if (isBuy === -1){
            return (
                <button onClick = {()=>{props.handleBuy(props.id)}} className={s.main_products_item_container_btn}>Buy now</button>
            )
            
        } else {
            return (
                <button onClick = {()=>{props.handleRemoveBasket(props.id)}} className={s.main_products_item_container_btn}>Buy cancel</button>
            )
         }
    }
    return (
        <div className={s.main_products_item}>
                <img className={s.main_products_item_img} src={props.img} alt=""/>
                <div className={s.main_products_item_container}>
                    <p className={s.main_products_item_container_name}>{props.name}</p>
                    <p className={s.main_products_item_container_price}>{props.price} $</p>
                    {renderWish()}
                    {renderBuy()}
                    
                    
                </div>
                
        </div>
    )
}

export default ListItem