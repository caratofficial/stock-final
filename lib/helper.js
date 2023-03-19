
const BASE_URL = "stock-final-6215301.vercel.app"

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/api/users`)
    const json = await response.json()

    return json;
}

//single users
export const getUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/api/users/${userId}`)
    const json = await response.json()

    if (json) return json;
    return {}
}

export async function addUser(formData) {
    try {
        const Options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}/api/users`, Options)
        const json = await response.json()

        return json;
    } catch (error) {
        return error;
    }
}

export async function updateUser(userld, formData) {
    const Options = {
        method: 'PUT', 
        headers: {'Content-Type': "application/json"}.
        body: JSON.stringify(formData)
    }        
    const response = await fetch(`$(BASE_URL}api/users/S(userld)`, Options)
    const json = await response.json()
    return json;
    }

export async function deleteUser (userld){
    const Options = {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json"},
        }

        const response = await fetch(`$(BASE_URL)api/users/$(userld)`, Options)
        const json = await response.json()
        return json;
    }