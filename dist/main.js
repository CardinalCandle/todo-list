/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "component": () => (/* binding */ component)
/* harmony export */ });
function component(el,content,id,parentid,cls,onclick) {
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




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);


/***/ }),
/* 3 */
/***/ ((module) => {



var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 4 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 5 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),
/* 8 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 9 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n    height: 100%;\n}\nbody{\n    padding:0;\n    margin:0;\n    height: 100%;\n}\n#uni {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n}\n#topcontainer{\n    user-select: none;\n    background-color:#603F83FF;\n    color: #C7D3D4FF;\n    font-family:Arial, Helvetica, sans-serif;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    margin: 0 auto;\n    align-content: center;\n}\n#topbar {\n    display: flex;\n    flex-direction: row;\n    user-select: none;\n    background-color:#603F83FF;\n    color: #C7D3D4FF;\n    font-family:Arial, Helvetica, sans-serif;\n    text-align: center;\n    padding: 1% 10%;\n    align-items: center;\n    justify-content: space-between;\n}\n#title {\n    font-weight: 900;\n    font-size: 4vh;\n}\n#subtitle {\n    font-size: 2vh;\n}\n#sidebar {\n    background-color:whitesmoke;\n    width: 30%;\n    font-family: Arial, Helvetica, sans-serif;\n    display:flex;\n    flex-direction: column;\n    height: 100%;\n    border-width: 1px;\n    border-style: hidden solid hidden hidden;\n    border-color: rgba(211, 211, 211, 0.233);\n}\n#sideel {\n    user-select: none;\n    font-size: 2.75vh;\n    padding: 7% 20%;\n    font-weight: 400;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n#sideel:hover {\n    background-color:rgba(211, 211, 211, 0.256);\n    border-radius: 5px;\n\n}\n#content {\n    display: flex;\n    flex-direction: row;\n    height: 100%;\n    overflow: auto;\n}\n#cont {\n    background-color: white;\n    width: 100%;\n    padding: 2vh;  \n    overflow: auto;\n\n}\n#todo {\n    user-select: none;\n    padding: 10px;\n    margin: 10px 0;\n    border-style: solid;\n    border-radius: 20px;\n    border-width: 1px;\n    border-color: #603F83FF ;\n    color: black;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\n}\n#sideadd {\n    margin: 20px 10px;\n    padding: 20px 0;\n    user-select: none;\n    color: #603F83FF ;\n    text-align: center;\n    font-size: 2.2vh;\n    font-weight: 600;\n    border-style: solid hidden hidden hidden;\n    border-width: 1px;\n    border-color: #C7D3D4FF;\n    user-select: none;\n}\n#sideadd:hover {\n    margin: 20px 0;\n    width: 100%;\n    background-color: #603F83FF ;\n    color: #C7D3D4FF;\n    text-align: center;\n}\n\n#todo {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n}\n#done{\n    width: 20px;\n    padding-bottom: 20px ;\n    border-style: solid;\n    border-color: #603F83FF;\n    border-radius: 50%;\n    border-width: 2px;\n}\n#done:hover {\n    background-color: #603F83FF;\n}\n#todoname {\n    margin: 0 10px;\n}\n#smenu {\n    height: 5vh ;\n    width: 5vh;\n    transform: scale(1.4);\n}\n#smenu:hover,\n#addbtn:hover {\n    background-color: rgba(199, 211, 212, 0.521);\n    border-radius: 50%;\n}\n#addbtn{\n    width: 7vh;\nfont-size: 6vh;\ncolor: white;\nfont-weight:900;\n}\n#formcont {\n    width: 25%;\n    margin: auto;\nposition: absolute;\ntop: 30vh; left: 40vh;\nbottom: 30vh; right: 40vh;\nbackground-color: #603F83FF ;\noverflow:auto;\ncolor: #FFF;\nz-index:5;\ndisplay: flex;\nflex-direction: column;\nborder-radius: 15px;\nbox-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n\n/* .formcont {\n    position: absolute;\n    z-index: 1;\n    width: 50vh;\n    height: 50vh;\n    background: slateblue;\n    top: 0;\nmargin: 20% 29%;\nborder-radius: 3%;\n}\n */\n #addtodo {\n    margin: 2vh;\n    display: flex;\n    flex-direction: column;\n    align-items: space-between;\n    align-content: space-between;\n    justify-items: center;\n    text-align: center;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\ninput {\n    background-color: #C7D3D4FF ;\n    border-style: solid;\n    border-width: 1px;\n    border-radius: 20px;\n}\n\n#topriority {\n    background: #C7D3D4FF;\n    border-style: solid;\n    border-color: transparent;\n    border-radius: 20px;\n    color: #603F83FF ;\n}\n\n#overlay {\n    position: absolute;\n    top: 0;\n    background: rgb(0, 0, 0,0.3);\n    width: 100%;\n    height: 100%;\n}\n#toadd {\n    padding: 5% 0.1%;\n    margin: 0 auto;\n    width: 100%;\n    border-radius: 0;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    background-color: #603F83FF;\n    justify-content: center;\n}\n\n#toaddtext {\n    margin: 0 auto;\n    border-radius: 0;\n    width: 80%;\n    border-radius: 5px;\n\n}\n#toaddbtn {\n    margin: 10px 0 0 0 ;\n    border-radius: 0;\n    width: 82%;\n    border-style: solid;\n    border-width: 1px;\n    border-radius: 5px;\n}\n#toaddbtn:hover {\n    background-color: #603F83FF;\n    color: #C7D3D4FF;\n    border-color: #C7D3D4FF;\n    border-style: solid;\n    border-width: 1px;\n}\n.catcontain {\n    display: flex;\n    justify-content: space-between;\n    flex-direction: row;\n    user-select: none;\n    font-size: 2.75vh;\n    padding: 10% 5% 10% 20%;\n    font-weight: 400;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n.catcontain:hover {\n    background-color:rgba(211, 211, 211, 0.256);\n    border-radius: 5px;\n}\n.catdel {\n    justify-self:right;\n    font-size: 2.75vh;\n    border-width: 1px;\n    border-style: hidden;\n    background-color: transparent;\n    padding: 0 1vh;\n    font-weight: 900;\n    color: rgba(211, 211, 211, 0.212);\n}\n.catdel:hover {\n    background-color: red;\n    color: lightgray;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



//console.log("HA")
})();

/******/ })()
;