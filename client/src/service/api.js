import axios from 'axios'
import { API_NOTIFICATION_MESSAGES } from '../constants/config'
import { SERVICE_URLS } from '../constants/config'

const API_URL ='http://localhost:8000'

const axiosObj = axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json",
         
    }

})

axiosObj.interceptors.request.use(
    function(config){
        return config
    },
    function(err){
        return Promise.reject(err)
    }
)
axiosObj.interceptors.response.use(
    function(response){
        return processResponse(response)
    },
    function(err){
        return Promise.reject(processError(err));
    }
)

const processResponse=(response)=>{
    if(response?.status===200){
        return {isSuccess:true,data:response.data}
    }
    else{
        return{isSuccess:false,isFailure:true,status:response?.status,msg:response?.msg,code:response?.code}
    }
}

const processError = async (error) => {
    if (error.response) {
        console.log("ERROR IN RESPONSE",error.toJSON())
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    } else if (error.request) { 
        
        console.log("ERROR IN REQUEST: ", error.toJSON());
        return {
            isSuccess:false,
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else { 
        
     console.log("ERROR IN NETWORK: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
    }
}

const API=({});
for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body,showUploadProgress,showDownloadProgress)=>
        axiosObj({
            method: value.method,
            url:value.url,
            data:body,
            responseType:value.responseType,
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentageC=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentageC)
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentageC=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageC)
                }
            }
        })
    
}
export {API};