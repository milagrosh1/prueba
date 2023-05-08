import './ItemCount.css'
import { useState } from 'react';

const ItemCount = ({ inicial, stock, funcionAgregar }) => {
    const [contador, setContador] = useState(inicial);
    console.log(contador);

    const incrementar = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    }

    const decrementar = () => {
        if (contador > inicial) {
            setContador(contador - 1);
        }
    }
    return (
        <>
            <div className="itemContador">
                <button onClick={decrementar}> - </button>
                <p> {contador} </p>
                <button onClick={incrementar}> + </button>
            <button onClick={() => funcionAgregar(contador)} >Agregar al Carrito</button>
            </div>
        </>
    )
}

export default ItemCount
