import * as yup from "yup";


export default function validation() {
    return (
        yup.object().shape({
            year: yup.string().required("Publishing Year is required"),
            title: yup.string().required("Title is required"),
            
        })
    )
}