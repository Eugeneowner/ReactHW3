import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';

import Header from './componets/header/header';
import List from './componets/list/list';
import Modal from './componets/modal/modal';
import Wish from './componets/wishPage/wish';
import Basket from './componets/basketPage/basket';

const App = () => {

    const [state, setState] = useState({
        auto: [],
        isBuy: false,
        isWish : false,
        buyCandidate: null,
        wishCandidate: null,
        basketList: JSON.parse(
            localStorage.getItem('basketList') 
        ),
        wishList: JSON.parse(
            localStorage.getItem('wishList')
        ),
        countBuy: parseInt(localStorage.getItem('countBuy')),
        countWish: parseInt(localStorage.getItem('countWish'))
    })
    useEffect(()=>{
        axios.get('/auto.json')
            .then(res=>{
                setState({
                    ...state,
                    auto: [
                        ...res.data
                    ]
                })
            })
    }, [])
    const handleBuy = (idCandidate) => {
        setState({
            ...state,
            isBuy: true,
            buyCandidate: idCandidate
        })
    }
    const handleWish = (idCandidate) => {
        setState({
            ...state,
            isWish: true,
            wishCandidate: idCandidate
        })
    }
    const handleRemoveWish = (idCandidate) => {
        setState({
            ...state,
            wishList: state.wishList.filter((id) => id !== idCandidate),
            countWish: state.countWish -1
            
        })
        localStorage.setItem('countWish', state.countWish);
        localStorage.setItem('wishList', JSON.stringify(state.wishList))
    }

    const handleRemoveBasket = (idCandidate) => {
        setState({
            ...state,
            basketList: state.basketList.filter((id) => id !== idCandidate),
            countBuy: state.countBuy -1
        })
        localStorage.setItem('basketList', JSON.stringify(state.basketList))
        localStorage.setItem('countBuy',state.countBuy)
    }
    const confirmOrder = () => {
        setState({
            ...state,
            basketList: [
                ...state.basketList,
                state.buyCandidate
            ],
            countBuy: state.countBuy +1,
            buyCandidate: null,
            isBuy: false
        }) 
        localStorage.setItem('countBuy', state.countBuy)
        localStorage.setItem('basketList', JSON.stringify(state.basketList))

    }

    const confirmAddWish = () => {
        setState({
            ...state,
            wishList: [
                ...state.wishList,
                state.wishCandidate
            ],
            countWish: state.countWish + 1,
            wishCandidate: null,
            isWish: false
        })
        localStorage.setItem('countWish', state.countWish);
        localStorage.setItem('wishList', JSON.stringify(state.wishList))
    }
    const handleBuyCancel = () =>{
        setState({
            ...state,
            isBuy: false,
            buyCandidate: null
        })
    } 
    
    const handleWishCancel = () =>{
        setState({
            ...state,
            isWish: false,
            wishCandidate: null
        })

    }
    const firstModal = {
        title : "Buy you Rolls-Royce",
        text : "BUY NOW..."
    }
    const secondModal = {
        title : "Wish list",
        text : "Confirm add to wish list"
    }
    return (
        <Fragment>
            <BrowserRouter>
                <Header 
                    countBuy = {state.countBuy}
                    countWish = {state.countWish}
                />

                <main>
                    {state.isBuy ?
                    <Modal
                    handleConfirm = {confirmOrder}
                    handleClickClose={handleBuyCancel}
                    title = {firstModal.title}
                    text = {firstModal.text}
                    />
                    : null}
                    
                    {state.isWish ?
                    <Modal
                    handleConfirm = {confirmAddWish}
                    handleClickClose={handleWishCancel}
                    title = {secondModal.title}
                    text = {secondModal.text}
                    />
                    : null}
                    <Routes>
                        <Route 
                            path='/'
                            element = {
                                <List 
                                handleBuy = {handleBuy}
                                handleWish = {handleWish}
                                handleRemoveWish= {handleRemoveWish}
                                handleRemoveBasket= {handleRemoveBasket}
                                auto={state.auto}
                                wishList={state.wishList}
                                basketList={state.basketList}
                                />
                            }
                        />
                        <Route path='/wishlist'
                            element = {
                                <Wish
                                    handleBuy = {handleBuy}
                                    handleWish = {handleWish}
                                    handleRemoveWish= {handleRemoveWish}
                                    handleRemoveBasket= {handleRemoveBasket}
                                    auto={state.auto}
                                    wishList={state.wishList}
                                    basketList={state.basketList}
                                />

                            }
                        />
                        <Route path='/basket'
                        element = {
                            <Basket
                                handleBuy = {handleBuy}
                                handleWish = {handleWish}
                                handleRemoveWish= {handleRemoveWish}
                                handleRemoveBasket= {handleRemoveBasket}
                                auto={state.auto}
                                wishList={state.wishList}
                                basketList={state.basketList}
                            />
                        }
                        
                        />
                    </Routes>
                    
                </main>
            </BrowserRouter>
        </Fragment>
    )
}
export default App