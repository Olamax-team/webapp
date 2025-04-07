import useUserDetails from "../stores/userStore";

const useApiConfig = ({formdata, method, url}:{url:string, method:string, formdata?:any}) => {

  const { token } = useUserDetails();
  
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: `https://api.olamax.io/api/${url}`,
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token ? token : ''}`
    },
    data: formdata ? formdata : null,
  };

  return config;
}

export { useApiConfig };
