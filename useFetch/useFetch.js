import { useEffect, useRef, useState } from "react";

const useFetch = (url) => {
  const isMounted = useRef(true);

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState({
      data: null,
      loading: true,
      error: null,
    });

    const requestAPI = async () => {
      const request = await fetch(url);

      if (request.ok) {
        const data = await request.json();

        setTimeout(() => {
          if (isMounted.current) {
            setState({
              loading: false,
              data,
              error: null,
            });
          }
        }, 2500);
      } else {
        setState({
          data: null,
          loading: false,
          error: {
            msj: "An error has ocurred",
          },
        });
      }
    };

    requestAPI();

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return state;
};

export default useFetch;
