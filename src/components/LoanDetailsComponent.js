import React from 'react';
import { useSelector } from 'react-redux';
import HeaderComponent from './HeaderComponent';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

const LoanDetailsComponent = () => {
    const loggedIn = useSelector((state) => state.currentUser);
    const loandetails = useSelector((state) => state.users.filter((e) => e.email === state.currentUser))[0];
    let loanpurpose = null;
    let rateOfInterest = null;
    let monthlyPayment = null;
    if (loandetails?.loanDetails) {

        loanpurpose = loandetails.loanDetails.purpose;
        rateOfInterest = loanpurpose === "Others" ? 10 : loanpurpose === "Car Loan" ? 7 : loanpurpose === "Home Loan" ? 8 : 10;
        monthlyPayment = (((rateOfInterest / 100) * (loandetails.loanDetails.loanAmount * 100000)) + (loandetails.loanDetails.loanAmount * 100000)) / (loandetails.loanDetails.duration * 12)
    }

    return (<>
        <HeaderComponent />
        <div className="form-style">
            {loggedIn ? (loandetails?.loanDetails ? <>
                <Card className='border-css'>
                    <Card.Header className="text-center" as="h5">Loan Details</Card.Header>
                    <Card.Body>
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label >
                                        Loan Applied on
                                    </Form.Label>
                                    <Form.Control type="text" defaultValue={loandetails.loanDetails.applicationDate?.toLocaleDateString('en-CA')} />
                                </Col>
                                <Col>
                                    <Form.Label>
                                        Applied By
                                    </Form.Label>
                                    <Form.Control type="text" defaultValue={loandetails.FirstName + " " + loandetails.LastName} />

                                </Col>
                                <Col>
                                    <Form.Label >
                                        Email
                                    </Form.Label>

                                    <Form.Control type="text" defaultValue={loandetails.email} />

                                </Col>
                                <Col>
                                    <Form.Label >
                                        Contact
                                    </Form.Label>

                                    <Form.Control defaultValue={loandetails.mobile} />

                                </Col>

                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Label >
                                        PAN Number
                                    </Form.Label>

                                    <Form.Control type="text" defaultValue={loandetails.pan} />

                                </Col>
                                <Col>
                                    <Form.Label>
                                        Account Number
                                    </Form.Label>

                                    <Form.Control type="text" defaultValue={loandetails.AccountDetails.accountNumber} />

                                </Col>
                                <Col>
                                    <Form.Label>
                                        Account Type
                                    </Form.Label>

                                    <Form.Control type="text" defaultValue={loandetails.AccountDetails.Acctype} />

                                </Col>
                                <Col>
                                    <Form.Label >
                                        Card Type
                                    </Form.Label>

                                    <Form.Control type="text" defaultValue={loandetails.AccountDetails.cardType} />

                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>
                                        Loan Amount
                                    </Form.Label>

                                    <Form.Control defaultValue={loandetails.loanDetails.loanAmount * 100000} />

                                </Col>
                                <Col>
                                    <Form.Label >
                                        Loan Purpose
                                    </Form.Label>

                                    <Form.Control type="text" defaultValue={loandetails.loanDetails.purpose} />

                                </Col>
                                <Col>
                                    <Form.Label >
                                        Loan Duration
                                    </Form.Label>

                                    <Form.Control type="text" defaultValue={loandetails.loanDetails.duration + " years"} />

                                </Col>

                                {loandetails.loanDetails.description && <Col>
                                    <Form.Label >
                                        Loan Purpose in Detail
                                    </Form.Label>

                                    <Form.Control type="text" defaultValue={loandetails.loanDetails.description} />

                                </Col>}

                                <Col>
                                    <Form.Label>
                                        Rate Of Interest
                                    </Form.Label>

                                    <Form.Control type="text" defaultValue={rateOfInterest} />

                                </Col>

                            </Row>

                        </Form>
                    </Card.Body></Card>
            </> : <Alert variant="danger">
                you have not applied for any loan
            </Alert>
            ) : <Alert variant="danger">
                 *Please login to access your account
            </Alert>
            }
        </div>
    </>)
}

export default LoanDetailsComponent
