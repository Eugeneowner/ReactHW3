import { Component, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';

import Header from './componets/header/header';
import List from './componets/list/list';
import Modal from './componets/modal/modal';
import Wish from './componets/wishPage/wish';
import Basket from './componets/basketPage/basket';


class App extends Component {
    state = {
        auto: [],
        isBuy: false,
        isWish : false,
        buyCandidate: null,
        wishCandidate: null,
        basketList: [],
        wishList: [],
        countBuy: parseInt(localStorage.getItem('countBuy')),
        countWish: parseInt(localStorage.getItem('countWish'))
    };
    componentDidMount(){
        axios.get('/auto.json')
            .then(res=>{
                console.log(res.data)
                res.data = res.data.map(auto => {
                    auto.id = nanoid()
                    return auto
                })
                this.setState({
                    ...this.state,
                    auto: [
                        ...res.data
                    ]
                })
            })
    }
    render() {
        const handleBuy = (idCandidate) => {
            this.setState({
                ...this.state,
                isBuy: true,
                buyCandidate: idCandidate
            })
        }
        const handleWish = (idCandidate) => {
            this.setState({
                ...this.state,
                isWish: true,
                wishCandidate: idCandidate
            })
        }
        const confirmOrder = () => {
            this.setState({
                ...this.state,
                basketList: [
                    ...this.state.basketList,
                    this.state.buyCandidate
                ],
                countBuy: this.state.countBuy +1,
                buyCandidate: null,
                isBuy: false
            }, () =>{
                    localStorage.setItem('countBuy', this.state.countBuy) 
            }) 

        }

        const confirmAddWish = () => {
            this.setState({
                ...this.setState,
                wishList: [
                    ...this.state.wishList,
                    this.state.wishCandidate
                ],
                countWish: this.state.countWish + 1,
                wishCandidate: null,
                isWish: false
            
            }, () => {
                localStorage.setItem('countWish', this.state.countWish);
            })
        }
        const handleBuyCancel = () =>{
            this.setState({
                ...this.state,
                isBuy: false,
                buyCandidate: null
            })
        } 
        const handleWishCancel = () =>{
            this.setState({
                ...this.state,
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
                        countBuy = {this.state.countBuy}
                        countWish = {this.state.countWish}
                    />

                    <main>
                        {this.state.isBuy ?
                        <Modal
                        handleConfirm = {confirmOrder}
                        handleClickClose={handleBuyCancel}
                        title = {firstModal.title}
                        text = {firstModal.text}
                        />
                        : null}
                        
                        {this.state.isWish ?
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
                                    auto={this.state.auto}
                                    wishList={this.state.wishList}
                                    />
                                }
                            />
                            <Route path='/wishlist'
                                element = {
                                    <Wish/>
                                }
                            />
                            <Route path='/basket'
                            element = {
                                <Basket/>
                            }
                            
                            />
                        </Routes>
                        
                    </main>
                </BrowserRouter>
            </Fragment>
        )
    }
}
export default App  