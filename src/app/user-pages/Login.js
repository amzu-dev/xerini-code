import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { RESET_STATE, useStore, VALIDATE_USER } from '../../store';
import cogoToast from 'cogo-toast';

function Login () {

  const {state, dispatch} = useStore();
  const history = useHistory();

  const onSubmit=(data)=> {
    console.log(data);  
    dispatch({type: VALIDATE_USER, payload: {user_name: data.user_name, password: data.password}})
  }

  useEffect(() => {
    if(state.loggedIn) {
      history.push('/dashboard');
    }
    if(state.loginError !== null) {
        cogoToast.error('Invalid username/password.')
        dispatch({type: RESET_STATE})
    }
  }, [state, history, dispatch])


  const {register, handleSubmit} = useForm();

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue (Username: jon/Password: password).</h6>
                <form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control name="user_name" required ref={register} type="text" placeholder="Username" size="lg" className="h-auto" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control required ref={register} name="password" type="password" placeholder="Password" size="lg" className="h-auto" />
                  </Form.Group>
                  <div className="mt-3">
                    <Button onClick={handleSubmit(onSubmit)} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN IN</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
}

export default Login
