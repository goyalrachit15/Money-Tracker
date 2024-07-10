import React,{useState,useEffect} from 'react'
import Layout from './../components/layouts/layout';
import {UnorderedListOutlined,AreaChartOutlined} from '@ant-design/icons'
import { Modal, Form, Input, Select,message, Table, DatePicker} from 'antd';
import axios from 'axios';
import moment from 'moment';
const {RangePicker} = DatePicker;
const Home = () => {
  const [showModal,setShowModal] = useState(false);
  const [alltransaction, setalltransaction] = useState([]);
  const [Frequency,setFrequency] = useState('7');
  const [selectDate,setSelectDate] = useState([]);
  const [type,setType] = useState('all');
  const [data,setData] = useState('table');
  const columns = [
    {
      title:"Date",
      dataIndex:"date",
      render : (text)=> <span>{moment(text).format("YYYY-MM-DD")}</span>
    },{
      title:"Amount",
      dataIndex:"amount"
    },{
      title:"Type",
      dataIndex:"type"
    },{
      title:"category",
      dataIndex:"category"
    },{
      title:"Reference",
      dataIndex:"reference"
    },
  ]

  const getAll = async() => {
    try {
      const user  = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post("/transactions/gettransaction",
        {userid : user._id,
          Frequency,
          selectDate,
          type});
      setalltransaction(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAll();
  }, [Frequency,selectDate,type])


  const handleSubmit = async(values) => {
    try {
      const user  = JSON.parse(localStorage.getItem('user'));
      await axios.post('/transactions/addTransaction',{...values, userId:user._id})
      message.success("Added transaction");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  }
  return (
    <Layout>
    <div className='filters'>
      <div>
        <h6>Select Frequency</h6>
        <Select value={Frequency}onChange={(values)=> setFrequency(values)} >
          <Select.Option value='7'>Last 1 Week</Select.Option>
          <Select.Option value='30'>Last 1 Month</Select.Option>
          <Select.Option value='180'>Last 6 Month</Select.Option>
          <Select.Option value='custom'>Custom</Select.Option>
        </Select>
        {Frequency==='custom' && (
          <RangePicker 
          value={selectDate} 
          onChange={(values)=> setSelectDate(values)} />
        )}
      </div>
      <div>
        <h6>Select Type</h6>
        <Select value={type}onChange={(values)=> setType(values)} >
          <Select.Option value='all'>All</Select.Option>
          <Select.Option value='income'>INCOME</Select.Option>
          <Select.Option value='expense'>EXPENSE</Select.Option>
        </Select>
      </div>
      <div className='switch-icons'>
          <UnorderedListOutlined className={`mx-2 ${data==='table' ? 'active-icon':'inactive-icon'}`} onClick={()=>setData('table')}/>
          <AreaChartOutlined className={`mx-2 ${data==='analytics' ? 'active-icon':'inactive-icon'}`} onClick={()=> setData('analytics')}/>
      </div>
      <div>
        <button className='btn btn-primary' onClick={()=>setShowModal(true)}>Add New</button>
      </div>
    </div>
    <div className='content'>
      <Table columns={columns} dataSource={alltransaction} />
    </div>
      <Modal title="Add Transaction" open={showModal} onCancel={()=> setShowModal(false)} footer={false}>
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="tip">Tip</Select.Option>
            <Select.Option value="project">Project</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="movie">Movie</Select.Option>
            <Select.Option value="bills">Bills</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="fees">Fees</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type='date'/>
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type='text'/>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type='text'/>
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button type="submit" className='btn btn-primary'>{" "}Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Home