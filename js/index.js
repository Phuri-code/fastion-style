

function setAdmin(){
    if(localStorage.getItem("users")==null){
        let admin_user = {

            email: "admin@gmail.com",
            password: "admin",
            cart:[]
        }
        let users = [];
        users.push(admin_user);
        localStorage.setItem("users", JSON.stringify(users));
    }
}
function register(){
    var formElement = document.getElementById("signupform");

    var input_name = formElement.elements.namedItem("name").value;
    var input_gmail = formElement.elements.namedItem("gmail").value;
    var input_gender = formElement.elements.namedItem("gender").value;
    var input_date_of_birth = formElement.elements.namedItem("birthday").value;
    var input_country = formElement.elements.namedItem("country").value;
    var input_password = formElement.elements.namedItem("password").value;
    var confirm_password = formElement.elements.namedItem("confirmPassword").value;
    if(input_password!=confirm_password){
        notifyMessage("Password is not Match!","red");
    }
    else{
        // if(localStorage.getItem("users")==null)
        // {
        //     localStorage.setItem("users", "[ ]");
        // }

        
        var get_users = localStorage.getItem("users");
        var obj_users = JSON.parse(get_users)
        let user = {
            Name: input_name,
            email: input_gmail,
            gender:input_gender,
            birthday:input_date_of_birth,
            country:input_country,
            password:input_password,
            cart:[]
        }
        obj_users.push(user);
        localStorage.setItem("users", JSON.stringify(obj_users));

        window.open('./login.html',"_self");


    }
}

function setValue(){
    localStorage.setItem("name", "dyna");
    var value1 = localStorage.getItem("name");
    console.log(value1);
    localStorage.setItem("name", "pina");
    var value2 = localStorage.getItem("name");
    console.log(value2);
}


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
                // window.open('./home.html?email='+email+"&password="+ password,"_self");

                window.open('./home.html',"_self");
            }
        }  
    }
    if(!isExist){
        notifyMessage("User dosen't existed!","red");
    }

}



function notifyMessage(message, color){
    var message_box = document.createElement("div");
    message_box.style.width = "max-content";
    message_box.style.height = "max-content";
    message_box.style.position = "fixed";
    message_box.style.display = "sticky";
    message_box.style.top= "50px";
    message_box.style.right = "50px";
    message_box.style.borderRadius = "5px";
    message_box.style.boxSizing = "border-box";
    message_box.style.padding = "10px";
    message_box.style.backgroundColor = color;
    message_box.style.boxShadow = "3px 3px WhiteSmoke";
    var text_message = document.createElement("p");
    text_message.style.color = "white";
    text_message.innerHTML = message;
    text_message.style.fontFamily = "Arial, Helvetica, sans-serif";
    message_box.appendChild(text_message);
    document.body.appendChild(message_box);
    message_box.classList.add("message_box");
    setTimeout(()=>{
        document.body.removeChild(message_box);
    },3000);
}

function resetPassword(){
    var formElement = document.getElementById("reset_password");

    var input_email = formElement.elements.namedItem("gmail").value;
    var input_old_password = formElement.elements.namedItem("old_password").value;
    var input_new_password  = formElement.elements.namedItem("new_password").value;
    var input_confirm_new_password = formElement.elements.namedItem("confirm_new_password").value;
    var isUserExist = false;
    var isMatchPassword = false;
    if(input_new_password!=input_confirm_new_password){
        notifyMessage("New Password is not Match!", "red");
    }
    else{
        let get_users = localStorage.getItem("users");
        let obj_users = JSON.parse(get_users);
        for(let i = 0; i<obj_users.length; i++){
            if(obj_users[i].email == input_email){
                isUserExist = true;
                if(obj_users[i].password == input_old_password) {
                    isMatchPassword = true;
                    obj_users[i].password = input_new_password;
                    localStorage.setItem("users", JSON.stringify(obj_users));
                    notifyMessage("Reset Password Succesful", "green");
                    window.open('./login.html',"_self");

                    break;

                }
            }
        }
        if(!isUserExist){
            notifyMessage("User doesn't exist!", "red");
        }
        else if(!isMatchPassword){
            notifyMessage("Old Password is not matched!", "red");
        }

    }
}


function checkAdmin(){
    var currentUser =  JSON.parse(localStorage.getItem("currentUser"))  ;
    var email = currentUser.email;
    var password = currentUser.password;
    var link_element = document.getElementById("admin_link");

    if(email =="admin@gmail.com" && password=="admin"){
        link_element.style.visibility = "visible";
    }
    else{
        link_element.style.visibility = "hidden";
    }
}


