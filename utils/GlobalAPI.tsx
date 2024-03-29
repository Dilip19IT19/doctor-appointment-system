import axios from "axios";



const api_key=process.env.NEXT_PUBLIC_API_KEY;
const axiosClient=axios.create(
  {
    baseURL:"https://doctor-appointment-system-backend-zk50.onrender.com/api/",
    headers:{
      Authorization:`Bearer ${api_key}`
    }
  }
)



const getCategory=()=>axiosClient.get('categories?populate=*');
const getDoctors=()=>axiosClient.get('doctors?populate=*');
const getDoctorsByCategory=(category:string)=>axiosClient.get(`categories?filters[name][$eq]=${category}&populate=doctors.image`);
const getDoctorById=(id:number)=>axiosClient.get(`doctors?filters[id][$eq]=${id}&populate=*`);
const createAppointment=(data: any)=>axiosClient.post(`appointments`,data);
const updateAppointment=(id:number,data:any)=>axiosClient.put(`appointments/${id}`,data);
const sendEmail=(data:any)=>axios.post("/api/sendEmail",data);
const getAppointmentsList=(email:string)=>axiosClient.get(`appointments?filters[email][$eq]=${email}&populate[doctor][populate][image][populate][0]=url&populate=*`);
const deleteAppointment=(id:number)=>axiosClient.delete(`appointments/${id}`);
const getLimitedDoctors=()=>axiosClient.get(`doctors?pagination[limit]=10&sort[0]=experience:desc&populate=*`);
const isAppointmentAvailable=(date:string,time:string,email:string | undefined | null)=>axiosClient.get(`appointments?filters[email][$eq]=${email}&filters[date][$regex]=${date}&filters[time][$eq]=${time}&populate=*`);


export default {getCategory,getDoctors,getDoctorsByCategory,getDoctorById,createAppointment,sendEmail,getAppointmentsList,deleteAppointment,getLimitedDoctors,updateAppointment,isAppointmentAvailable};