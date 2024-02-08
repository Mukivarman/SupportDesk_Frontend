

const checkspace=(word)=>{
    const space=/\s/
    space.test(word)?false:true;
   
}


const checkpassword=(word)=>{
    const upper=/[A-Z]/;
    const lower=/[a-z]/;
    const digit=/[0-9]/;
    const symbol=/[@#$?&*]/
    if(upper.test(word)&&lower.test(word)&&digit.test(word)&&symbol.test(word)){
        return true;
    }
    else{
        return false;
    }
}

const checkalreadyclint=async(user,setAccesspage,navigate,thispage)=>{
    const auth=await fetch('https://supportdesk-hm1g.onrender.com/api/Alreadylogin',{
        method:'Get',
        headers:{
            'Content-Type':'Application/json',
            'authorization':`Bearer ${user.jwttoken}`
        }

    })
    if(auth.ok){
        const {loginnewuser}=await auth.json()
                       
       
        
        if(thispage==='User'){
            if(loginnewuser.power==='User'){
                setAccesspage(true)
            }   
            else{
                localStorage.setItem('loguser','')
                localStorage.setItem('profile_img','')
                navigate('/')
            }
        }
        if(thispage==='Admin') {
            if(loginnewuser.power==='Admin'){
                setAccesspage(true)
               
            }   
             else{
                localStorage.setItem('loguser','')
                localStorage.setItem('profile_img','')
                navigate('/')
            }
        }
        if(thispage==='SupportTeam'){
            if(loginnewuser.power==='SupportTeam'){
                setAccesspage(true)
            }  else{
                localStorage.setItem('loguser','')
                localStorage.setItem('profile_img','')
                navigate('/')
            }
        }       
       
      

    }else{
        console.log(await auth.json())
        localStorage.setItem('loguser','')
        localStorage.getItem('profile_img','')
        navigate('/Login')

    }
} 

const fetch_Api=async(linkspath,method,jwt,postdata)=>{

    try{
        console.log(linkspath+method+jwt+postdata)
      const option= method==="Get"||method==="Delete"?{
        method:method,
        headers:{
            "Content-Type":"application/json",
            'authorization':`Bearer ${jwt}`,
        },
    }:{
        method:method,
        headers:{
            "Content-Type":"application/json",
            'authorization':`Bearer ${jwt}`,
        },
        body:postdata,
    }

        const req=await fetch(`https://supportdesk-hm1g.onrender.com/${linkspath}`,option)
        if(req.ok){
            const res=await req.json();
           console.log(res)
            const res_obj={
                Res:true,
               data:res,

            }
            return res_obj
        }
        else{
            const res=await req.json()
            console.log(res)
            const res_obj={
                Res:false,
                msg:res,
            }
            return res_obj
        }
    
    }catch(e){
console.error(e)

    }
}


export {checkspace,checkpassword,checkalreadyclint,fetch_Api}