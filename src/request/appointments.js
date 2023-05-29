import axios from "axios";


export const getAppointmentsByClient = async (clientId) => {
  try {
    return await axios.get(`/appointments/client/${clientId}`);
  } catch (error) {
    console.log(error.message);
  }
};


export const getAppointmentsHours = async (serviceId, date) => {
  try {
    return await axios.get(`/appointments/service/${serviceId}/date/${date}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAppointmentMP = async (appointmentData) => {
  try {
    return await axios.post(`/mercadopago/service_preference`, appointmentData);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    return await axios.post(`/appointments`, appointmentData);
  } catch (error) {
    console.log(error.message);
  }
};
export const getAllAppointments = async () => {
  try {
    return await axios.get(`/appointments`);
  } catch (error) {
    console.log(error.message);
  }
};
