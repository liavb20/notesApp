import { ConflictError, UnauthorizedError } from "../errors/http_errors";

const baseURL = 
'https://liav-notes-api.onrender.com'
//  'http://localhost:5000'
export async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(baseURL + input, init);
    if (response.ok) return response
    else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) throw new UnauthorizedError(errorMessage)
        else if (response.status === 409 ) throw new ConflictError(errorMessage)
        else throw Error(`request fail with status code: ${response.status} and message: ${errorMessage}`);
    }
};