function diplayCurrentUser (){

    var currentUser =  JSON.parse(localStorage.getItem("currentUser"))  ;
    document.getElementById("cureent_user_name").innerHTML = currentUser.Name;
    document.getElementById("cureent_gmail_user").innerHTML = currentUser.email;
}



function addProduct(){
    var product_form = document.getElementById("add_product");

    var p_name = product_form.elements.namedItem("product_name").value;
    var p_description = product_form.elements.namedItem("description").value;
    var p_category = product_form.elements.namedItem("p_category").value;
    var p_price = product_form.elements.namedItem("price").value;
    var p_image_url = product_form.elements.namedItem("img_url").value;

    let products = {
        women:[],
        men :[],
        boys:[],
        girls:[]
    };

    if(localStorage.getItem("products")==null){
        localStorage.setItem("products", JSON.stringify(products));
    }

    var obj_product = JSON.parse(localStorage.getItem("products"));

    let product = {
        name:p_name,
        catigory: p_category,
        description: p_description,
        price:p_price,
        imageUrl:p_image_url
    }
    if(p_category == "men"){
        obj_product.men.push(product);
    }

    else if(p_category == "women"){
        obj_product.women.push(product);
    }
    else if(p_category=="boys")
    {
        obj_product.boys.push(product);
    }
    else if(p_category == "girls")
    {
        obj_product.girls.push(product);
    }

    localStorage.setItem("products", JSON.stringify(obj_product));
    notifyMessage("Product is added", "green");
    displayProducts();
}

function displayProducts(){
    var p_table = document.getElementById("product_table");
    p_table.innerHTML = "";

    var header = document.createElement("tr");
    header.innerHTML = "<th>Name</th><th>Image</th><th>Description</th><th>Price</th><th>Action</th>";

    p_table.appendChild(header);

    var obj_product = JSON.parse(localStorage.getItem("products"));

    for(let i= 0 ; i<obj_product.men.length;i++)
        {

        let p_row = document.createElement("tr");

        let p_name = document.createElement("td");
        p_name.innerHTML = obj_product.men[i].name;
        p_row.appendChild(p_name);



        let p_image = document.createElement("td");
        let img = document.createElement("img");
        img.src = obj_product.men[i].imageUrl;
        p_image.appendChild(img);
        p_row.appendChild(p_image);

        let p_description = document.createElement("td");
        p_description.innerHTML = obj_product.men[i].description;
        p_row.appendChild(p_description);

        let p_price = document.createElement("td");
        p_price.innerHTML = obj_product.men[i].price +"$";
        p_row.appendChild(p_price);
        
        
        let p_action = document.createElement("td");
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){
            deleteMenProduct(obj_product.men[i].name,obj_product.men[i].description,obj_product.men[i].price,obj_product.men[i].imageUrl);
        }
        p_action.appendChild(delete_button);
        p_row.appendChild(p_action);
        p_table.appendChild(p_row);

    }
    for(let i= 0 ; i<obj_product.women.length;i++)
    {

        let p_row = document.createElement("tr");

        let p_name = document.createElement("td");
        p_name.innerHTML = obj_product.women[i].name;
        p_row.appendChild(p_name);



        let p_image = document.createElement("td");
        let img = document.createElement("img");
        img.src = obj_product.women[i].imageUrl;
        p_image.appendChild(img);
        p_row.appendChild(p_image);

        let p_description = document.createElement("td");
        p_description.innerHTML = obj_product.women[i].description;
        p_row.appendChild(p_description);

        let p_price = document.createElement("td");
        p_price.innerHTML = obj_product.women[i].price +"$";
        p_row.appendChild(p_price);
    
    
        let p_action = document.createElement("td");
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){
            deleteWomenProduct(obj_product.women[i].name,obj_product.women[i].description,obj_product.women[i].price,obj_product.women[i].imageUrl);
        }
        p_action.appendChild(delete_button);
        p_row.appendChild(p_action);
        p_table.appendChild(p_row);

    }
    for(let i= 0 ; i<obj_product.boys.length;i++)
    {

        let p_row = document.createElement("tr");

        let p_name = document.createElement("td");
        p_name.innerHTML = obj_product.boys[i].name;
        p_row.appendChild(p_name);



        let p_image = document.createElement("td");
        let img = document.createElement("img");
        img.src = obj_product.boys[i].imageUrl;
        p_image.appendChild(img);
        p_row.appendChild(p_image);

        let p_description = document.createElement("td");
        p_description.innerHTML = obj_product.boys[i].description;
        p_row.appendChild(p_description);

        let p_price = document.createElement("td");
        p_price.innerHTML = obj_product.boys[i].price +"$";
        p_row.appendChild(p_price);
    
    
        let p_action = document.createElement("td");
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){
            deleteBoysProduct(obj_product.boys[i].name,obj_product.boys[i].description,obj_product.boys[i].price,obj_product.boys[i].imageUrl);
        }
        p_action.appendChild(delete_button);
        p_row.appendChild(p_action);
        p_table.appendChild(p_row);

    }
    for(let i= 0 ; i<obj_product.girls.length;i++)
    {

        let p_row = document.createElement("tr");

        let p_name = document.createElement("td");
        p_name.innerHTML = obj_product.girls[i].name;
        p_row.appendChild(p_name);



        let p_image = document.createElement("td");
        let img = document.createElement("img");
        img.src = obj_product.girls[i].imageUrl;
        p_image.appendChild(img);
        p_row.appendChild(p_image);

        let p_description = document.createElement("td");
        p_description.innerHTML = obj_product.girls[i].description;
        p_row.appendChild(p_description);

        let p_price = document.createElement("td");
        p_price.innerHTML = obj_product.girls[i].price +"$";
        p_row.appendChild(p_price);
    
    
        let p_action = document.createElement("td");
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){
            deleteGirlsProduct(obj_product.girls[i].name,obj_product.girls[i].description,obj_product.girls[i].price,obj_product.girls[i].imageUrl);
        }
        p_action.appendChild(delete_button);
        p_row.appendChild(p_action);
        p_table.appendChild(p_row);

    }

}

