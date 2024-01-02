import { Formik } from "formik";
import { Button, Form, FormGroup } from "react-bootstrap";
import validation from "./validation";
import FormTextField from "@/components/Input";
import { UploadProfile } from "@/components/Antd";

export default function AddMovie({onSubmit,imageUrl,setImageUrl,movie,onCancel}) {

    const initialValues = {
        year: movie?.publishingYear || "",
        title: movie?.title || "",
        
    }

    return (<>
        <div>
            <div>
                <Formik
                    validationSchema={validation()}
                    onSubmit={onSubmit}
                    initialValues={{ ...initialValues }}
                    enableReinitialize
                >
                    {(props) => {
                        return(

                     <Form action="#" noValidate onSubmit={props.handleSubmit}>

                            <div className='row'>
                                <div className='col-xl-5 col-md-5 col-sm-6 order-2 order-sm-1'>
                                    <div className='text-center'>
                                        <div class="uploadDocument">
                                            <label for="uploadDocument">
                                              
                                                    <UploadProfile imageUrl={imageUrl} setImageUrl={setImageUrl} name="file" controlId="validationFormik01"/>
                                            </label>
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-4 col-md-5 col-sm-6 offset-md-1 order-1 order-sm-2'>
                                    <FormGroup className='form-group' >
                                        <FormTextField
                                            controlId="validationFormik01"
                                            type="text"
                                            name="title"
                                            className=""
                                            labelClass="labelText"
                                            placeholder='Title'
                                        />
                                    </FormGroup >
                                    <FormGroup className='form-group' >
                                        <FormTextField
                                            controlId="validationFormik01"
                                            type="text"
                                            name="year"
                                            className="inputWidth"
                                            labelClass="labelText"
                                            placeholder='Publishing year'
                                        />
                                    </FormGroup >
                                    <div className='d-sm-flex d-none createMovie_btn order-3'>
                                        <Button className='w-100 me-3' variant="outline" onClick={()=>onCancel()}>
                                            Cancel
                                        </Button>
                                        <Button className='w-100' variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                                <div className='d-sm-none d-flex createMovie_btn order-3'>
                                        <Button className='w-100 me-3' variant="outline" onClick={()=>onCancel()}>
                                            Cancel
                                        </Button>
                                        <Button className='w-100' variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                            </div>
                        </Form>)}}
                </Formik>

            </div>
        </div>
    </>

    );
}