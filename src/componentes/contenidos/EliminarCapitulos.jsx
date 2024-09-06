import { useState } from 'react';
import { Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import PropTypes from 'prop-types';
import { eliminarCapitulosSeries } from "../../api/capitulosSeries";
import queryString from "query-string";
import { toast } from 'react-toastify';

function EliminarCapitulos(props) {
    const { setShowModal, history, data } = props;

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            eliminarCapitulosSeries(data[0])
                .then((response) => {
                    const { data } = response;
                    toast.success(data.mensaje);

                    history({
                        search: queryString.stringify(""),
                    });
                    setLoading(false);
                    setShowModal(false);
                })
                .catch((e) => {
                    console.log(e);
                    if (e.message === "Network Error") {
                        toast.error("Conexión al servidor no disponible");
                        setLoading(false);
                    } else if (e.response && e.response.status === 401) {
                        const { mensaje } = e.response.data;
                        toast.error(mensaje);
                        setLoading(false);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Container fluid>
                <div className="formularioDatos">
                    <Form>
                        <Row>
                            <Col>
                                <Form.Label>¿Deseas eliminar este capitulo?</Form.Label>
                            </Col>
                        </Row>
                        <br />
                        <div className="divSubmit">
                            <input className="submit" value="Eliminar" type="button" onClick={onSubmit} />
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    );
}


export default EliminarCapitulos;