function deleteMenProduct(product_name, product_description,product_price,product_Url){
    var obj_product = JSON.parse(localStorage.getItem("products"));
    for(let i= 0 ; i<obj_product.men.length;i++){
        if(obj_product.men[i].name == product_name && obj_product.men[i].description == product_description &&obj_product.men[i].price == product_price && obj_product.men[i].imageUrl ==product_Url){
            obj_product.men.splice(i,1);
            localStorage.setItem("products", JSON.stringify(obj_product));
            notifyMessage("Delete Sucessful", "green");
            displayProducts();
            break;
        } 
    }
}


function deleteWomenProduct(product_name, product_description,product_price,product_Url){
    var obj_product = JSON.parse(localStorage.getItem("products"));
    for(let i= 0 ; i<obj_product.women.length;i++){
        if(obj_product.women[i].name == product_name && obj_product.women[i].description == product_description &&obj_product.women[i].price == product_price && obj_product.women[i].imageUrl ==product_Url){
            obj_product.women.splice(i,1);
            localStorage.setItem("products", JSON.stringify(obj_product));
            notifyMessage("Delete Sucessful", "green");
            displayProducts();
            break;
        } 
    }
}

function deleteBoysProduct(product_name, product_description,product_price,product_Url){
    var obj_product = JSON.parse(localStorage.getItem("products"));
    for(let i= 0 ; i<obj_product.boys.length;i++){
        if(obj_product.boys[i].name == product_name && obj_product.boys[i].description == product_description &&obj_product.boys[i].price == product_price && obj_product.boys[i].imageUrl ==product_Url){
            obj_product.boys.splice(i,1);
            localStorage.setItem("products", JSON.stringify(obj_product));
            notifyMessage("Delete Sucessful", "green");
            displayProducts();
            break;
        } 
    }
}


function deleteGirlsProduct(product_name, product_description,product_price,product_Url){
    var obj_product = JSON.parse(localStorage.getItem("products"));
    for(let i= 0 ; i<obj_product.girls.length;i++){
        if(obj_product.girls[i].name == product_name && obj_product.girls[i].description == product_description &&obj_product.girls[i].price == product_price && obj_product.girls[i].imageUrl ==product_Url){
            obj_product.girls.splice(i,1);
            localStorage.setItem("products", JSON.stringify(obj_product));
            notifyMessage("Delete Sucessful", "green");
            displayProducts();
            break;
        } 
    }
}




