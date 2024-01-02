import * as yup from "yup";


export default function validation() {
    return (
        yup.object().shape({
            email: yup.string().required("Email is required"),
            password: yup.string().min(8).max(20).required("Password is required"),
        })
    )
}

