import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import axios from 'axios';
import { Button,Modal } from 'antd';
import PushForm from './components/pushForm';
import moment from 'moment';
export default function Pushview() {
  const pushRef = useRef()
  const[storeState,setStoreState] =useState([])
  const[typeShow,setTypeShow] =useState([])
  const[currentOk,setCurrentOk] =useState(0)
  const[visibleState,setVisibleState] =useState(false)
  useEffect(() => {
    axios.get('/storehouse').then(res=>{
      
       setStoreState(res.data)  
       cc(res.data)  
       console.log(res.data);
    })

    axios.get('category').then(res=>{
      setTypeShow(res.data)
    })
    

    
  }, [])
  function cc(list){
    var myChart = echarts.init(document.getElementById('main'));
    var option;
    option = {
      title: {
        text: '当前库存数据统计',
        subtext: 'All Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          name: '数据',
          type: 'pie',
          radius: '50%',
          data:list.map(item=>{
             return {value:item.count,name:item.title}
          }),
          
            
            
          
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }
  const pieRef = useRef()
  
 const handleOk =(type)=>{
    if(type===1){
      pushRef.current.validateFields().then(value=>{
        console.log(storeState.find(item=>item.title===value.title));
        storeState.find(item=>{
          if(item.title===value.title){
            axios.patch(`/storehouse/${item.id}`,{
              count:item.count + value.count*1,
              la_in_time:moment(Date.now()).format('YYYY-MM-DD')
            }).then((res)=>{
              axios.post('http://localhost:3006/log',{
                            type:'入库',
                            count:value.count*1 ,
                            show_name:value.show_name,
                            create_time:moment(Date.now()).format('YYYY.MM.DD'),
                            leave_count:res.data.count
                            
                        }).then(()=>{
                          window.location.reload()
                        })
                // setStoreState([...storeState,res.data])
               
                         
            })
          
          }
        })
  
      !storeState.find(item=>item.title===value.title)  &&  axios.post('/storehouse',{
          title:value.title,
          count:value.count*1,
          la_in_time:moment(Date.now()).format('YYYY-MM-DD'),
          la_out_time:0,
          la_change:""
          
        }).then(()=>{
          window.location.reload()
        })
      })
    }else if(type===2){
      pushRef.current.validateFields().then(value=>{
        axios.get(`/storehouse?title=${value.title}`).then(res=>{
          console.log(res.data[0]);
           axios.patch(`/storehouse/${res.data[0].id}`,{
             count:value.count*1
           }).then(res=>{
            axios.post('http://localhost:3006/log',{
              type:'更新',
              count:value.count*1 ,
              show_name:value.show_name,
              create_time:moment(Date.now()).format('YYYY.MM.DD'),
              leave_count:res.data.count
              
          }).then(()=>{
            window.location.reload()
          })
            
           })
        })
      })
    }

    setVisibleState(false)
 }
  

  return (
    <div>
      <Button type='primary' onClick={()=>{setVisibleState(true)
        setCurrentOk(1)}}>新增库存</Button>
      <Button type='primary' onClick={()=>{setVisibleState(true)
        setCurrentOk(2)}}>修改库存</Button>
      <Modal visible={visibleState} onOk={()=>handleOk(currentOk)} onCancel={()=>{setVisibleState(false)}} >
        <PushForm  typeShow={typeShow} ref={pushRef} />
      </Modal>
      <div ref={pieRef}  id='main' style={{  height: "600px" }}> </div>

    </div>


  )
}
