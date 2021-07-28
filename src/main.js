export function component(el,content,id,parentid,cls,onclick) {
    const element = document.createElement(el);
    element.innerHTML = content;
    if (parentid == '' || parentid == null) {
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

const project = ((title) => {
    const list = [  "All Tasks",
    "This week",
    "Urgent",]
})


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

const categories = (() => {
    var base = {
        "All Tasks": [],
        "This week": [],
        "Urgent":[],}
    var added = {
        "GH" :[],
    }
    const add = (name) => {
        added[name] = []
        return added
    }
    const remove = (name) => {
        delete added[name]
        return added
    }
    const addToCategories = (task) => {
        base['All Tasks'].push(task)
        if (task.priority == "urgent") {
            base['Urgent'].push(task)
        }
        return console.log(base)
    }
    return {
        base,
        added,
        add,
        remove,
        addToCategories,
    }
})()

const domControl = (() => {
    const makeNavBar = () => {
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

        return
    }
    const makeSideBar = () => {

        rmChildren('sidebar')
        Object.keys(categories.base).forEach(element => {
            component('div',element,'sideel','sidebar','','')
        })
        Object.keys(categories.added).forEach(element => {
            component('div','',element + 'contain','sidebar','catcontain','')
            component('div',element, element + 'text', element + 'contain','cattext','')
            component('button','X', element + 'del', element + 'contain','catdel','')
            addEventDelProject(element)
        })
        component('div','+ Add project','sideadd','sidebar','','')
        component('div','','toadd','sidebar','','')
        component('input','','toaddtext','toadd','','')
        component('button','Add','toaddbtn','toadd','','')
        document.getElementById('toadd').style.display = 'none';
        addEventAddCategory()
        addEventShowProjectBox()
    }
    const makeToDo = () => {
    component('div','','cont','content','','')
    component('div','','todo','cont','','')
    component('div','','done','todo','','')
    component('div','WRYYYYYYYYYYYY','todoname','todo','','')
    }
    const makeForm = () => {
        component('div','','overlay','','','')
        document.getElementById('overlay').style.display='none';
        component('div','','formcont','overlay','','')
        component('div','','addtodo','formcont','','')
        component('label','Name','tonamel','addtodo','','')
        component('input','Name','toname','addtodo','','')
        component('label','Description','todescl','addtodo','','')
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
        component('button','Add Task','taddbtn','addtodo','','')
        return
        }
    const rmChildren = (id) => {
        while (document.getElementById(id).children.length != 0) {
            document.getElementById(id).children[0].remove()
        }
        return
    }
    const addEventDelProject = (id) => {
            document.getElementById(id+'del').addEventListener('click', () => {
                categories.remove(id)
                return makeSideBar()
            })
        }
    const addEventShowProjectBox = () => {
        document.getElementById('sideadd').addEventListener('click', () => {
            let display = document.getElementById('toadd').style.display
            if (display == 'none') {
                document.getElementById('toadd').style.display = "flex";
                 return ;
             }
             else {
                document.getElementById('toadd').style.display = 'none';
                 return;
                }
         
        })
        
    }
    const addEventShowTodoScreen = () => {
        document.getElementById("overlay").addEventListener('click', e => {
            if(e.target.id == "overlay") {
                ///console.log(e.target.id == "overlay")
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
    } 
    const addEventToggleSideBar = () => {
        document.getElementById('smenu').addEventListener('click', () => {
            let display = document.getElementById('sidebar').style.display
             if (display == 'none') {
                document.getElementById('sidebar').style.display = "flex";
                 return ;
             }
             else {
                document.getElementById('sidebar').style.display = 'none';
                 return;
                }
            })
        
    }
    const addEventAddTodo = () => {
        document.getElementById('taddbtn').addEventListener('click', ()=> {
            let name =  document.getElementById('toname').value
            let desc =  document.getElementById('todesc').value
            let due =  document.getElementById('todue').value
            let priority =  document.getElementById('topriority').value
            let task = toDo(name,desc,due,priority)
            document.getElementById('overlay').style.display='none';
            return categories.addToCategories(task)
            //console.log(task.name)
        })
        
    }
    const addEventAddCategory = () => {
        document.getElementById('toaddbtn').addEventListener('click', () => {
            let category = document.getElementById('toaddtext').value
            if (!category) { 
                domControl.makeSideBar()
                return}
            else {
                categories.add(category)
                document.getElementById('toaddtext').value = ''
                domControl.makeSideBar()
                return console.log(categories.added)
            }
        })
    
    }
    return {rmChildren,
            makeNavBar,
            makeSideBar,
            makeForm,
            makeToDo,
            addEventDelProject,
            addEventShowProjectBox,
            addEventShowTodoScreen,
            addEventToggleSideBar,
            addEventAddTodo,
            addEventAddCategory,
            }
})()

domControl.makeNavBar()
domControl.makeSideBar()
domControl.makeToDo()
domControl.makeForm()
//domControl.addEventDelProject()
domControl.addEventShowProjectBox()
domControl.addEventShowTodoScreen()
domControl.addEventToggleSideBar()
domControl.addEventAddTodo()
domControl.addEventAddCategory()


