import { Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Load } from "../../componentes/load/load";
import {
    getTokenApi,
    obtenidusuarioLogueado,
} from "../../api/auth";
import { obtenerUsuario, eliminarUsuario } from "../../api/usuarios";
import { toast } from "react-toastify";

export function BorrarCuenta() {

    //load
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula una carga de datos
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const [formData, setFormData] = useState();

    const obtenerDatosUsuario = () => {
        try {
            obtenerUsuario(obtenidusuarioLogueado(getTokenApi())).then(response => {
                const { data } = response;
                setFormData(data);
            }).catch((e) => {
                if (e.message === 'Network Error') {
                    //console.log("No hay internet")
                    console.log("Conexión al servidor no disponible");
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        obtenerDatosUsuario();
    }, []);

    //const [confirmDelete, setConfirmDelete] = useState(false);

    const confirmDelete = () => {
        const result = window.confirm('¿Estás seguro de que quieres eliminar la cuenta?');
    
        if (result) {
          handleDelete();
        }
      };

    const handleDelete = async () => {
        try {
          setLoading(true);
          const response = await eliminarUsuario(formData._id);
          const { data } = response;
          alert(data.mensaje); // Puedes cambiar esto por un mensaje más personalizado si lo deseas
          setLoading(false);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            {loading && <Load />}
            <div className="contact-form">
                <Form >
                    <br />
                    <Form.Control
                        placeholder="Nombre"
                        type="text"
                        name="nombreUser"
                        value={formData?.nombre}
                        disabled
                    // defaultValue={formData.nombre}
                    />
                    <br />
                    <Form.Control
                        placeholder="Rol"
                        type="text"
                        name="rolUser"
                        value={formData?.admin == "true" ? "Administrador" : "Cliente"}
                        disabled
                    //defaultValue={formData.correo}
                    />
                    <br />
                    <Form.Control
                        placeholder="Email"
                        type="email"
                        name="correoUser"
                        value={formData?.email}
                        disabled
                    //defaultValue={formData.correo}
                    />
                    <br />
                    <Form.Control
                        placeholder="Contraseña"
                        type="password"
                        name="contraseñaUser"
                        value={formData?.contraseña}
                        disabled
                    //defaultValue={formData.contraseña}
                    />

                    <label></label>
                    <input className="submit" onClick={confirmDelete} value="Eliminar cuenta" type="submit" />
                </Form>
            </div>
        </>
    );
}
