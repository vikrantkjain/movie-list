import React from "react";
import { Button, Col, FormGroup } from "react-bootstrap";
import { Form, Formik } from "formik";
import { FormTextField } from "@/components";
import validation from "./validation";



function UserLoginForm({ onSubmit }) {


  const initialValues = {
    email: "",
    password: ""
  }

  return (<>
    <div>
      <div>
        <Formik
          validationSchema={validation()}
          onSubmit={onSubmit}
          initialValues={{ ...initialValues }}
        >
          {(props) => (
            <Form action="#" noValidate onSubmit={props.handleSubmit}>
         
              <FormGroup className='form-group' >
                <FormTextField
                  controlId="validationFormik01"
                  type="email"
                  name="email"
                  className=""
                  labelClass="labelText"
                  placeholder='Email'
                />
              </FormGroup >
              <FormGroup className='form-group'>
                <FormTextField

                  controlId="validationFormik01"
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder='Password'
                  labelClass="labelText"
                />
              </FormGroup>
              <div class="form-group form-check text-center mx-auto">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label text-white" for="flexCheckDefault" >
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
       
                className="btn btn w-100"
              >
                Login
              </Button>
            </Form>)}
        </Formik>

      </div>
    </div>
  </>

  );
};

export default UserLoginForm;
