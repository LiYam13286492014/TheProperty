import Homeview from "../views/homeview";
import Login from "../views/login/login";
import Pushview from "../views/pushview";
import Select from "../views/select";
import User from "../views/user";





export default [

    {
        path:'/home',
        element:<Homeview/>
    },

    {
        path:'/pushin',
        element:<Pushview/>
    },

    {
        path:'/select',
        element:<Select/>
    },
    
    {
        path:'/user',
        element:<User/>
    }
]