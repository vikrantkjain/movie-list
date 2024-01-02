import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";



const FormTextField = ({
   
    controlId,
    name,
    type,
    inputGroupPrepend,
    className,
    icon,
    placeholder
}) => {
    return (
        <Field
            name={name}
            render={({ field, form }) => {
                const isValid = !form.errors[field.name];
                const isInvalid = form.touched[field.name] && !isValid;
                return (
                    <Form.Group   controlId={controlId}>
                        <InputGroup >
                            {inputGroupPrepend}
                            <Form.Control
                                {...field}
                                type={type}
                                isValid={form.touched[field.name] && isValid}
                                isInvalid={isInvalid}
                                feedback={form.errors[field.name]}
                                className={`${className}`}
                                placeholder={placeholder}
                            />

                            <Form.Control.Feedback type="invalid">
                                {form.errors[field.name]}
                            </Form.Control.Feedback>
                        </InputGroup>
                      
                    </Form.Group>
                );
            }}
        />
    );
};



export default FormTextField;
