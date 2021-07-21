export function component(el,content,id,parentid,cls,onclick) {
    const element = document.createElement(el);
    element.innerHTML = content;
    if (parentid == '') {
        document.body.appendChild(element);
    }
    else {
        document.getElementById(parentid).appendChild(element);
    }
    element.setAttribute('id', id);
    element.setAttribute('class', cls);
    if (onclick == true) {
      return element}
    else {
    return element;
  }
}

//alert("HA")
const toDo = ((nam,des,du,priorit) => {
    const name = nam;
    const desc = des;
    const due = du;
    const priority = priorit;
    const summary = () => {
        return console.log(name+' , due '+due)
    }
    return {
        name,
        desc,
        due,
        priority,
        summary,
    }
})
function removeToDo(td) {
    delete td.name;
    delete td.desc;
    delete td.due;
    return;
}
function addToDo(nam,des,du) {
    nam = toDo(nam,des,du)
    return nam
}
component('div','','uni','','','')
component('div','','topbar','uni','','')
component('img','','smenu','topbar','','')
document.getElementById('smenu').setAttribute('src','/src/menu_white_48dp.svg')
component('div','','topcontainer','topbar','','')
component('div','Drok','title','topcontainer','','')
component('div','Do it now','subtitle','topcontainer','','')
component('div','+','addbtn','topbar','','')
component('div','','content','uni','','')
component('div','','sidebar','content','','')
component('div','All Tasks','sideel','sidebar','','')
component('div','This week','sideel','sidebar','','')
component('div','Urgent','sideel','sidebar','','')
component('div','+ Add project','sideadd','sidebar','','')
component('div','','cont','content','','')
component('div','','todo','cont','','')
component('div','','done','todo','','')
component('div','WRYYYYYYYYYYYY','todoname','todo','','')

component('div','','overlay','','','')
component('div','','formcont','overlay','','')
component('form','','addtodo','formcont','','')
component('label','Name','toname','addtodo','','')
component('input','Name','toname','addtodo','','')
component('label','Description','todesc','addtodo','','')
component('input','Description','todesc','addtodo','','')
component('label','Due date','toduel','addtodo','','')
component('input','Due date','todue','addtodo','','')
document.getElementById('todue').setAttribute('type','date' )
component('label','Priority','topriorityl','addtodo','','')
component('select','priority','topriority','addtodo','','')
component('option','default','defprio','topriority','','')
document.getElementById('defprio').setAttribute('value', 'default')
component('option','urgent','urgprio','topriority','','')
document.getElementById('urgprio').setAttribute('value', 'urgent')

component('button','Add Task','toadd','addtodo','','')
document.getElementById('overlay').style.display='none';
document.getElementById("overlay").addEventListener('click', e => {
    if(e.target.id == "overlay") {
        console.log(e.target.id == "overlay")
         document.getElementById('overlay').style.display='none';
         return;
        } 
    else {
        return;}
});
document.getElementById('addbtn').addEventListener('click', () => {
    document.getElementById('overlay').style.display='block';

    return //alert('HEY YA!')
})
document.getElementById('smenu').addEventListener('click', () => {
    let display = document.getElementById('sidebar').style.display
     if (display == 'none') {
        document.getElementById('sidebar').style.display = "flex"
         return 
     }
     else {
        document.getElementById('sidebar').style.display = 'none'
         return
     }
})