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
    if (localStorage.length>0) {
        var base = JSON.parse(localStorage.getItem('base'))
        var added = JSON.parse(localStorage.getItem('added'))
    }
    else {
    var base = {
        "All Tasks": [],
        "This week": [],
        "Urgent":[],
        "Completed": [],}
    var added = {
    }
}
    const add = (name) => {
        added[name] = []
        saveToLocal()
        return added
    }
    const remove = (name) => {
        delete added[name]
        saveToLocal()
        return added
    }
    const addToCategories = (task) => {
        base['All Tasks'].push(task)
        if (task.priority == "urgent") {
            base['Urgent'].push(task)
        }
        domControl.makeSideBar()
        //base['All Tasks'].forEach(element => {console.log(element)})
        let found = base['All Tasks'].find(element => element.name.includes(task.name))
        console.log(found)
        domControl.makeToDo('All Tasks')
        return saveToLocal()
    }
    const setComplete = (nam) => {
        let found = base['All Tasks'].find(element => element.name.includes(nam))
        base['Completed'].push(found)
        removeFromCategory(found, 'All Tasks')
        saveToLocal()
    }
    const removeFromCategory = (task, cat) => {
        let found = base[cat].findIndex(element => element.name.includes(task.name))
        categories.base[cat].pop(found) ;
        saveToLocal()
    }
    const removeTodo = (name) => {
        Object.keys(base).forEach(element => {
            let found = base[element].findIndex(e => e.name.includes(name))
            categories.base[element].pop(found)
        })
        Object.keys(added).forEach(element => {
            let found = added[element].findIndex(e => e.name.includes(name))
            categories.added[element].pop(found)
        })
        saveToLocal()
    }
    const saveToLocal = () => {
        localStorage.setItem('base', JSON.stringify(categories.base))
        localStorage.setItem('added', JSON.stringify(categories.added))
    }
    return {
        base,
        added,
        add,
        remove,
        addToCategories,
        setComplete,
        removeTodo,
        saveToLocal,
    }
})()
categories.saveToLocal()
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
        component('div','','cont','content','','')

        return
    }
    const makeSideBar = () => {
        rmChildren('sidebar')
        removeListeners('sidebar','content')
        Object.keys(categories.base).forEach(element => {
            component('div','',element + 'contain','sidebar','basecontain','')
            component('div',element, element + 'text', element + 'contain','basetext','')
            component('div',categories.base[element].length, element + 'del', element + 'contain','basenum','')
            addEventShowCategory('base', element + 'contain')
        })
        Object.keys(categories.added).forEach(element => {
            component('div','',element + 'contain','sidebar','catcontain','')
            component('div',element, element + 'text', element + 'contain','cattext','')
            component('button','X', element + 'del', element + 'contain','catdel','')
            addEventDelProject(element)
            addEventShowCategory('added', element + 'contain')
        })
        component('div','+ Add project','sideadd','sidebar','','')
        component('div','','toadd','sidebar','','')
        component('input','','toaddtext','toadd','','')
        component('button','Add','toaddbtn','toadd','','')
        document.getElementById('toadd').style.display = 'none';
        addEventAddCategory()
        addEventShowProjectBox()
    }
    const makeToDo = (cattype, cat) => {
        rmChildren('cont')
        if (cattype == 'base') {
            let category = categories.base[cat]
            category.forEach(element => {
                component('div', '', 'todo','cont','','')
                component('div', '', element+'done','todo','done','')
                component('div', element.name,'todoname','todo','','')
                component('div','Due on ' + element.due,'tododue','todo','','')
                component('div','Del', element.name + 'del','todo','tododel','')
                addEventSetComplete(cattype, element+'done')
                addEventDelTodo(element.name + 'del')
    
        })}
        else if (cattype == 'added') {
            var category = categories.added[cat]
            category.forEach(element => {
                component('div','','todo','cont','','')
                component('div','',element+'done','todo','done','')
                component('div',element.name,'todoname','todo','','')
                component('div','Due on ' + element.due,'tododue','todo','','')
                addEventSetComplete(cattype, element+'done')
    
        }
        )
    }
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
                 return console.log(display);
             }
            else if (display == 'flex') {
                document.getElementById('toadd').style.display = 'none';
                return console.log(display);
            }
            else {
                return
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
    const addEventDelTodo = (id) => {
        document.getElementById(id).addEventListener('click', () => {
            let nam = document.getElementById(id).parentElement.children[1]
            categories.removeTodo(nam)
            makeSideBar()
            makeToDo()
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
    const addEventSetComplete = (cattype, id) => {
        document.getElementById(id).addEventListener('click', () => {
            todo = document.getElementById(id).parentElement.children[1].textContent
            categories.setComplete(todo)
            console.log(categories.base['All Tasks'])
            console.log(categories.base['Completed'])
            makeSideBar()
            makeToDo('base', 'All Tasks')
        })
    }
    const addEventShowCategory = (cattype, id) => {
        document.getElementById(id).addEventListener('click', () => {
            let cat = document.getElementById(id).children[0].textContent
            makeToDo(cattype, cat)
        })
    }
    const removeListeners = (id, parent) => {
        let cln = document.getElementById(id).cloneNode(true)
        document.getElementById(id).remove()
        document.getElementById(parent).insertBefore(cln, document.getElementById(parent).children[0])
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
            addEventSetComplete,
            addEventShowCategory,
            addEventDelTodo,
            removeListeners,
    }
})()

domControl.makeNavBar()
domControl.makeSideBar()
domControl.makeToDo('All Tasks')
domControl.makeForm()
//domControl.addEventDelProject()
domControl.addEventShowTodoScreen()
domControl.addEventToggleSideBar()
domControl.addEventAddTodo()
domControl.addEventAddCategory();