import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CarritoContext } from '../CartContext/CartContext'
import CartItem from '../CartItem/CartItem'
const Cart = (img) => {

    const {carrito, vaciarCarrito} = useContext(CarritoContext);

    const totalCant = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    const total = carrito.reduce((total , producto) => total + (producto.item.precio * producto.cantidad), 0);

    if(totalCant === 0){
        return (
            <>
                <h2>No hay productos</h2>
                <Link to='/'>Productos</Link>
            </>
        )
    }

    return (
    <div>
        <img src={img} alt="" />
        {carrito.map(producto => <CartItem key={producto.id} {...producto} />)}
        <h3>Total: ${total}</h3>
        <button onClick={() => vaciarCarrito()}>Vaciar Carrito</button>
        <Link to='/checkout'>Finalizar Compra</Link>
    </div>
    )
}

export default Cart