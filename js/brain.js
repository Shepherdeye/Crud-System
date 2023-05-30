var nameInp=document.getElementById("name"),
    CategoryInp=document.getElementById("category"),
    PriceInp=document.getElementById("price"),
    myButton=document.getElementById("button"),
    mySearch=document.getElementById("search"),
    DesciptionInp=document.getElementById("description");

    // كان لازم نعمل دالة اف عشان لو فبداية  الموقع اللوكال  ستوراج كانت فاضيه هتجيب خطا 
    if(localStorage.getItem("crudData")==null){
        var myDataSaver=[];
    }else{
        
    // هنا لما جينا نرجع البيانات المحفوظه فالوكال ستوراج كان لازم نحولها  من سترنج لاراي 
    var myDataSaver=JSON.parse(localStorage.getItem("crudData")) ;

    }
    


    //بنادي  الفنكشن عشان مش  كل  شويه نضغط علي  الزرار عشان نعرض الداتا 
    displayData();

   function addprouduct(){
        "use strict";
    if(validatePruduct()==true && nameInp.value!="" &&CategoryInp.value!="" && PriceInp.value!="" && DesciptionInp!=""){
      var myInfo={
        name: nameInp.value,
        category: CategoryInp.value,
        price:  PriceInp.value,
        description: DesciptionInp.value,
    }
    myDataSaver.push(myInfo);

    //هنا لازم القيمه بتاعت الكي اللي فاللوكال ستوراج تبقي سترنج علشا كده حولناها لسترينج 
    //اهمية الخطوه دي  ان اللي  هعمله هيحفظ ودي بتحفظ اي حاجه انا بعملها بس  
    localStorage.setItem("crudData",JSON.stringify(myDataSaver))

  // //   console.log(myDataSaver)
    displayData();
    clearInputs();
  }
    }



    function displayData(){
        "use strict";
        var tbody="";
        for( var i=0;i<myDataSaver.length;i++){
            tbody+=` <tr>
            <td scope="row">${i}</td>
            <td>${myDataSaver[i].name}</td>
            <td>${myDataSaver[i].category}</td>
            <td>${myDataSaver[i].price}</td>
            <td>${myDataSaver[i].description}</td>
            <td> <button onclick="deleteRow(${i})" class=" btn bg-danger text-white"> Delete</button></td>
            <td> <button onclick="updatedRow(${i})" class=" btn bg-warning"> Update</button></td>
            </tr>`
        }

        document.getElementById("tableb").innerHTML = tbody;
        // console.log(tbody)
    }


  function deleteRow(x){
      "use strict";
    //   alert(x)
    myDataSaver.splice(x,1)
    localStorage.setItem("crudData",JSON.stringify(myDataSaver))
    displayData()
  }
  //خنا الداله مستخدمنها عشان البحث  
  mySearch.onkeyup=function(){

      // المتغير ده انا حاطه عشان لما ابدا  البحث  المربع يفضي 
      var trs="";

      // عملت لوب  عشان يبحثلي  فكل  العناصر  الموجوده فالاراي  الاساسيه 
    for(var i=0 ; i< myDataSaver.length; i++){

        // استخدمت الداله عشان خاطر  ابحث بالاسم بس 
        // استخدمت دالة  عشان يعرض حروف الاسم سمول  والقيمه اللي  فالبحث  تبقي  هي  كمان سمول  عشان حساسية  الحروف 
        if(myDataSaver[i].name.toLowerCase().includes(mySearch.value.toLowerCase())){

            //هنا متخفش  من شكل  الكود لان هو  عباره عن كود داخلي  محطوط ف سترينج 
            trs +=` <tr>
            <td scope="row">${i}</td>
            
            <td>${myDataSaver[i].name.toLowerCase().replace(`${mySearch.value.toLowerCase()}`,`
             <span style="background-color: yellow;"> ${mySearch.value}</span>`)}</td>

            <td>${myDataSaver[i].category}</td>
            <td>${myDataSaver[i].price}</td>
            <td>${myDataSaver[i].description}</td>
            <td> <button onclick="deleteRow(${i})" class=" btn bg-danger text-white"> Delete</button></td>
            <td> <button class=" btn bg-warning"> Update</button></td>
            </tr>`
        //  console.log("yes")

        }else{

            // console.log("no")
        }
    }
    // عشان يجبلي  اللي ببحث  عنه بس (html) هنا  انا  حطيت الاسترينج داخل 

    document.getElementById("tableb").innerHTML= trs;
  }


  function updatedRow(index){
  nameInp.value= myDataSaver[index].name;
  CategoryInp.value= myDataSaver[index].category;
  PriceInp.value= myDataSaver[index].price;
  DesciptionInp.value= myDataSaver[index].description;

  myButton.innerHTML="update product";
  myButton.classList.add("btn-warning");

 nameInp.focus();

  myButton.onclick=function(){

    myDataSaver[index].name= nameInp.value;
    myDataSaver[index].category=CategoryInp.value;
    myDataSaver[index].price=PriceInp.value;
    myDataSaver[index].description=DesciptionInp.value;
    //بنحفظ التعديلات فاللوكال ستوراج
    localStorage.setItem("crudData",JSON.stringify(myDataSaver));
    //بنعرض التغيرات اللي  حصلت 
    displayData();
    clearInputs();
    myButton.innerHTML="add product";
    myButton.classList.remove("btn-warning");
    //مهم جدا لان الخطوه دي  احنا بيها هنرجع الداله الاساسيه تاني
    myButton.onclick= addprouduct;
  }
 
  }



  function clearInputs(){
    nameInp.value="";
    CategoryInp.value="";
    PriceInp.value="";
    description.value="";

  }

  var alertx=document.getElementById("alert");
  // validation function
  function validatePruduct(){

    var regularex=/^[A-Z][A-Za-z 0-9]{3,15}$/;
    var valiedInp = nameInp.value;

    if( regularex.test(valiedInp) ){
      
    
      nameInp.classList.remove("is-invalid");
      nameInp.classList.add("is-valid");
      alertx.classList.add("d-none");
      return true;
    }else{
      nameInp.classList.remove("is-valid");
      nameInp.classList.add("is-invalid");
      
      alertx.classList.remove("d-none");
      return false;
    }
  }
nameInp.addEventListener("keyup",validatePruduct);
CategoryInp.addEventListener("keyup",validatePruduct);