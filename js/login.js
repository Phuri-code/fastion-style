function login(){
    var form = document.getElementById("loginForm");


    var input_email = form.elements.namedItem("gmail").value;
    var input_password = form.elements.namedItem("password").value;
    var get_users = localStorage.getItem("users");
    var obj_users = JSON.parse(get_users);
    var isExist = false;
    

    for(let i =0; i<obj_users.length; i++){
        
        if(obj_users[i].email == input_email){
            isExist= true;
            if(obj_users[i].password!= input_password){
                notifyMessage("Wrong Password","red");
            }
            else{
                localStorage.setItem("currentUser",JSON.stringify(obj_users[i]));
                window.open('./home.html',"_self");
            }
        }  
    }
    if(!isExist){
        notifyMessage("User dosen't existed!","red");
    }

}