function displayHomeProduct(){

    var cart_number = document.getElementById("cart_number");
    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    cart_number.innerHTML = current_user.cart.length; 

    var obj_product = JSON.parse(localStorage.getItem("products"));
    var product_box = document.getElementById("product_box");

    for(let i= 0 ; i<obj_product.men.length;i++){
        var p_card = document.createElement("div");
        p_card.classList.add("product-card");

        var p_image = document.createElement("div");
        p_image.classList.add("product-image");
        p_image.style.backgroundImage = "url('"+obj_product.men[i].imageUrl+"')";
        p_card.appendChild(p_image);

        var p_info = document.createElement("div");
        p_info.classList.add("product-info");

        var p_name = document.createElement("h5");
        p_name.innerHTML = obj_product.men[i].name;
        p_info.appendChild(p_name);

        var p_description = document.createElement("p");
        p_description.innerHTML = obj_product.men[i].description;
        p_info.appendChild(p_description);

        var p_price = document.createElement("h5");
        p_price.innerHTML = "$"+obj_product.men[i].price ;
        p_info.appendChild(p_price);
        

        var icon_heart = document.createElement("img");
        icon_heart.classList.add("iconImg");
        icon_heart.src ="./img/heart.png";
        icon_heart.onclick = function(){
            likeProduct(obj_product.men[i].name,obj_product.men[i].description,obj_product.men[i].price,obj_product.men[i].imageUr )
        }
        p_info.appendChild(icon_heart);

        var mail_link = document.createElement("a");
        mail_link.href="./Contact_Us.html";
        p_info.appendChild(mail_link);

        var icon_email = document.createElement("img");
        icon_email.classList.add("iconImg");
        icon_email.src = "./img/mail.png";
        mail_link.appendChild(icon_email);

        
        var icon_order = document.createElement("img");
        icon_order.classList.add("iconImg");
        icon_order.src ="./img/order.png";
        icon_order.onclick = function(){
            addToCart(obj_product.men[i]);
        }

        p_info.appendChild(icon_order);

        p_card.appendChild(p_info);

        product_box.appendChild(p_card);
    }

    for(let i= 0 ; i<obj_product.women.length;i++){
        var p_card = document.createElement("div");
        p_card.classList.add("product-card");

        var p_image = document.createElement("div");
        p_image.classList.add("product-image");
        p_image.style.backgroundImage = "url('"+obj_product.women[i].imageUrl+"')";
        p_card.appendChild(p_image);

        var p_info = document.createElement("div");
        p_info.classList.add("product-info");

        var p_name = document.createElement("h5");
        p_name.innerHTML = obj_product.women[i].name;
        p_info.appendChild(p_name);

        var p_description = document.createElement("p");
        p_description.innerHTML = obj_product.women[i].description;
        p_info.appendChild(p_description);

        var p_price = document.createElement("h5");
        p_price.innerHTML = "$"+obj_product.women[i].price ;
        p_info.appendChild(p_price);
        

        var icon_heart = document.createElement("img");
        icon_heart.classList.add("iconImg");
        icon_heart.src ="./img/heart.png";
        icon_heart.onclick = function(){
            likeProduct(obj_product.men[i].name,obj_product.men[i].description,obj_product.men[i].price,obj_product.men[i].imageUr )
        }
        p_info.appendChild(icon_heart);

        var mail_link = document.createElement("a");
        mail_link.href="./Contact_Us.html";
        p_info.appendChild(mail_link);

        var icon_email = document.createElement("img");
        icon_email.classList.add("iconImg");
        icon_email.src = "./img/mail.png";
        mail_link.appendChild(icon_email);

        
        var icon_order = document.createElement("img");
        icon_order.classList.add("iconImg");
        icon_order.src ="./img/order.png";
        icon_order.onclick = function(){
            addToCart(obj_product.women[i]);
        }

        p_info.appendChild(icon_order);

        p_card.appendChild(p_info);

        product_box.appendChild(p_card);
    }

    for(let i= 0 ; i<obj_product.boys.length;i++){
        var p_card = document.createElement("div");
        p_card.classList.add("product-card");

        var p_image = document.createElement("div");
        p_image.classList.add("product-image");
        p_image.style.backgroundImage = "url('"+obj_product.boys[i].imageUrl+"')";
        p_card.appendChild(p_image);

        var p_info = document.createElement("div");
        p_info.classList.add("product-info");

        var p_name = document.createElement("h5");
        p_name.innerHTML = obj_product.boys[i].name;
        p_info.appendChild(p_name);

        var p_description = document.createElement("p");
        p_description.innerHTML = obj_product.boys[i].description;
        p_info.appendChild(p_description);

        var p_price = document.createElement("h5");
        p_price.innerHTML = "$"+obj_product.boys[i].price ;
        p_info.appendChild(p_price);
        

        var icon_heart = document.createElement("img");
        icon_heart.classList.add("iconImg");
        icon_heart.src ="./img/heart.png";
        icon_heart.onclick = function(){
            likeProduct(obj_product.men[i].name,obj_product.men[i].description,obj_product.men[i].price,obj_product.men[i].imageUr )
        }
        p_info.appendChild(icon_heart);

        var mail_link = document.createElement("a");
        mail_link.href="./Contact_Us.html";
        p_info.appendChild(mail_link);

        var icon_email = document.createElement("img");
        icon_email.classList.add("iconImg");
        icon_email.src = "./img/mail.png";
        mail_link.appendChild(icon_email);

        
        var icon_order = document.createElement("img");
        icon_order.classList.add("iconImg");
        icon_order.src ="./img/order.png";
        icon_order.onclick = function(){
            addToCart(obj_product.boys[i]);
        }

        p_info.appendChild(icon_order);

        p_card.appendChild(p_info);

        product_box.appendChild(p_card);
    }

    for(let i= 0 ; i<obj_product.girls.length;i++){
        var p_card = document.createElement("div");
        p_card.classList.add("product-card");

        var p_image = document.createElement("div");
        p_image.classList.add("product-image");
        p_image.style.backgroundImage = "url('"+obj_product.girls[i].imageUrl+"')";
        p_card.appendChild(p_image);

        var p_info = document.createElement("div");
        p_info.classList.add("product-info");

        var p_name = document.createElement("h5");
        p_name.innerHTML = obj_product.girls[i].name;
        p_info.appendChild(p_name);

        var p_description = document.createElement("p");
        p_description.innerHTML = obj_product.girls[i].description;
        p_info.appendChild(p_description);

        var p_price = document.createElement("h5");
        p_price.innerHTML = "$"+obj_product.girls[i].price ;
        p_info.appendChild(p_price);
        

        var icon_heart = document.createElement("img");
        icon_heart.classList.add("iconImg");
        icon_heart.src ="./img/heart.png";
        icon_heart.onclick = function(){
            likeProduct(obj_product.men[i].name,obj_product.men[i].description,obj_product.men[i].price,obj_product.men[i].imageUr )
        }
        p_info.appendChild(icon_heart);

        var mail_link = document.createElement("a");
        mail_link.href="./Contact_Us.html";
        p_info.appendChild(mail_link);

        var icon_email = document.createElement("img");
        icon_email.classList.add("iconImg");
        icon_email.src = "./img/mail.png";
        mail_link.appendChild(icon_email);

        
        var icon_order = document.createElement("img");
        icon_order.classList.add("iconImg");
        icon_order.src ="./img/order.png";
        icon_order.onclick = function(){
            addToCart(obj_product.girls[i]);
        }

        p_info.appendChild(icon_order);

        p_card.appendChild(p_info);

        product_box.appendChild(p_card);
    }

}

