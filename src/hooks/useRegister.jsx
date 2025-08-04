import {useContext, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from './baseUrl';
import { message } from 'antd';
import {AuthContext} from "../contexts/AuthContext.jsx";

const useRegister = () => {
    const { updateProfile } = useContext(AuthContext);
    const [error, setError] = useState();
    const [errMsg, setErrMsg] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (url, inputData) => {
        setLoading(true);
        try {
            const res = await axios.post(url, inputData);
            if (res.status === 200) {
                setError(null);
                setErrMsg(null);
                setLoading(false);

                const { token, user } = res.data.data;
                localStorage.setItem('token', token);
                updateProfile(user);
                window.location.reload();
                navigate('/?type=all');
                message.success('Registered Successfully.');
                return user;

            }
        } catch (e) {
            setLoading(false);
            setError(e.response.data.errors);
            setErrMsg(e.response.data.message);
            return;
        }
        return null;
    };

    return { register, error, errMsg, loading };
};

export default useRegister;
