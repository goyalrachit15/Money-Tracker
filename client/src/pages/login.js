import { Form, Input, message } from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import React,{useState,useEffect} from 'react'
import Spinner from '../components/spinner';
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const submitHandler = async(values) => {
        try{
            setLoading(true);
            const {data} = await axios.post('/users/login', values);
            setLoading(false);
            message.success("login successfully");
            localStorage.setItem('user',JSON.stringify({...data.user, password : ''}));
            navigate('/');
        }catch(err){
            setLoading(false);
            message.error("something went wrong");
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/");
        }
    },[navigate])

  return (
    <>
    <div className='register d-flex align-items-center justify-content-center'>
        {loading && <Spinner />}
        <Form layout='vertical' onFinish={submitHandler}>
            <h1>Login Form</h1>
            <Form.Item label='Email' name="email">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label='Password' name="password">
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <Link to='/register'>New User? Click here to Register</Link>
                <button className='btn btn-primary'>Login</button>
            </div>
        </Form>
    </div>
    </>
  )
}

export default Login