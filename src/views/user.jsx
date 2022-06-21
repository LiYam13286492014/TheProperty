import React ,{useEffect, useRef, useState}from 'react'
import { Button, Table, Modal, message, Form,Switch, Tag } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from '../network/http'
import UserForm from '../component/Form/UserForm';

const { confirm } = Modal;
export default function User() {

  const [dataSource, setDataSource] = useState([])
  const [currentId, setCurrentId] = useState({})
  const [visibleState, setVisibleState] = useState(false)
  const [visibleUpdate,setVisibleUpdate] =useState(false)
  const [roleList,setRoleList] =useState([])

  const userForm =useRef(null)

  useEffect(()=>{
    axios.get('/user').then(res=>{
      setDataSource(res.data)
      console.log(res.data);
    })


    axios.get('/roles').then(res=>{
      setRoleList(res.data)
    })
  },[])

  const SwChange =(item)=>{
    axios.patch(`/user/${item.id}`,{
      state: !item.state
    }).then((res)=>{
      setDataSource(dataSource.map(data=>{
        if(data.id===res.data.id){
          return res.data
        }else{
          return data
        }
      }))
    })
  }

  
  const handleAdd =()=>{
   
    setVisibleState(true)
}

const handleCancel =()=>{
  setVisibleState(false)
}

const handleUpdateCancel=()=>{
  setVisibleUpdate(false)
}

  const handleOK =()=>{
    userForm.current.validateFields().then(value=>{
      axios.post('/user',{
        ...value,
        state:true
      }).then((res)=>{
        setTimeout(()=>{
          userForm.current.resetFields()
        },0)

        setDataSource([...dataSource,res.data])
      })
    })
    setVisibleState(false)
  }

  



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
    axios.delete(`/user/${item.id}`).then((res)=>{
      message.success(`已为您移除${res.data.username}`)
    })
  

}



const handleUpdate = (item) => {
    setCurrentId(item.id)
    setTimeout(()=>{
      userForm.current.setFieldsValue(item)
    },0)

    setVisibleUpdate(true)
 






}

const handleUpdateOK =()=>{
   userForm.current.validateFields().then(value=>{
     setDataSource(dataSource.map(item=>{
       if(item.id ===currentId){
         return {...item,...value}
       }else{
         return item
       }
     }))
      axios.patch(`/user/${currentId}`,{
        ...value
      })
   })

   setVisibleUpdate(false)

   
}

  const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: (id) => <b>{id}</b>
    },


    {
        title: '用户名',
        dataIndex: 'username',
        render:(username)=>{
          return <Tag color='orange'>{username}</Tag>
        }

    },
    {
        title: '用户状态',
        dataIndex: 'state',
        render:(_,item)=>{
          return <Switch checked={item.state} onChange={()=>SwChange(item)}></Switch>
        }

    },

 

    {
        title: '操作',
        render: (item) => {
            return <div> <Button type='danger' size='small' onClick={() => handleDelete(item)}>删除</Button>
                <Button type='primary' size='small' onClick={() => handleUpdate(item)}>编辑</Button></div>

        }
    }
]
  return (
    <div>
      <Button type='primary' onClick={handleAdd}>添加用户</Button>
      <Modal visible={visibleState} onOk={handleOK} onCancel={handleCancel}>
        <UserForm ref={userForm} roleList={roleList}/>
      </Modal>
      <Modal visible={visibleUpdate} onOk={handleUpdateOK} onCancel={handleUpdateCancel}>
        <UserForm ref={userForm} roleList={roleList}/>
      </Modal>
      
      <Table dataSource={dataSource} columns={columns}
        pagination={
          {
            pageSize: 4
          }
        } rowKey={(item) => item.id}
      />
    </div>
  )
}
