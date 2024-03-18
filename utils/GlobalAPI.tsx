import axios from "axios";

const api_key=process.env.NEXT_PUBLIC_API_KEY;
const axiosClient=axios.create(
  {
    baseURL:"http://localhost:1337/api/",
    headers:{
      Authorization:`Bearer ${api_key}`
    }
  }
)

const getCategory=()=>axiosClient.get('categories?populate=*');
const getDoctors=()=>axiosClient.get('doctors?populate=*');
const getDoctorsByCategory=(category:string)=>axiosClient.get(`categories?filters[name][$eq]=${category}&populate=doctors.image`);
const getDoctorById=(id:number)=>axiosClient.get(`doctors?filters[id][$eq]=${id}&populate=*`);

export default {getCategory,getDoctors,getDoctorsByCategory,getDoctorById};