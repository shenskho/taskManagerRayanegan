import React from 'react';
import {Col, Row, Card, CardBody} from 'reactstrap';
import logo from '@assets/images/logo/logo2.png'
export default function Register() {
  return (
  <Row className='justify-content-center align-items-center bg-white' style={{ height: '100vh' }}>
    <Col md={1}>
    <Card className='shadow-sm border-0 width-600px'>
      <CardBody className='width-600px p-4'>
        <div className='text-center mb-4'>
          <img src={logo} alt='logo' style={{ width: '75px', height: '72px', objectFit: 'contain' }} />
          <h1 className='h4 fw-bold mt-3 mb-1'>ثبت نام</h1>
        </div>
        <form className='width-600px'>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>نام و نام خانوادگی</label>
            <input type='text' className='form-control' id='name' placeholder='نام و نام خانوادگی' />
          </div>
        </form>
        <div className='text-center mt-4'>
          <button className='btn btn-primary w-100'>ثبت نام</button>
        </div>
      </CardBody>
    </Card>
    </Col>
  </Row>
  )
}