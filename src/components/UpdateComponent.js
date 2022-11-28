import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useForm ,Controller} from 'react-hook-form';
import HeaderComponent from "./HeaderComponent";
import { useSelector, useDispatch } from 'react-redux';
import { updateAccountDetails } from "../redux/userActions";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';


const UpdateComponent = () => {
    const [submitUpdate, setSubmitUpdate] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, getValues,control ,reset } = useForm({
        accountNumber:"",
        cardType:"",
        Acctype:""
    });
    const userEmail = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    const onSubmit = (data, e) => {
        console.log(data);
        if(userEmail){
         dispatch(updateAccountDetails(data));
         reset({ accountNumber:"",
         cardType:"",
         Acctype:""});
         setSubmitUpdate(true);
        }
    };

    return (<>
      <HeaderComponent />
      <div className="form-style"> 
      {submitUpdate && 
              <Alert variant="success">
              Updated successfully
             </Alert>
              
              }

              { !userEmail && 
               <Alert variant="danger">
               *Please login to update Account Details
              </Alert>

              }
              
        <Form noValidate   onSubmit={handleSubmit(onSubmit)} >
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalAccountNumber">
          <Row>
          <Form.Label text-align="center">
            <h4>Update Account Details</h4> 
        </Form.Label>
          </Row>
          </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalAccountNumber">
        <Form.Label column sm={2}>
           Account Number
        </Form.Label>
        <Col sm={10}>
        
                 <Controller
            rules={{
              required: true, pattern: /[0-9]{4}-[0-9]{4}-[0-9]{4}/i
            }}
            name="accountNumber"
            control={control}
            render={({ field }) => (<Form.Control 
              isInvalid={errors.accountNumber}
              data-testid="account-number"
              type="text"
              {...field}
              placeholder="Enter Account Number"

            />)}
          />
          {errors.accountNumber?.type === "required" && (
            <Form.Control.Feedback type="invalid">
             *Account Number is required
            </Form.Control.Feedback>)
          }
          {errors.accountNumber?.type === "pattern" && (
            <Form.Control.Feedback type="invalid">
             *please provide your 12 digit account number
            </Form.Control.Feedback>
          )}

        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
        Card Type
        </Form.Label>
        <Col sm={10}>
          {/* <Form.Control type="password" placeholder="Enter Card Type" /> */}
          <Controller
            rules={{
              required: true
            }}
            name="cardType"

            control={control}
            render={({ field }) => (<Form.Select data-testid="cardType" isInvalid={errors.cardType}  {...field} >
              <option value="">select cardType</option>
              <option value="icici">ICICI</option>
              <option value="axis">AXIS</option>
            </Form.Select>)}
          />
          {errors.cardType?.type === "required" && (
            <Form.Control.Feedback type="invalid">
              *cardType is required
            </Form.Control.Feedback>)}
        </Col>
      </Form.Group>
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
          Account Type
          </Form.Label>
          <Col sm={10}>
          <Controller
            rules={{
              required: true
            }}
            name="Acctype"

            control={control}
            render={({ field }) => (<div 
                {...field}> <Form.Check  data-testid="Acctype"
                type="radio"
                label="Current"
                name="Acctype"
                id="Acctype1"
                value="Current"
              
              />
              <Form.Check
               
                type="radio"
                label="Savings"
                name="Acctype"
                value="Savings"
                id="Savings"
           
              />
              <Form.Check
             
                type="radio"
                label="Others"
                name="Acctype"
                id="Others"
                value="Others"
              
              /> </div>)
            
            }
          />
         

           
          </Col>
        </Form.Group>
      </fieldset>
     

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" data-testid="btn-update">update</Button>
        </Col>
      </Form.Group>
    </Form>
   
    </div>

    </>)
    
}

export default UpdateComponent