//Not Yet "Need to ask Teacher"

function likeProduct(product_name, product_description,product_price,product_Url){
    var obj_product = JSON.parse(localStorage.getItem("products"));

    for(let i= 0 ; i<obj_product.men.length;i++){

    if(obj_product.men[i].name == product_name && obj_product.men[i].description == product_description &&obj_product.men[i].price == product_price && obj_product.men[i].imageUrl ==product_Url && icon_heart.attributes.src.value== "./img/heart.png"){
        icon_heart.attributes.src.value = "./img/heart (1).png";
    }
    else{
        icon_heart.attributes.src.value= "./img/heart.png";
        break;

    }
  }
}

function addToCart(obj_product){
    var cart_number = document.getElementById("cart_number");

    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    current_user.cart.push(obj_product);
    cart_number.innerHTML = current_user.cart.length; 
    localStorage.setItem("currentUser", JSON.stringify(current_user));

    var all_users = JSON.parse(localStorage.getItem("users"));

    for(let i=0; i<all_users.length;i++){
        if(all_users[i].email == current_user.email){
            all_users[i].cart = current_user.cart;
            localStorage.setItem("users",JSON.stringify(all_users));
            notifyMessage("Product is added to Cart","green");
            break;
        }
    }



}

function displayCartItem(){
    var p_table = document.getElementById("product_table");
    p_table.innerHTML = "";

    var current_user = JSON.parse(localStorage.getItem("currentUser"));

    var header = document.createElement("tr");
    header.innerHTML = "<th>Name</th><th>Image</th><th>Description</th><th>Price</th><th>Action</th>";

    p_table.appendChild(header);

    var total_price = 0;
    for(let i=0; i< current_user.cart.length; i++){
        let p_row = document.createElement("tr");

        let p_name = document.createElement("td");
        p_name.innerHTML = current_user.cart[i].name;
        p_row.appendChild(p_name);

        let p_image = document.createElement("td");
        let img = document.createElement("img");
        img.src = current_user.cart[i].imageUrl;
        p_image.appendChild(img);
        p_row.appendChild(p_image);

        let p_description = document.createElement("td");
        p_description.innerHTML = current_user.cart[i].description;
        p_row.appendChild(p_description);

        let p_price = document.createElement("td");
        p_price.innerHTML = current_user.cart[i].price +"$";
        p_row.appendChild(p_price);
        
        
        let p_action = document.createElement("td");
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){
            deleteCartItem(current_user.cart[i].name, current_user.cart[i].description,current_user.cart[i].price);
        }
        p_action.appendChild(delete_button);
        p_row.appendChild(p_action);
        p_table.appendChild(p_row);

        total_price=total_price + Number(current_user.cart[i].price)
    }

    var total_element = document.getElementById("total_price");
    total_element.innerHTML = "$"+total_price;
}


