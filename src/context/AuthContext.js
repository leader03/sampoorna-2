import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    const baseURL = 'https://server.sampoornakitab.com'
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTo') ? JSON.parse(localStorage.getItem('authTo')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTo') ? jwt_decode(localStorage.getItem('authTo')) : null)
    let [loading, setLoading] = useState(true)
    const [loadings,setLoadings] = useState(false)
    const [pwerr,setPwerr] = useState(false)
    const [islogged,setIslogged] = useState(()=> localStorage.getItem('authTo') ? true : false)
    const navigate = useNavigate()
    const [serverError,setServerError] = useState(false)


    let loginUser = async (e )=> {
        setPwerr(false)
        setServerError(false)
        e.preventDefault()
        setLoadings(true)
        let response = await fetch(`${baseURL}/account/login/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })

        if(!response.ok){
            if(response.status == 500){
                setPwerr(false)
                setServerError(true)
                setLoadings(false)                      
            }
        }
        
        let data = await response.json()
        if(response.status === 200){
            console.log(data);
            setServerError(false)
            setPwerr(false)
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            setIslogged(prev=>!prev)
            localStorage.setItem('authTo', JSON.stringify(data))
            setLoadings(false)
            navigate("/report")
        }
        else if(response.status === 401){
            // alert('Invalid Username or Password')
            setServerError(false)
            setPwerr(true)
            // setTimeout(() => {
            //     setPwerr(false)
            //   }, 2000)
            setLoadings(false)
        }
        else{
            alert('Server error. Please try again later.')
            setLoadings(false)
        }
    }

    let reset_password = async (e )=> {
        e.preventDefault()
        await fetch(`${baseURL}/account/reset_password/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value})
        })
    }

    const changePassword = async(e) =>{
        e.preventDefault()
        let response = await fetch(baseURL+'/account/change_password/', {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${authTokens?.access}`
            },
            body:JSON.stringify({'old_password':e.target.oldpwd.value, 'password':e.target.pwd1.value, 'password2':e.target.pwd2.value})
        })
        if(response.status === 200){
            // navigate('/') 
            console.log('yess');
        }else{
            alert('Something went wrong!')
        }
    }
    


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTo')
        navigate('/')
        setIslogged(false)
    }


    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        islogged:islogged,
        reset_password:reset_password,
        baseURL:baseURL,
        changePassword:changePassword,
        loadings:loadings,
        pwerr:pwerr,
        setPwerr:setPwerr,
        serverError:serverError
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
