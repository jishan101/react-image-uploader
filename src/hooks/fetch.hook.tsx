import Axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetch = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    Axios.get(url)
      .then((response: AxiosResponse) => setData(response.data))
      .catch((err) => {
        console.log(err);
        toast.error(err);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { loading, data };
};

export default useFetch;