function deleteCartItem(item_name, item_description, item_price){
    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    for(let i=0; i< current_user.cart.length; i++){
        if(current_user.cart[i].name ==item_name && current_user.cart[i].description ==item_description && current_user.cart[i].price ==item_price){
            current_user.cart.splice(i,1);
            break;
        } 
    }
    localStorage.setItem("currentUser",JSON.stringify(current_user));

    var all_users = JSON.parse(localStorage.getItem("users"));
    for(let j=0; j<all_users.length;j++){
        if(all_users[j].email == current_user.email){
            all_users[j].cart = current_user.cart;
            notifyMessage("Product is removed", "green");
            displayCartItem();
            localStorage.setItem("users", JSON.stringify(all_users));
            break;
        }
    } 
}






function displayWomenProduct(){

    var cart_number = document.getElementById("cart_number");
    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    cart_number.innerHTML = current_user.cart.length; 

    var obj_product = JSON.parse(localStorage.getItem("products"));
    var product_box = document.getElementById("women_product_box");


    for(let i= 0 ; i<obj_product.women.length;i++){
        var p_card = document.createElement("div");
        p_card.classList.add("product-card");

        var p_image = document.createElement("div");
        p_image.classList.add("product-image");
        p_image.style.backgroundImage = "url('"+obj_product.women[i].imageUrl+"')";
        p_card.appendChild(p_image);

        var p_info = document.createElement("div");
        p_info.classList.add("product-info");

        var p_name = document.createElement("h5");
        p_name.innerHTML = obj_product.women[i].name;
        p_info.appendChild(p_name);

        var p_description = document.createElement("p");
        p_description.innerHTML = obj_product.women[i].description;
        p_info.appendChild(p_description);

        var p_price = document.createElement("h5");
        p_price.innerHTML = "$"+obj_product.women[i].price ;
        p_info.appendChild(p_price);
        

        var icon_heart = document.createElement("img");
        icon_heart.classList.add("iconImg");
        icon_heart.src ="./img/heart.png";
        icon_heart.onclick = function(){
            if(this.src.match("./img/heart.png"))
            {
                this.src= "./img/heart (1).png"
            }
            else
            {
                this.src = "./img/heart.png";
            }
        }
        p_info.appendChild(icon_heart);

        var mail_link = document.createElement("a");
        mail_link.href="./Contact_Us.html";
        p_info.appendChild(mail_link);

        var icon_email = document.createElement("img");
        icon_email.classList.add("iconImg");
        icon_email.src = "./img/mail.png";
        mail_link.appendChild(icon_email);

        
        var icon_order = document.createElement("img");
        icon_order.classList.add("iconImg");
        icon_order.src ="./img/order.png";
        icon_order.onclick = function(){
            addToCart(obj_product.women[i]);
        }

        p_info.appendChild(icon_order);

        p_card.appendChild(p_info);

        product_box.appendChild(p_card);
    }


}

function displayMenProduct(){

    var cart_number = document.getElementById("cart_number");
    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    cart_number.innerHTML = current_user.cart.length; 

    var obj_product = JSON.parse(localStorage.getItem("products"));
    var product_box = document.getElementById("men_product_box");

    for(let i= 0 ; i<obj_product.men.length;i++){
        var p_card = document.createElement("div");
        p_card.classList.add("product-card");

        var p_image = document.createElement("div");
        p_image.classList.add("product-image");
        p_image.style.backgroundImage = "url('"+obj_product.men[i].imageUrl+"')";
        p_card.appendChild(p_image);

        var p_info = document.createElement("div");
        p_info.classList.add("product-info");

        var p_name = document.createElement("h5");
        p_name.innerHTML = obj_product.men[i].name;
        p_info.appendChild(p_name);

        var p_description = document.createElement("p");
        p_description.innerHTML = obj_product.men[i].description;
        p_info.appendChild(p_description);

        var p_price = document.createElement("h5");
        p_price.innerHTML = "$"+obj_product.men[i].price ;
        p_info.appendChild(p_price);
        

        var icon_heart = document.createElement("img");
        icon_heart.classList.add("iconImg");
        icon_heart.src ="./img/heart.png";
        icon_heart.onclick = function(){
            if(this.src.match("./img/heart.png"))
            {
                this.src= "./img/heart (1).png"
            }
            else
            {
                this.src = "./img/heart.png";
            }
        }
        p_info.appendChild(icon_heart);

        var mail_link = document.createElement("a");
        mail_link.href="./Contact_Us.html";
        p_info.appendChild(mail_link);

        var icon_email = document.createElement("img");
        icon_email.classList.add("iconImg");
        icon_email.src = "./img/mail.png";
        mail_link.appendChild(icon_email);

        
        var icon_order = document.createElement("img");
        icon_order.classList.add("iconImg");
        icon_order.src ="./img/order.png";
        icon_order.onclick = function(){
            addToCart(obj_product.men[i]);
        }

        p_info.appendChild(icon_order);

        p_card.appendChild(p_info);

        product_box.appendChild(p_card);
    }


}

function displayBoysProduct(){

    var cart_number = document.getElementById("cart_number");
    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    cart_number.innerHTML = current_user.cart.length; 

    var obj_product = JSON.parse(localStorage.getItem("products"));
    var product_box = document.getElementById("boys_product_box");


    for(let i= 0 ; i<obj_product.boys.length;i++){
        var p_card = document.createElement("div");
        p_card.classList.add("product-card");

        var p_image = document.createElement("div");
        p_image.classList.add("product-image");
        p_image.style.backgroundImage = "url('"+obj_product.boys[i].imageUrl+"')";
        p_card.appendChild(p_image);

        var p_info = document.createElement("div");
        p_info.classList.add("product-info");

        var p_name = document.createElement("h5");
        p_name.innerHTML = obj_product.boys[i].name;
        p_info.appendChild(p_name);

        var p_description = document.createElement("p");
        p_description.innerHTML = obj_product.boys[i].description;
        p_info.appendChild(p_description);

        var p_price = document.createElement("h5");
        p_price.innerHTML = "$"+obj_product.boys[i].price ;
        p_info.appendChild(p_price);
        

        var icon_heart = document.createElement("img");
        icon_heart.classList.add("iconImg");
        icon_heart.src ="./img/heart.png";
        icon_heart.onclick = function(){
            if(this.src.match("./img/heart.png"))
            {
                this.src= "./img/heart (1).png"
            }
            else
            {
                this.src = "./img/heart.png";
            }
        }
        p_info.appendChild(icon_heart);

        var mail_link = document.createElement("a");
        mail_link.href="./Contact_Us.html";
        p_info.appendChild(mail_link);

        var icon_email = document.createElement("img");
        icon_email.classList.add("iconImg");
        icon_email.src = "./img/mail.png";
        mail_link.appendChild(icon_email);

        
        var icon_order = document.createElement("img");
        icon_order.classList.add("iconImg");
        icon_order.src ="./img/order.png";
        icon_order.onclick = function(){
            addToCart(obj_product.boys[i]);
        }

        p_info.appendChild(icon_order);

        p_card.appendChild(p_info);

        product_box.appendChild(p_card);
    }


}

function displayGirlsProduct(){

    var cart_number = document.getElementById("cart_number");
    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    cart_number.innerHTML = current_user.cart.length; 

    var obj_product = JSON.parse(localStorage.getItem("products"));
    var product_box = document.getElementById("girls_product_box");



    for(let i= 0 ; i<obj_product.girls.length;i++){
        var p_card = document.createElement("div");
        p_card.classList.add("product-card");

        var p_image = document.createElement("div");
        p_image.classList.add("product-image");
        p_image.style.backgroundImage = "url('"+obj_product.girls[i].imageUrl+"')";
        p_card.appendChild(p_image);

        var p_info = document.createElement("div");
        p_info.classList.add("product-info");

        var p_name = document.createElement("h5");
        p_name.innerHTML = obj_product.girls[i].name;
        p_info.appendChild(p_name);

        var p_description = document.createElement("p");
        p_description.innerHTML = obj_product.girls[i].description;
        p_info.appendChild(p_description);

        var p_price = document.createElement("h5");
        p_price.innerHTML = "$"+obj_product.girls[i].price ;
        p_info.appendChild(p_price);
        

        var icon_heart = document.createElement("img");
        icon_heart.classList.add("iconImg");
        icon_heart.src ="./img/heart.png";
        icon_heart.onclick = function(){
            if(this.src.match("./img/heart.png"))
            {
                this.src= "./img/heart (1).png"
            }
            else
            {
                this.src = "./img/heart.png";
            }
        }
        p_info.appendChild(icon_heart);

        var mail_link = document.createElement("a");
        mail_link.href="./Contact_Us.html";
        p_info.appendChild(mail_link);

        var icon_email = document.createElement("img");
        icon_email.classList.add("iconImg");
        icon_email.src = "./img/mail.png";
        mail_link.appendChild(icon_email);

        
        var icon_order = document.createElement("img");
        icon_order.classList.add("iconImg");
        icon_order.src ="./img/order.png";
        icon_order.onclick = function(){
            addToCart(obj_product.girls[i]);
        }

        p_info.appendChild(icon_order);

        p_card.appendChild(p_info);

        product_box.appendChild(p_card);
    }

}

function displayOrderedProduct(){
    var p_table = document.getElementById("ordered_product");
    p_table.innerHTML = "";

    var current_user = JSON.parse(localStorage.getItem("currentUser"));

    var header = document.createElement("tr");
    header.innerHTML = "<th>Name</th><th>Image</th><th>Description</th><th>Price</th><th>Action</th>";

    p_table.appendChild(header);

    var total_price = 0;
    for(let i=0; i< current_user.cart.length; i++){
        let p_row = document.createElement("tr");

        let p_name = document.createElement("td");
        p_name.innerHTML = current_user.cart[i].name;
        p_row.appendChild(p_name);

        let p_image = document.createElement("td");
        let img = document.createElement("img");
        img.src = current_user.cart[i].imageUrl;
        p_image.appendChild(img);
        p_row.appendChild(p_image);

        let p_description = document.createElement("td");
        p_description.innerHTML = current_user.cart[i].description;
        p_row.appendChild(p_description);

        let p_price = document.createElement("td");
        p_price.innerHTML = current_user.cart[i].price +"$";
        p_row.appendChild(p_price);
        
        
        let p_action = document.createElement("td");
        let delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){
            deleteOrderedProduct(current_user.cart[i].name, current_user.cart[i].description,current_user.cart[i].price);
        }
        p_action.appendChild(delete_button);
        p_row.appendChild(p_action);
        p_table.appendChild(p_row);

        total_price=total_price + Number(current_user.cart[i].price)
    }

    var total_element = document.getElementById("total_price");
    total_element.innerHTML = "$"+total_price;
}

function deleteOrderedProduct(item_name, item_description, item_price){
    var current_user = JSON.parse(localStorage.getItem("currentUser"));
    for(let i=0; i< current_user.cart.length; i++){
        if(current_user.cart[i].name ==item_name && current_user.cart[i].description ==item_description && current_user.cart[i].price ==item_price){
            current_user.cart.splice(i,1);
            break;
        } 
    }
    localStorage.setItem("currentUser",JSON.stringify(current_user));

    var all_users = JSON.parse(localStorage.getItem("users"));
    for(let j=0; j<all_users.length;j++){
        if(all_users[j].email == current_user.email){
            all_users[j].cart = current_user.cart;
            notifyMessage("Product is removed", "green");
            displayOrderedProduct()            

            localStorage.setItem("users", JSON.stringify(all_users));
            break;
        }
    } 
}













var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}







