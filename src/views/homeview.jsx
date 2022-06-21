import React, { useEffect, useRef, useState } from 'react'
import './homeview.css'
// import axios from '../network/http'
import { Button, Table, Modal, message, Tag, Input, Avatar, List, Divider } from 'antd'
import Icon, { ExclamationCircleOutlined, ArrowDownOutlined, BookOutlined,DeleteFilled } from '@ant-design/icons';
import UpdateForm from '../component/Form/UpdateForm';
import moment from 'moment'
import axios from 'axios';

const { confirm } = Modal;

export default function Homeview() {

    // const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [currentId, setCurrentId] = useState({})
    const [currentCount,setCurrentCount] =useState(0)
    const [visibleState, setVisibleState] = useState(false)
    const [visibleAdd, setVisibleAdd] = useState(false)
    const [filterName, setFilterName] = useState([])


    const [currentData, setCurrentData] = useState([])
    const [sum, setSum] = useState(0)
    const updataForm = useRef(null)

 const EditSvg=()=>
    (<svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M745.016889 314.311111l-120.661333-120.661333 60.302222-60.302222a28.444444 28.444444 0 0 1 40.277333 0l80.440889 80.384a28.444444 28.444444 0 0 1 0 40.220444l-60.302222 60.359111z m-40.220445 40.220445L356.181333 703.146667a56.888889 56.888889 0 0 1-32.199111 16.099555l-122.026666 17.464889 17.464888-122.026667a56.888889 56.888889 0 0 1 16.099556-32.199111l348.615111-348.615111 120.661333 120.661334zM483.555556 682.666667h227.555555a28.444444 28.444444 0 1 1 0 56.888889h-227.555555a28.444444 28.444444 0 1 1 0-56.888889z m-227.555556 113.777777h512a28.444444 28.444444 0 1 1 0 56.888889h-512a28.444444 28.444444 0 1 1 0-56.888889z" fill="#5A6677" p-id="8399"></path>
    </svg>)
 
 const EditIcon = (props) => <Icon component={EditSvg} {...props} />;

    useEffect(() => {
        // axios.get('/detail').then(res => {
        //     setDataSource(res.data)



        // })
        axios.get('/detail?_order=desc&_sort=id').then(res => {
            setDataSource(res.data)
        })

        axios.get('/category').then(res => {
            setFilterName(res.data)
        })


    }, [])

    useEffect(() => {
        setSum(currentData.reduce((sum, item) => {
            return sum + item.count
        }, 0))
    }, [currentData])

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
        axios.delete(`/detail/${item.id}`).then(() => {
            message.success('已为你移除');
        })

        axios.get(`/storehouse/?title=${item.show_name}`).then(res=>{
            console.log(res.data);
            const{id,count} = res.data[0]
            axios.patch(`/storehouse/${id}`,{
                count: count +item.count,
                la_change:moment(Date.now()).format('YYYY-MM-DD') + `-->${item.count}`
            }).then(res=>{
                axios.post('http://localhost:3006/log',{
                            type:'删除',
                            count:item.count,
                            show_name:item.show_name,
                            create_time:moment(Date.now()).format('YYYY.MM.DD'),
                            leave_count:res.data.count
                            
                        })
            })
        })

    }



    const handleUpdate = (item) => {
        setCurrentId(item.id)
        setCurrentCount(item.count)
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

            axios.patch(`/detail/${currentId}`, {
                ...value
            }).then(res => {

                console.log(res.data);
                axios.get(`/storehouse?title=${value.show_name}`).then(res=>{
                    console.log(res.data[0]);
                    const list =res.data[0]
                    const{id,count} =list
                    axios.patch(`/storehouse/${id}`,{
                        count:count - (value.count*1 - currentCount),
                        la_change:moment(Date.now()).format('YYYY-MM-DD') + `-->${value.count*1 - currentCount}`
                    
                    }).then(res=>{
                        axios.post('http://localhost:3006/log',{
                            type:'修改',
                            count:value.count*1 - currentCount,
                            show_name:value.show_name,
                            create_time:moment(Date.now()).format('YYYY.MM.DD'),
                            leave_count:res.data.count
                            
                        })
                    })
                })
              
            })


        })

          
        setVisibleState(false)

    }

    const handleAdd = () => {
        // updataForm.current.resetFields()
        setVisibleAdd(true)
    }

    const handleAddOK = () => {
        updataForm.current.validateFields().then(value => {

            console.log(dataSource.map(item => item));
            console.log(dataSource);
            console.log(value);
            axios.post('/detail', {
                ...value,
                "count": value.count * 1,
                "sit": value.sit * 1,
                "create_time": moment(Date.now()).format('YYYY-MM-DD')
            }).then(res => {
                console.log(res.data);
               axios.get(`/storehouse?title=${value.show_name}`).then(res=>{
                   console.log(res.data[0]);
                   const list =res.data[0]
                   const{id,count} =list
                   axios.patch(`/storehouse/${id}`,{
                       count:count - value.count*1,
                       la_out_time:moment(Date.now()).format('YYYY-MM-DD')
                   }).then(res=>{
                    axios.post('http://localhost:3006/log',{
                        type:'出库',
                        count:value.count*1,
                        show_name:value.show_name,
                        create_time:moment(Date.now()).format('YYYY.MM.DD'),
                        leave_count:res.data.count
                        
                    })
                   })
                   
                   
               })
                setTimeout(() => {
                    updataForm.current.resetFields()
                }, 0)

                setDataSource([res.data, ...dataSource])
            })
        })

        setVisibleAdd(false)
    }


    const handleEnter = (e) => {


        // setDataSource(dataSource.filter(item=>item.user_name===e.target.value))


        setCurrentData(dataSource.filter(item => item.user_name.includes(e.target.value)))

        currentData.length !== 0 && setSum(currentData.reduce((sum, item) => {
            return sum + item.count
        }, 0))



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
            // defaultSortOrder:'descend',
            title: '物品名称',
            dataIndex: 'show_name',
            filterSearch: true,
            filters: [
                ...filterName.map(item => {
                    return {
                        text: item.title,
                        value: item.value
                    }
                })
            ],
            onFilter: (value, item) => {
                return item.show_name === value
            }

        },
        {
            title: '数量',
            dataIndex: 'count',
            filterIcon: <ArrowDownOutlined />

        },

        {
            title: '座位',
            dataIndex: 'sit',

        },

        {

            title: '使用人',
            dataIndex: 'user_name',
            render:(user_name)=>{
               return  <Tag color="orange">{user_name}</Tag>

            },

            // filters:[
            //     {
            //         text:currentValue,
            //         value:currentValue
            //     }
            // ],
            filterDropdown: () => {

                return (
                    <Input onPressEnter={(value) => handleEnter(value)} />
                )
            },

            onFilter: (value, item) => {
                console.log(2);
                return item.user_name === value

            },



        },

        {
            title: '操作',
            render: (item) => {
                return <div> <Button shape='circle' type='danger'  onClick={() => handleDelete(item)} icon={<DeleteFilled />}></Button>
                    <Button type='primary' shape='circle'  onClick={() => handleUpdate(item)} icon={<EditIcon style={{color: 'hotpink', }}/>}></Button></div>

            }
        }
    ]

    
    return (

        <div style={{height:'100%'}}>
            <Button type='primary' style={{ marginBottom: '2px' }} onClick={handleAdd}>添加数据</Button>
            <Modal visible={visibleState} onOk={() => handleOK()} onCancel={() => setVisibleState(false)}>
                <UpdateForm shows_op={filterName} time={1} ref={updataForm} />
            </Modal>
            <Modal visible={visibleAdd} onOk={handleAddOK} onCancel={() => setVisibleAdd(false)}>
                <UpdateForm shows_op={filterName} time={2} ref={updataForm} />
            </Modal>

            <Table style={{ height: '400px', overflow: 'auto', }} dataSource={dataSource} columns={columns}
                pagination={
                    {
                        pageSize: 10
                    }
                } rowKey={(item) => item.id}
            />

            <Divider><p style={{ fontSize: '8px', color: '#ddd' }}>数据展示区</p></Divider>

            {
                <div className='filterList' style={{ height: '300px', marginTop: '20px' }}>

                    {
                        currentData.length !== 0 && <div><span>为你找到{currentData.length}条数据</span>
                            <p>其中商品数量总和:{sum}</p>
                        </div>

                    }
                    <List
                        itemLayout="horizontal"
                        dataSource={currentData}
                        renderItem={item => {
                            if (currentData.length !== 0) {
                                console.log(currentData);
                                return (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<BookOutlined />} style={{ backgroundColor: '#87d068' }} />}
                                            title={<a href="https://ant.design">{item.user_name}</a>}
                                            description={<span>创建时间:{item.create_time}  商品名称:{item.show_name} 数量:{item.count} 座位:{item.sit}</span>
                                            }
                                        />
                                    </List.Item>
                                )
                            }
                        }
                        }
                    />
                </div>
            }
        </div>
    )
}
