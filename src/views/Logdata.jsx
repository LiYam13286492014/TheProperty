import React, { useEffect, useState } from 'react'
import { Timeline, PageHeader, Divider, Button } from 'antd';
// import axios from 'axios';
import log from  '../network/log'



export default function LogData() {
  const { username } = JSON.parse(localStorage.getItem('aa'))
  const [logData, setLogoData] = useState([])
  const [moreData,setMoreData] =useState(10)

  useEffect(() => {
    // Promise.all([
    //   axios.get('http://localhost:3006/log'),
    //   axios.get('/storehouse')
    // ]).then(res=>{
    //   console.log([...res[0].data,...res[1].data]);

    // })
    log.get(`/log?_sort=id&_order=desc&_limit=${moreData}`).then(res => {
      setLogoData(res.data)
    })


  }, [moreData])

  const handleMore =()=>{
    // let newdata = moreData + 2
    setMoreData(moreData + 5)
    
  }
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => {setMoreData(moreData - 5)}}
        title="日志操作记录"
        subTitle="The Log..."
      />

      <Divider>时间事件</Divider>

      <Timeline mode="alternate" >
        {
          logData.length !== 0 && logData.map(item => {
            return <Timeline.Item key={item.id}>
              {item.create_time} {username}{item.type}{item.show_name} 库存变动:{item.count <= 0 ? item.count:`+${item.count}`} 当前剩余:{item.leave_count}</Timeline.Item>
          })
        }


      </Timeline>

      <Button onClick={handleMore} style={{marginLeft:'50%',transform: 'translateX(-50%)',background:'#ddd'}} >Load More</Button>


    </div>



  )
}
