import React, { useEffect, useRef, useState } from 'react'
import axios from '../network/http'
import { Button, Table, Modal, message, Form } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UpdateForm from '../component/Form/UpdateForm';
const { confirm } = Modal;

export default function Homeview() {

    // const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [currentId, setCurrentId] = useState({})
    const [visibleState, setVisibleState] = useState(false)
    const [visibleAdd,setVisibleAdd] =useState(false)

    const updataForm = useRef(null)
    useEffect(() => {
        axios.get('/detail').then(res => {
            setDataSource(res.data)
        })
    }, [])

    const handleDelete = (item) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                deleteItem(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const deleteItem = (item) => {
        console.log(item.id);
        let list = dataSource.filter(data => data.id !== item.id)
        setDataSource(list)
        axios.delete(`detail/${item.id}`).then(() => {
            message.success('已为你移除');
        })

    }



    const handleUpdate = (item) => {
        setCurrentId(item.id)
        console.log(updataForm);
        setTimeout(() => {
            updataForm.current.setFieldsValue(item)
        }, 0)

        setVisibleState(true)






    }

    const handleOK = () => {
        updataForm.current.validateFields().then(value => {
            console.log(value);
            setDataSource(dataSource.map(item => {
                if (item.id === currentId) {
                    return { ...item, ...value }
                }
                else {
                    return item
                }
            }))

            axios.patch('/detail', {
                ...value
            })
        })


        setVisibleState(false)

    }

    const handleAdd =()=>{
        // updataForm.current.resetFields()
        setVisibleAdd(true)
    }

    const handleAddOK =()=>{
        updataForm.current.validateFields().then(value=>{
            
            console.log(dataSource.map(item=>item));
            console.log(dataSource);
            console.log(value);
            axios.post('/detail',{
                ...value,
                "count":value.count*1,
                "sit":value.sit*1
            }).then((res)=>{
                setTimeout(()=>{
                    updataForm.current.resetFields()
                },0)

                setDataSource([res.data,...dataSource])
            })
        })

        setVisibleAdd(false)
    }


    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     render: (id) => <b>{id}</b>
        // },

        {
            title: '创建时间',
            dataIndex: 'create_time',

        },
        {
            title: '物品名称',
            dataIndex: 'show_name',

        },
        {
            title: '数量',
            dataIndex: 'count',

        },

        {
            title: '座位',
            dataIndex: 'sit',

        },

        {
            title: '使用人',
            dataIndex: 'user_name',

        },

        {
            title: '操作',
            render: (item) => {
                return <div> <Button type='danger' size='small' onClick={() => handleDelete(item)}>删除</Button>,
                    <Button type='primary' size='small' onClick={() => handleUpdate(item)}>编辑</Button></div>

            }
        }
    ]
    return (
      
        <div>
              <Button type='primary' style={{marginBottom:'2px'}} onClick={handleAdd}>111</Button>
            <Modal visible={visibleState} onOk={() => handleOK()} onCancel={() => setVisibleState(false)}>
                <UpdateForm ref={updataForm} />
            </Modal>
            <Modal visible={visibleAdd} onOk={ handleAddOK} onCancel={() => setVisibleAdd(false)}>
                <UpdateForm ref={updataForm} />
            </Modal>

            <Table dataSource={dataSource} columns={columns}
                pagination={
                    {
                        pageSize: 2
                    }
                } rowKey={(item) => item.id}
            />;
        </div>
    )
}
