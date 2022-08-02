var data=[];
var count=0;

const start = () =>{
    const lists = JSON.parse(localStorage.getItem("lists"));
    if (!lists) {
       localStorage.setItem("lists", JSON.stringify([]));
    } 
    
}
start();

function AddTask(){


    var taskValue=document.getElementById('task').value;

    var task={
        id:count,
        task:taskValue,
        statu:'brand',
      
 
    }

    data.push(task);
    document.getElementById('task').value=null;
    FillData();
    count++;
}

function FillData(){
    var tempHTML="";
    var tempHTMLCompleted="";
    var tempHTMLDelivered="";

    for(var i=0;i<data.length;i++){
        if(data[i].statu=='brand'){
            tempHTML+='<div class="input-group mb-3">'+
            '<div class="input-group-prepend">'+
              '<div class="input-group-text">'+
                '<input type="checkbox" aria-label="Checkbox for following text input" onclick="ClickCheck('+data[i].id+')">'+
              '</div>'+
            '</div>'+
            '<p type="text" class="form-control" aria-label="Text input with checkbox">'+data[i].task+'</p>'+
            '<div class="input-group-append">'+
                '<button class="btn btn-outline-primary" type="button" onclick="ClickEdit('+data[i].id+');"><i class="fas fa-edit"></i></button>'+
                '<button class="btn btn-outline-danger" type="button" onclick="DeleteTask('+data[i].id+');"><i class="fas fa-trash-alt"></i></button>'+
              '</div>'+
        '</div>';
            }else if(data[i].statu=='completed'){
                tempHTMLCompleted+='<div class="input-group mb-3">'+
                '<p type="text" class="form-control" aria-label="Text input with checkbox">'+data[i].task+'</p>'+
                '<div class="input-group-append">'+
                    '<button class="btn btn-outline-primary" type="button" onclick="UndoTask('+data[i].id+');"><i class="fas fa-undo"></i></button>'+
                    '<button class="btn btn-outline-danger" type="button" onclick="CheckTask('+data[i].id+');"><i class="fas fa-check" onclic></i></button>'+
                '</div>'+
            '</div>';
            }else{
                tempHTMLDelivered+='<div class="input-group mb-3">'+
                '<p type="text" class="form-control" aria-label="Text input with checkbox">'+data[i].task+'</p>'+
                '<div class="input-group-append">'+
                '</div>'+
            '</div>';
            }    
                   
    }
    document.getElementById('brand').innerHTML=tempHTML;
    document.getElementById('completed').innerHTML=tempHTMLCompleted;
    document.getElementById('delivered').innerHTML=tempHTMLDelivered;
}

// Checkbox için 
function ClickCheck(id){
    var index=data.findIndex(x=>x.id==id);

    data[index].statu='completed';

    setTimeout(function(){
        FillData();
    },300);
}
//checkTask
function CheckTask(id){
    var index=data.findIndex(x=>x.id==id);

    data[index].statu='Delivered';

    setTimeout(function(){
        FillData();
    },300);
}

// Silme Fonksiyonu
function DeleteTask(id){
    var index = data.findIndex(x=>x.id==id);
    data.splice(index,1);

    FillData();
}

// Geri Alma Fonksiyonu
function UndoTask(id){
    var index=data.findIndex(x=>x.id==id);
    data[index].statu='brand';

    FillData();
}

// Edit
function ClickEdit(id){
    document.getElementById('task-edit').value=data[id].task;

    $('#editTaskModal').modal('show');

    var element=document.getElementById('btn-save');
    element.onclick=function(){
        Edit(id);

        $('#editTaskModal').modal('hide');
    }
}

function Edit(id){
    var index= data.findIndex(x=>x.id==id);
    data[index].task=document.getElementById('task-edit').value;

    FillData();
}

