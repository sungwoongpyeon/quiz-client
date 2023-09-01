import {useState} from "react";

export default function useForm(getFreshModelObject) {
    // form value such as email and name
    const [values, setValues] = useState(getFreshModelObject());
    
    // form error
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const {name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }
}