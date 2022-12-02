import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function CheckOutSteps(props) {
  return (
    <Row className='checkout-steps mx-3'>
      <Col className={props.step1 ? 'active flex items-center' : 'flex items-center'} >Inciar sesión</Col>
      <Col className={props.step2 ? 'active flex items-center' : 'flex items-center'} >Envío</Col>
      <Col className={props.step3 ? 'active flex items-center' : 'flex items-center'} >Pagos</Col>
      <Col className={props.step4 ? 'active flex items-center' : 'flex items-center'} >Realizar pedido</Col>
    </Row>
  )
}
