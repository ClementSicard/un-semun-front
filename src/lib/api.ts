import ApiResponse from "../types/ApiResponse";


const url = "http://localhost:80"

async function queryApi(queryString: string): Promise<ApiResponse | null> {
    const response = await fetch(`${url}/search?q=${queryString}`)
        .then(response => response.json())
        .catch(error => console.error(error))

    return response
}

export default queryApi;