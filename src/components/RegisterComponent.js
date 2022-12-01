import React, { useState } from 'react'
import { isValidPhoneNumber } from "react-phone-number-input";
import { useForm, Controller } from 'react-hook-form';
import stateData from '../states.json';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../redux/userActions";
import Popup from 'reactjs-popup';
import { AiFillQuestionCircle } from 'react-icons/ai';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

const RegisterComponent = () => {
  const [submitRegister, setSubmitRegister] = useState(false)
  const registeredUsers = useSelector((state) => state.registeredUsers)
  const { register, handleSubmit, watch, formState: { errors }, getValues, control ,reset} = useForm({
    FirstName: "",
    LastName: "",
    username: "",
    city: "",
    country: "",
    state: "",
    mobile: "",
    email: "",
    password: "",
    confirmpwd: "",
    pan:""
  });

  const dispatch = useDispatch()
  const onSubmit = (data, e) => {
    console.log(data)
     dispatch(registerUser(data));
     reset({  FirstName: "",
     LastName: "",
     username: "",
     city: "",
     country: "",
     state: "",
     mobile: "",
     email: "",
     password: "",
     confirmpwd: "",
     pan:""});
    setSubmitRegister(true);
  }


  return (<>
 <div className="form-style"> 

    {submitRegister &&  <Alert variant="success">
         Registered successfully
        </Alert>
      }
    {errors.email?.type === "validate" && (
           <Alert variant="danger">
              *User already registered. Please login
              </Alert>
            )
          }
        <Card className='border-css'>
      <Card.Header className="text-center" as="h5">SignIn</Card.Header>
      <Card.Body>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Controller
            rules={{
              required: true, validate: (value) => {
                return value.length <= 10
              }
            }}
            name="FirstName"
            control={control}
            render={({ field }) => (<Form.Control
              isInvalid={errors.FirstName}
              data-testid="first name"
              type="text"
              {...field}
              placeholder="Enter First Name"
            />)}
          />
          {errors.FirstName?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *first name is required
            </Form.Control.Feedback>)
          }

          {errors.FirstName?.type === "validate" && (
            <Form.Control.Feedback type="invalid">
              *first name should not exceed 10 characters
            </Form.Control.Feedback>)
          }

        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Controller
            rules={{
              required: true, validate: (value) => {
                return value.length <= 10
              }
            }}
            name="LastName"
            control={control}
            render={({ field }) => (<Form.Control
              isInvalid={errors.LastName}
              data-testid="last name"
              type="text"
              {...field}
              placeholder="Enter Last Name"
            />)}
          />
          {errors.LastName?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *last name is required
            </Form.Control.Feedback>)
          }

          {errors.LastName?.type === "validate" && (
            <Form.Control.Feedback type="invalid">
              *last name should not exceed 10 characters
            </Form.Control.Feedback>)
          }
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridUserName">
          <Form.Label>UserName</Form.Label>
          <Controller
            rules={{
              required: true, validate: (value) => {
                return value.length <= 10
              }
            }}
            name="username"
            control={control}
            render={({ field }) => (<Form.Control
              isInvalid={errors.username}
              data-testid="username-test"
              type="text"
              {...field}
              placeholder="Enter User Name"
            />)}
          />
          {errors.username?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *user name is required
            </Form.Control.Feedback>)
          }

          {errors.username?.type === "validate" && (
            <Form.Control.Feedback type="invalid">
              *user name should ne exceed 10 characters
            </Form.Control.Feedback>)
          }
        </Form.Group>

        <Form.Group as={Col} controlId="formGridMobile">
          <Form.Label>mobile</Form.Label>
          <Controller
            rules={{
              required: true, validate: (value) => isValidPhoneNumber(value)
            }}
            name="mobile"
            control={control}
            render={({ field }) => (<Form.Control
              isInvalid={errors.mobile}
              data-testid="mobileno"
              type="text"
              {...field}
              placeholder="Enter mobile Number"
            />)}
          />
          {errors.mobile?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *Mobile Number is required
            </Form.Control.Feedback>)
          }

          {errors.mobile?.type === "validate" && (
            <Form.Control.Feedback type="invalid">
              *please provide correct contact number
            </Form.Control.Feedback>)
          }
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Controller
            rules={{
              required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, validate: (value) => {

                return !registeredUsers.includes(value);
              }
            }}
            name="email"
            control={control}
            render={({ field }) => (<Form.Control
              isInvalid={errors.email}
              data-testid="reg-email"
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
            </Form.Control.Feedback>)
          }
          {/* {errors.email?.type === "validate" && (
            <Form.Control.Feedback type="invalid">
              *User already registered. Please login
            </Form.Control.Feedback>)
          } */}
        </Form.Group>

      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>password</Form.Label>
          <Controller
            rules={{
              required: true, pattern: /^([A-Z])(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{5,8}$/i
            }}
            name="password"
            control={control}
            render={({ field }) => (<Form.Control
              isInvalid={errors.password}
              data-testid="reg-pwd"
              type="password"
              {...field}
              placeholder="Enter password "
            />)}
          />
          {errors.password?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *password is required
            </Form.Control.Feedback>)
          }

          {errors.password?.type === "pattern" && (
            <Form.Control.Feedback type="invalid">
              *please enter valid password
            </Form.Control.Feedback>)
          }
        </Form.Group>

        <Form.Group as={Col} controlId="formGridConfirmpwd">
          <Form.Label>Confirm Password</Form.Label>
          <Controller
            rules={{
              required: true, validate: (value) => {
                const { password } = getValues();
                return password === value;
              }
            }}
            name="confirmpwd"
            control={control}
            render={({ field }) => (<Form.Control
              isInvalid={errors.confirmpwd}
              data-testid="reg-pwd2"
              type="password"
              {...field}
              placeholder="Enter Confirm Password"
            />)}
          />
          {errors.confirmpwd?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *confirm password is required
            </Form.Control.Feedback>)
          }

          {errors.confirmpwd?.type === "validate" && (
            <Form.Control.Feedback type="invalid">
              *password and confirm password are not equal
            </Form.Control.Feedback>)
          }
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPan">
          <Form.Label>PAN Number</Form.Label>
          <Controller
            rules={{
              required: true, pattern:  /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/i
            }}
            name="pan"
            control={control}
            render={({ field }) => (<Form.Control
              isInvalid={errors.pan}
              data-testid="reg-pan"
              type="text"
              {...field}
              placeholder="Enter PAN Number"
            />)}
          />
          {errors.pan?.type === "required" && (
            <Form.Control.Feedback type="invalid">
             *PAN number is required
            </Form.Control.Feedback>)
          }

          {errors.pan?.type === "pattern" && (
            <Form.Control.Feedback type="invalid">
              *please provide correct PAN Number
            </Form.Control.Feedback>)
          }

        </Form.Group>

      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Controller
            rules={{
              required: true
            }}
            name="country"

            control={control}
            render={({ field }) => (<Form.Select data-testid="country" isInvalid={errors.country}  {...field} >
              <option value="">select country</option>
              <option value="india">India</option>
            </Form.Select>)}
          />
          {errors.country?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *country is required
            </Form.Control.Feedback>)}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>state</Form.Label>
          <Controller
            rules={{
              required: true
            }}
            name="state"

            control={control}
            render={({ field }) => (<Form.Select data-testid="state" isInvalid={errors.state}  {...field} >
              <option value="">select state</option>
              {stateData.data.map(e =>
                <option key={e.id} value={e.id}>{e.state}</option>)}
            </Form.Select>)}
          />
          {errors.state?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *state is required
            </Form.Control.Feedback>)}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Controller
            rules={{
              required: true
            }}
            name="city"

            control={control}
            render={({ field }) => (<Form.Select data-testid="city" isInvalid={errors.city}  {...field} >
              <option value="">select city</option>
              {stateData.data.filter(ed => ed.id === watch('state'))[0]?.cities.map((e, index) => <option key={index} value={e}>{e}</option>)}
            </Form.Select>)}
          />
          {errors.city?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *city is required
            </Form.Control.Feedback>)}
        </Form.Group>
      </Row>

    <div className="d-flex justify-content-between">
     <Button type="submit" data-testid="btn-register">Register</Button>
      {/* <div className="register-here"> <Link to="/login">Login here</Link></div> */}
      <Link className='align-self-end' to="/login">Login here</Link>
     </div>
    </Form>
    </Card.Body>
    </Card>
    </div>
  </>)
}

export default RegisterComponent;
