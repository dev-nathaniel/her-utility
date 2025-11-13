import api from "./client";

export type member = {
    userId: string;
    role?: "owner" | "manager" | "viewer" | null
}

export async function fetchSites() {
    const {data} = await api.get('/sites')
    return data
}

export async function login(credentials: { email: string; password: string }) {
    console.log(credentials)
    const { data } = await api.post('/auth/login', credentials)
    // console.log(data)
    return data
}

export async function checkEmail(email: string) {
    const {data} = await api.post('/auth/check-email', {email})
    return data
}

export async function signup(credentials: {fullname: string; password: string; email: string;}) {
    const {data} = await api.post('/auth/register', credentials)

    return data
}

export async function createBusiness(formData: {name: string, address: string; members: member[]}) {
    const {data} = await api.post('/businesses', formData)
    return data
}

export async function fetchUser(userId: string) {
    const {data} = await api.get(`/users/${userId}`)
    return data
}

export async function fetchUtilities() {
    
}

export async function sendInvite() {
    
}

export async function assignRole() {
    
}

export async function fetchSiteDetails(id: string) {
    const {data} = await api.get(`/sites/${id}`)
    return data
}

export async function requestQuote() {

}