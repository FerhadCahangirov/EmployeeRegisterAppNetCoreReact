import axios from 'axios'
import Employee from './Employee'
import { EmployeeModel } from '../models/EmplooyeModel'
import { MouseEvent, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function EmployeeList() {
    const [employeeList, setEmployeeList] = useState<Array<EmployeeModel>>([]);
    const [recordForEdit, setRecordForEdit] = useState<EmployeeModel | null>(null);

    useEffect(() => {
        refreshEmployeeList();
    }, [])

    const employeeAPI = (url = 'http://localhost:5021/api/Employee/') => {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord: FormData) => axios.post(url, newRecord),
            update: (id: FormDataEntryValue | null, updatedRecord: FormData) => axios.put(url + id, updatedRecord),
            delete: (id: number) => axios.delete(url + id)
        }
    }

    const refreshEmployeeList = () => {
        employeeAPI().fetchAll()
            .then(res => setEmployeeList(res.data))
            .catch((err) => { console.log(err) })
    }

    const addOrEdit = (formData: FormData, resetForm: () => void): void => {
        if (formData.get('employeeID') == "0") {
            employeeAPI().create(formData).then(res => {
                resetForm();
                refreshEmployeeList();
                Swal.fire({
                    title: "Successfully added!",
                    icon: "success"
                });
            })
                .catch(error => console.log(error))
        } else {
            employeeAPI().update(formData.get('employeeID'), formData).then(res => {
                console.log(formData.getAll)
                resetForm();
                refreshEmployeeList();
                Swal.fire({
                    title: "Successfully updated!",
                    icon: "success"
                });
            })
                .catch(error => console.log(error))
        }
    }

    const showRecordDetails = (data: EmployeeModel) => {
        console.log(data)
        setRecordForEdit(data);
    }


    function onDelete(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: number): void {
        event.stopPropagation();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                employeeAPI().delete(id)
                    .then(res => {
                        refreshEmployeeList();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(error => console.log(error));
                
            }
        });


    }

    const imageCard = (data: EmployeeModel) => (
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} className="card-img-top rounded-circle" />
            <div className="card-body">
                <h5>{data.employeeName}</h5>
                <span>{data.occupation}</span> <br />
                <button className="btn btn-light delete-button mt-2" onClick={event => onDelete(event, parseInt(data.employeeID))}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )


    return (
        <div className='row'>
            <div className='col-md-12'>
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4 text-light">Employee Register</h1>
                    </div>
                </div>
            </div>
            <div className='col-md-4'>
                <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
            </div>
            <div className="col-md-8">
                <table>
                    <tbody>
                        {
                            //tr > 3 td
                            [...Array(Math.ceil(employeeList.length / 3))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(employeeList[3 * i])}</td>
                                    <td>{employeeList[3 * i + 1] ? imageCard(employeeList[3 * i + 1]) : null}</td>
                                    <td>{employeeList[3 * i + 2] ? imageCard(employeeList[3 * i + 2]) : null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeList



