import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { applyLoan } from "../redux/userActions";
import Popup from 'reactjs-popup';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import HeaderComponent from './HeaderComponent';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
const LoanComponent = () => {

  const [loanSubmitted, setLoanSubmitted] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, getValues, control } = useForm({
    Income: "",
    loanAmount: "",
    duration: "",
    purpose: "",
    description: ""
  });
  const dispatch = useDispatch();
  const loandetails = useSelector((state) => state.users.filter((e) => e.email === state.currentUser));

  const watchpurpose = watch("purpose");

  const onSubmit = (data, e) => {
    console.log(loandetails);
    if (loandetails) {

      if (loandetails[0]?.AccountDetails) {
        dispatch(applyLoan(data));
        e.target.reset();
        setLoanSubmitted(true);
        navigate("/loandetails");
      }
    }





  }

  return (<>
    <HeaderComponent />
    <div className="form-style">

      {loanSubmitted && <Alert variant="success">
        Loan Submitted Successfully
      </Alert>
      }
      {loandetails && (loandetails[0]?.AccountDetails === undefined && (
        <Alert variant="danger">
          *Please update Account details before applying for Loan
        </Alert>
      ))
      }
      <Card className='border-css'>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} >
            {loandetails && (loandetails[0]?.AccountDetails &&
              <Row className="mb-3">
                <Col >
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control type="text" placeholder="Account number" defaultValue={loandetails[0]?.AccountDetails?.accountNumber} />

                </Col>
                <Col>
                  <Form.Label>Card Type</Form.Label>
                  <Form.Control type="text" placeholder="Card type" defaultValue={loandetails[0]?.AccountDetails?.cardType} />

                </Col>
                <Col>
                  <Form.Label>Account Type</Form.Label>
                  <Form.Control type="text" placeholder="Account Type" defaultValue={loandetails[0]?.AccountDetails?.Acctype} />

                </Col>
              </Row>)}
            <Row className="mb-3">
              <Col >
                <Form.Label>Annual Income</Form.Label>
                <Controller
                  rules={{
                    required: true
                  }}
                  name="Income"
                  control={control}
                  render={({ field }) => (<Form.Control

                    isInvalid={errors.Income}
                    data-testid="income-test"
                    type="number"
                    {...field}
                    placeholder="Enter Annual Income"

                  />)}
                />

                {errors.Income?.type === "required" && (
                  <Form.Control.Feedback type="invalid">
                    *Income earned is required
                  </Form.Control.Feedback>)
                }
              </Col>
              <Col>
                <Form.Label>Loan Amount</Form.Label>
                <Controller
                  rules={{
                    required: true, validate: (value) => {
                      const { Income } = getValues();
                      return value <= Income * 3
                    }
                  }}
                  name="loanAmount"
                  control={control}
                  render={({ field }) => (<Form.Control

                    isInvalid={errors.loanAmount}
                    data-testid="loan-amount"
                    type="number"
                    {...field}
                    placeholder="Enter Loan Amount"

                  />)}
                />

                {errors.loanAmount?.type === "required" && (
                  <Form.Control.Feedback type="invalid">
                    *Loan amount is required
                  </Form.Control.Feedback>)
                }

                {errors.loanAmount?.type === "validate" && (
                  <Form.Control.Feedback type="invalid">
                    `*you are not eligible for loan more than {getValues().Income * 3}`
                  </Form.Control.Feedback>)
                }
              </Col>
              <Col>
                <Form.Label>Loan Duration</Form.Label>
                <Controller
                  rules={{
                    required: true
                  }}
                  name="duration"

                  control={control}
                  render={({ field }) => (<Form.Select data-testid="duration-test" isInvalid={errors.duration}  {...field} >
                    <option value="5">5 years</option>
                    <option value="10">10 years</option>
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                  </Form.Select>)}
                />
                {errors.duration?.type === "required" && (
                  <Form.Control.Feedback type="invalid">
                    *Loan duration is required
                  </Form.Control.Feedback>)}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col >
                <Form.Label>Loan Purpose</Form.Label>
                <Controller
                  rules={{
                    required: true
                  }}
                  name="purpose"

                  control={control}
                  render={({ field }) => (<Form.Select data-testid="purpose-test" isInvalid={errors.purpose}  {...field} >
                    <option value="Others">Others</option>
                    <option value="Car Loan">Car Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Bussiness">Bussiness</option>
                  </Form.Select>)}
                />
                {errors.purpose?.type === "required" && (
                  <Form.Control.Feedback type="invalid">
                    *Loan purpose is required
                  </Form.Control.Feedback>)}
              </Col>
              {watchpurpose === "Others" && <Col>
                <Form.Label>Loan Purpose In detail</Form.Label>
                <Controller
                  rules={{
                    required: true
                  }}
                  name="description"
                  control={control}
                  render={({ field }) => (<Form.Control

                    isInvalid={errors.description}
                    data-testid="description-test"
                    type="text"
                    {...field}
                    placeholder="Enter Loan purpose"

                  />)}
                />

                {errors.description?.type === "required" && (
                  <Form.Control.Feedback type="invalid">
                    *Loan purpose is required
                  </Form.Control.Feedback>)
                }
              </Col>}
              <Col>
                <Form.Label>Rate Of Interest</Form.Label>
                <Form.Control type="text" placeholder="Normal text" defaultValue={watchpurpose === "Others" ? "10" : watchpurpose === "Car Loan" ? "7" : watchpurpose === "Home Loan" ? "8" : "10"} />
              </Col>
            </Row>
            <Button type="submit" data-testid="btn-loan">Apply</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  </>)
}

export default LoanComponent;
