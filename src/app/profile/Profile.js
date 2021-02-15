import React, {useState, useEffect} from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { SAVE_USER, useStore } from '../../store';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';

function Profile () {
    const {state, dispatch} = useStore();
    const { register, handleSubmit, setValue } = useForm();
    const history = useHistory();

    const [editable, setEditable] = useState(false);

    const changeEditable = (event) => {
        setEditable(!editable);
    }

    useEffect(() => {
        if(state.id) {
            setValue("id", state.id);
            setValue("first_name", state.first_name);
            setValue("other_name", state.other_name);
            setValue("street", state.address.street);
            setValue("town", state.address.town);
            setValue("county", state.address.county);
            setValue("postcode", state.address.postcode);
            setValue("mobile", state.mobile);
            setValue("email", state.email);
            setValue("company", state.company);
            setValue("contact", state.preferences.contact);
        }
        else {
            cogoToast.error('User logged out, please log in again');
        }
    }, [state, setValue])

    const onSubmit = (data) => {
        const payload = {
            id: data.id,
            first_name: data.first_name,
            other_name: data.other_name,
            address: {
                street: data.street,
                town: data.town,
                county: data.county,
                postcode: data.postcode,
        
            },
            mobile: data.mobile,
            email: data.email,
            company: data.company,
            preferences: {
                contact: data.contact
            }
        }

        dispatch({type:SAVE_USER,payload: payload})
        setEditable(!editable);
        console.log('data');  
        console.log(data);  
        console.log(state);
    }

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Profile </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Profile</a></li>
                    </ol>
                </nav>
            </div>
            <div className="row justify-content-md-center">
            <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Profile</h4>
                            <p className="card-description"> You can edit your Profile here. </p>
                            <form className="forms-sample">
                            <Row>
                            <Col>
                                    <Form.Group>
                                        <label htmlFor="idId">Your Profile Id</label>
                                        <Form.Control name="id" ref={register} readOnly plaintext type="text" id="idId" placeholder="First Name" size="lg" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <label htmlFor="firstNameId">First Name</label>
                                        <Form.Control  name="first_name" ref={register} readOnly={!editable} plaintext={!editable} type="text" id="firstNameId" placeholder="First Name" size="lg" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <label htmlFor="otherNameId">Other Name</label>
                                        <Form.Control  name="other_name" ref={register} readOnly={!editable} plaintext={!editable} type="text" id="otherNameId" placeholder="Other Name" size="lg" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Address</b></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <label htmlFor="streetId">Street</label>
                                        <Form.Control  name="street" ref={register} readOnly={!editable} plaintext={!editable} type="text" id="streetId" placeholder="Street" size="lg" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <label htmlFor="townId">Town</label>
                                        <Form.Control  name="town" ref={register} readOnly={!editable} plaintext={!editable} type="text" id="townId" placeholder="Town" size="lg" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <label htmlFor="countyId">County</label>
                                        <Form.Control  name="county" ref={register} readOnly={!editable} plaintext={!editable} type="text" id="countyId" placeholder="County" size="lg" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <label htmlFor="postCodeId">Post Code</label>
                                        <Form.Control  name="postcode" ref={register} readOnly={!editable} plaintext={!editable} type="text" id="postCodeId" placeholder="Post Code" size="lg" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <label htmlFor="mobileId">Mobile</label>
                                        <Form.Control  name="mobile" ref={register} readOnly={!editable} plaintext={!editable} type="text" id="mobileId" placeholder="Mobile" size="lg" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <label htmlFor="emailId">Email</label>
                                        <Form.Control  name="email" ref={register} readOnly={!editable} plaintext={!editable} type="text" id="emailId" placeholder="Email" size="lg" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <label htmlFor="companyId">Company</label>
                                <Form.Control  name="company" ref={register} readOnly={!editable} plaintext={!editable} type="text" id="companyId" placeholder="Company  " />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <p><b>Preferences</b></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="form-check">
                                        <label className="form-check-label text-muted">
                                        <input name="contact" ref={register} disabled={!editable}  value="mail" type="checkbox" className="form-check-input"/>
                                        <i className="input-helper"></i>
                                        Mail
                                        </label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-check">
                                        <label className="form-check-label text-muted">
                                        <input name="contact" ref={register} disabled={!editable} value="sms" type="checkbox" className="form-check-input"/>
                                        <i className="input-helper"></i>
                                        SMS
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            {editable && <button onClick={handleSubmit(onSubmit)} className="btn btn-primary mr-2" >Save</button>}
                            {!editable && <button onClick={changeEditable} className="btn btn-primary mr-2">Edit</button>}
                            {editable && <button onClick={()=>history.push('/dashboard')} className="btn btn-light">Cancel</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    );

}
export default Profile;