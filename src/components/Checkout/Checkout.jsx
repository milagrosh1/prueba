import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../CartContext/CartContext";
import { db } from "../../Services/firebase/config";
import { collection, addDoc } from "firebase/firestore";


const Checkout = () => {
    const { carrito, vaciarCarrito } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor complete todos los campos.");
            return;
        }

        if (email !== emailConfirmacion) {
            setError("Los campos de correo electrónico no coinciden.");
            return;
        }

        const orden = {
            items: carrito.map((producto) => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad,
            })),
            total: carrito.reduce(
                (total, producto) => total + producto.item.precio * producto.cantidad,
                0
            ),
            nombre,
            apellido,
            telefono,
            email,
        };

        addDoc(collection(db, "ordenes"), orden)
            .then((docRef) => {
                setOrdenId(docRef.id);
                vaciarCarrito();
            })
            .catch((error) => {
                console.error("Error al crear la orden: ", error);
                setError(
                    "Se produjo un error al crear la orden. Por favor, inténtelo de nuevo."
                );
            });
    };


    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                {carrito.map((producto) => (
                    <div key={producto.item.id}>
                        <p>
                            {producto.item.nombre} x {producto.cantidad}
                        </p>
                        <p>Precio unitario: ${producto.item.precio}</p>
                        <hr />
                    </div>
                ))}

                <hr />
                <div>
                    <label>
                        Nombre:
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Apellido:
                        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Teléfono:
                        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Correo electrónico:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Confirmar correo electrónico:
                        <input
                            type="email"
                            value={emailConfirmacion}
                            onChange={(e) => setEmailConfirmacion(e.target.value)}
                        />
                    </label>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Finalizar compra</button>
            </form>
            {ordenId && (
                <div>
                    <p>¡Gracias por tu compra! Tu número de orden es {ordenId}.</p>
                </div>
            )}
            <Link to="/">Seguir comprando</Link>
        </div>
    );
};

export default Checkout;