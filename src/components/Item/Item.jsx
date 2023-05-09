import "./Item.css"
import { Link } from "react-router-dom";
import { useState, useContext } from 'react'
import { CarritoContext } from '../CartContext/CartContext'
import ItemCount from "../ItemCount/ItemCount";


const Item = ({ nombre, id, precio, img, stock }) => {

    const [agregarCantidad, setAgregarCantidad] = useState(0);


    const { agregarProducto } = useContext(CarritoContext);



    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad);


        const item = { id, nombre, precio, stock};
        agregarProducto(item, cantidad);
    }

    return (
        <div className='prod'>
            <div className="card">
                <img className="card-img" src={img} alt="" />
                <h2 className="card-name">{nombre}</h2>
                <p className="card-precio">${precio}</p>
                <p className="card-id">{id}</p>
                <p className="card-stock">{stock}</p>
                <div className="card-btn">
                    <Link to={`/item/${id}`} className="btn">Ver Detalle</Link>
                    {
                        agregarCantidad > 0
                            ? <><button className="btnProducto"><Link to="/cart">En carrito 🛒</Link></button></>
                            : <ItemCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Item;