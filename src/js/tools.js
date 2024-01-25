

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
    const auth=await fetch('/api/Alreadylogin',{
        method:'Get',
        headers:{
            'Content-Type':'Appliction/json',
            'authorization':`Bearer ${user.jwttoken}`
        }

    })
    if(auth.ok){
        const {loginnewuser}=await auth.json()
                       
        console.log(loginnewuser)
        
        if(thispage==='User'){
            if(loginnewuser.power==='User'){
                setAccesspage(true)
            }   
            else{
                navigate('/')
            }
        }
        if(thispage==='Admin') {
            if(loginnewuser.power==='Admin'){
                setAccesspage(true)
            }    else{
                navigate('/')
            }
        }
        if(thispage==='SupportTeam'){
            if(loginnewuser.power==='SupportTeam'){
                setAccesspage(true)
            }  else{
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



export {checkspace,checkpassword,checkalreadyclint}