export class EmployeeModel{
    employeeID?: number;
    employeeName?: string;
    occupation?: string;
    imageName?: string;
    imageSrc?: string | ArrayBuffer | null;
    imageFile?: File | null;
}