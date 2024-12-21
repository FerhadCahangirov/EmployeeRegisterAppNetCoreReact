import React, { FunctionComponent, useEffect, useState } from 'react'
import { EmployeeModel } from '../models/EmplooyeModel';

const defaultImageSrc = './man.png'

const initialFieldValues: EmployeeModel = {
    employeeID: 0,
    employeeName: '',
    occupation: '',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

const intialValidationErrors: ValidationErrors = {
    employeeName: true,
    occupation: true,
    imageSrc: true
}

declare type ValidationErrors = {
    employeeName: boolean;
    occupation: boolean;
    imageSrc: boolean;
}

interface IEmployee {
    addOrEdit: (formData: FormData, resetForm: () => void) => void
    recordForEdit: EmployeeModel | null
}

const Employee: FunctionComponent<IEmployee> = (props) => {

    const { addOrEdit, recordForEdit } = props;

    const [values, setValues] = useState<EmployeeModel>(initialFieldValues);
    const [errors, setErrors] = useState<ValidationErrors>(intialValidationErrors);

    useEffect(() => {
        if(recordForEdit != null){
            setValues(recordForEdit);
        }
    }, [recordForEdit]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    const showPreview = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files[0]) {

            let imageFile: File = event.target.files[0];
            const reader: FileReader = new FileReader();

            reader.onload = (x: ProgressEvent<FileReader>) => {
                setValues({ ...values, imageFile: imageFile, imageSrc: x.target!.result, imageName: imageFile.name });
            };

            reader.readAsDataURL(imageFile);
        }
    }


    const validate = (): boolean => {

        let temp: ValidationErrors = errors;

        temp.employeeName = values.employeeName === "" ? false : true
        temp.occupation = values.occupation === "" ? false : true
        temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true

        setErrors(temp)

        return Object.values(temp).every(x => x === true);
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader')!.value = null;
        setErrors(intialValidationErrors)
    }


    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (validate()) {
            console.log(values)
            const formData = new FormData();
            formData.append('employeeID', String(values.employeeID ?? '')); 
            formData.append('employeeName', values.employeeName ?? '');
            formData.append('occupation', values.occupation ?? '');
            formData.append('imageName', values.imageName ?? '');
            formData.append('imageFile', values.imageFile ?? '');
            addOrEdit(formData, resetForm);
        }
    };

    const applyErrorClass = (field: string): string => ((field in errors && errors[field] == false) ? ' invalid-field' : '')


    return (
        <>
            <div className='container text-center'>
                <p className='lead'>An Employee</p>
            </div>
            <form autoComplete='off' noValidate onSubmit={handleFormSubmit}>
                <div className='card'>
                    <img src={values.imageSrc} className="card-img-top" />
                    <div className="card-body">
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader" />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('employeeName')} placeholder="Employee Name" name="employeeName"
                                value={values.employeeName}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('occupation')} placeholder="Occupation" name="occupation"
                                value={values.occupation}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-light">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Employee


