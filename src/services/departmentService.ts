import type { ApiDepartment } from "../types/apiTypes";
import type { Department } from "../types/department";
import { mapDepartment } from "../utils/modelMapping";

const BASE_URL: string = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

async function getDepartments(): Promise<Department[]> {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch departments");
    }

    const data = await response.json();
    const departments: Department[] = data.departments.map((d: ApiDepartment) => mapDepartment(d));

    return departments;
}

const departmentService = {
    getDepartments,
};

export default departmentService;