import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Tag } from 'antd';
import {CloseCircleOutlined,CloseOutlined } from '@ant-design/icons';
import axios from '../network/http'

export default function Category() {
    const EditableContext = React.createContext(null);
    const[dataSource,setDataSource]=useState([])
    const[count,setCount] =useState(2)


    useEffect(()=>{
        axios.get(`/category`).then(res=>{
            setDataSource(res.data)
        })
    },[])


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',



        },
        {
            title: '商品种类',
            dataIndex: 'title',
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: 'title',
                title: '商品种类',
                handleSave: handleSave
            }),
            render:(title)=>{
                return <Tag color='green'>{title}</Tag>
            }


        },




        {
            title: '操作',
            render: (item) => {

                return <div >
                    <Button  shape='circle' icon={<CloseOutlined />} danger onClick={()=>handleDelete(item)} ></Button>


                </div>
            }
        }
    ];
    
    const handleSave =(record)=>{
        console.log(record);
        axios.patch(`/category/${record.id}`,{
            title:record.title,
            value:record.title
        }).then(res=>{

         
            setDataSource(dataSource.map(item=>{
                if(item.id===record.id){
                    return res.data
                }else{
                    return item
                }
            }))
        })

    }

    const handleAdd =()=>{
        // const newData={
        //     id:count+1,
        //     title:`cc ${count +1} `,
        //     value:`cc ${count +1}`
        // }
        // setDataSource([...dataSource,newData])
        // setCount(count+1)
        axios.post('/category',{
            
            title:`cc ${count +1} `,
            value:`cc ${count +1}`
        }).then(res=>{
            console.log(res.data);
            setDataSource([...dataSource,res.data])
        })
    }

    const handleDelete=(item)=>{
        setDataSource(dataSource.filter(data =>data.id !==item.id))
        axios.delete(`/category/${item.id}`)
    }

    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    return (
        <div>
            <div>
                <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    添加种类
                </Button>
                <Table
                    components={components}
                    pagination={
                        {pageSize:7}
                    }
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    rowKey={(item)=>item.id}
                />
            </div>
        </div>
    )
}
