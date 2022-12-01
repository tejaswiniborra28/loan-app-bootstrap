import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { login, updateCurrentUser } from "../redux/userActions";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

const LoginComponent = () => {
  const registeredUsers = useSelector((state) => state.registeredUsers);
  const validated = useSelector((state) => state.validated);
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, getValues, control } = useForm({
    email: "",
    password: ""
  });

  const onSubmit = data => {

    //console.log(data)
    dispatch(login(data));


  };



  useEffect(() => {
    if (validated) {

      dispatch(updateCurrentUser(getValues().email));
      navigate("/loanApp")

    }
  }, [validated])




  return (<>
    <div className="form-style">
      {errors.email?.type === "validate" && (
        <Alert variant='danger'>
          *if you are new user. Please register
        </Alert>
      )}

      {registeredUsers?.includes(getValues().email) && (!validated && (
        <Alert variant='danger'>
          *Invalid Credentials
        </Alert>)
      )}
      <Card className='border-css'>
        <Card.Header className="text-center" as="h5">LogIn</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} >
            {/* <Row className="mb-3"> */}
            <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
              <Form.Label column sm={4}>Email</Form.Label>
              <Col sm={12}>
                <Controller
                  rules={{
                    required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, validate: (value) => {

                      return registeredUsers.includes(value);
                    }
                  }}
                  name="email"
                  control={control}
                  render={({ field }) => (<Form.Control

                    isInvalid={errors.email}
                    data-testid="email-input"
                    type="text"
                    {...field}
                    placeholder="Enter Email Address"

                  />)}
                />

                {errors.email?.type === "required" && (
                  <Form.Control.Feedback type="invalid">
                    *Email is required
                  </Form.Control.Feedback>)
                }
                {errors.email?.type === "pattern" && (
                  <Form.Control.Feedback type="invalid">
                    *please provide correct email id
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            {/* </Row> */}
            {/* 
      <Row className="mb-3"> */}
            <Form.Group as={Row} className="mb-3" controlId="formGroupPassword">
              <Form.Label column sm={4}>Password</Form.Label>
              <Col sm={12}>
                <Controller
                  rules={{
                    required: true, pattern: /^([A-Z])(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{5,8}$/i
                  }}
                  name="password"
                  control={control}
                  render={({ field }) => (<Form.Control
                    isInvalid={errors.password}
                    data-testid="password-test"
                    type="password"
                    {...field}
                    placeholder="Enter password"

                  />)}
                />

                {errors.password?.type === "required" && (
                  <Form.Control.Feedback type="invalid">
                    *password is required
                  </Form.Control.Feedback>)
                }
                {errors.password?.type === "pattern" && (
                  <Form.Control.Feedback type="invalid">
                    *Please provide a valid password
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            {/* </Row> */}

            <Row className='px-2'>
              <Button type="submit" data-testid="btn">Login</Button>
            </Row>
            {/* <div className="register-here"><Link to="/register">Register here</Link></div> */}

            <div className='register-link'>
              <Link to="/register">Register here</Link>
            </div>


          </Form>
        </Card.Body>
      </Card>
    </div>
  </>)

}

export default LoginComponent;
