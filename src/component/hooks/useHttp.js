import { useState,useCallback,useEffect } from "react";
async function sendHttpRequest(url,config){ //url and config object just as fetch does...
    const response = await fetch(url,config);
    const resData = await response.json();

    if(!response.ok){
        throw new Error(resData.message || 'Something went wrong');  //built-in error constructor function provided by the browser
    }
    return resData;
}


export default function useHttp(url,config,initialData){
    const[error,setError] = useState();
    const[isLoading, setIsLoading] = useState(false);
    const[data,setData] = useState(initialData);

    function clearData(){
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data){ //for managing state based on status like loading,failed,succeed...
        setIsLoading(true);
        try{
            const resData = await sendHttpRequest(url,{...config, body:data});
            setData(resData);
        }catch(error){
            setError(error.message || 'Oops... Sorry');
        }
        setIsLoading(false);
    },[url,config]);

    useEffect(()=>{
        if(config && (config.method === 'GET' || !config.method) || !config ){
            sendRequest();
        }
       },[sendRequest,config]);

    return{
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
    }
}