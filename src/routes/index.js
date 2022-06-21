import { Navigate } from "react-router-dom";
import Category from "../views/category";
import Change from "../views/change";
import Homeview from "../views/homeview";
import Login from "../views/login/login";

import Pushview from "../views/pushview";
import Rolerights from "../views/rolerights";
import LogData from "../views/Logdata";
import User from "../views/user";





const list = ()=>{
    const allRouter ={
        '/home':<Homeview/>,
        '/pushin':<Pushview/>,
        '/log':<LogData/>,
        '/user':<User/>,
        '/category':<Category/>,
        '/rolerights':<Rolerights/>,
        '/change':<Change/>
    
    }
 if(localStorage.getItem('aa'))
 {
    const{roles:{rights}} = JSON.parse(localStorage.getItem('aa'))
    return (
        [
            ...rights.map(item=>{
              return {
                  path:item,
                  element:allRouter[item]
              }
          }),
      
      
              {
              path:'/',
              element:<Navigate to='/home'/>
          }
      ] 
  )
 }

 else {
     return []
 }

}


export default list



// export default [

//     {
//         path:'/home',
//         element:<Homeview/>
//     },

//     {
//         path:'/pushin',
//         element:<Pushview/>
//     },

//     {
//         path:'/select',
//         element:<Select/>
//     },
    
//     {
//         path:'/user',
//         element:<User/>
//     },
//     {
//         path:'/category',
//         element:<Category/>
//     },
//     {
//         path:'/rolerights',
//         element:<Rolerights/>
//     },
//     {
//         path:'/',
//         element:<Navigate to='/home'/>
//     }
// ]