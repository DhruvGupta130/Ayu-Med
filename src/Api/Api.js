const BASE_URL = ["http://192.168.29.187:8080", "http://localhost:8080"]
export const URL = BASE_URL[1]; // Your backend API base URL
export const IMAGE_URL = `${URL}/get/profile?image=`;
export const securedURL = `${URL}/api`;
export const patientURL = `${securedURL}/patient`;
export const GOOGLE_API_KEY = "YOUR API KEY";