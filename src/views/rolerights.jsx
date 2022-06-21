import React, { useEffect, useRef, useState } from 'react'
import { Button, Table, Modal, message, Tag, Switch, Tree, Steps, Input, Divider } from 'antd'
import { ExclamationCircleOutlined ,DeleteFilled,UnorderedListOutlined} from '@ant-design/icons';
import axios from '../network/http'
const { confirm } = Modal;
const { Step } = Steps;
export default function Rolerights() {
    const [treeData, setTreeData] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [currentId, setCurrentId] = useState({})
    const [currentRights, setCurrentRights] = useState([])
    const [roleAddVisible, setRoleAddVisible] = useState(false)
    const [current, setCurrent] = useState(0);
    const[inputVlue,setInputValue] =useState('')

    const myref =useRef()
    const steps = [
        {
            title: '角色名字',
            content: '',
        },
        {
            title: '权限分配',
            content: '',
        },

    ];



    useEffect(() => {
        axios.get('/roles').then(res => {
            setDataSource(res.data)
            console.log(res.data);
        })

        axios.get('/sider').then(res => {
            setTreeData(res.data.map(item => {
                return {
                    title: item.label,
                    key: item.key
                }
            }))
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
        axios.delete(`/roles/${item.id}`).then(() => {
            message.success('已为你移除');
        })

    }

    const handleEdit = (item) => {
        setIsModalVisible(true)
        setCurrentId(item.id)
        setCurrentRights(item.rights)
    }

    const handleOK = () => {
        setIsModalVisible(false)
        
        setDataSource(dataSource.map(item => {
            if (item.id === currentId) {
                return { ...item, rights: currentRights }
            } else { return item }
        }))
        axios.patch(`/roles/${currentId}`, {
            rights: currentRights
        })
    }


    const onCheck = (checkedKeys) => {
        console.log(checkedKeys);
        setCurrentRights(checkedKeys)

    }

    const handleAddOK =()=>{
        setRoleAddVisible(false) 
        setCurrent(0)
        
        axios.post('/roles',{
            id:dataSource.length+1,
            rolename:inputVlue,
            rights:currentRights
        }).then(res=>{
            setDataSource([...dataSource,res.data])
        })

        
    }


    const next = () => {
        setCurrent(current + 1);
        console.log(myref.current.input.value);
        setInputValue(myref.current.input.value)
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>
        },


        {
            title: '等级',
            dataIndex: 'rolename',
            render:(rolename)=>(
                <Tag color='red'>{rolename}</Tag>
            )

        },




        {
            title: '操作',
            render: (item) => {
                return <div> <Button shape='circle' icon={<DeleteFilled />} type='danger'  onClick={() => handleDelete(item)} ></Button>
                    <Button type='primary' icon={<UnorderedListOutlined />} shape='circle'  onClick={() => handleEdit(item)}></Button></div>

            }
        }
    ]
    return (


        <div>
            <Button type='primary' onClick={() => { setRoleAddVisible(true) }}>添加角色</Button>

            <Modal title='权限分配' visible={isModalVisible} onOk={handleOK} onCancel={() => { setIsModalVisible(false) }}>
                <Tree
                    checkable
                    selectable
                    checkedKeys={currentRights}
                    onCheck={onCheck}

                    treeData={treeData}
                />
            </Modal>
            <Modal title='添加角色' visible={roleAddVisible} onOk={handleAddOK} onCancel={() => { setRoleAddVisible(false) }}>
                <Steps current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">
                    {current === 0 &&
                        <div>
                            <Divider orientation="left" style={{ color: '#ddd', fontSize: '10px' }}>角色名字</Divider>
                            <div style={{ padding: ' 10px 50px 30px' }}>
                                <Input ref={myref} placeholder='输入角色名字' />
                            </div>
                        </div>
                    }

                    {current === 1 &&
                        <div>
                            <Divider orientation="left" style={{ color: '#ddd', fontSize: '10px' }}>权限分配</Divider>
                            <div style={{ padding: ' 10px 0px' }} >
                                <Tree
                                    checkable
                                    selectable
                                    checkedKeys={currentRights}
                                    onCheck={onCheck}

                                    treeData={treeData}
                                />
                            </div>
                        </div>
                    }
                    
                </div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {/* {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )} */}
                    {current > 0 && (
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                </div>
            </Modal>
            <Table dataSource={dataSource} columns={columns}
                pagination={
                    {
                        pageSize: 7
                    }
                } rowKey={(item) => item.id}
            />
        </div>
    )
}
