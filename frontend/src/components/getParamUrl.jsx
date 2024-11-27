import { useLocation } from 'react-router-dom';

// Custom Hook should start with "use"
const useParamUrl = ({ name }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(`${name}`);
}

export default useParamUrl;

