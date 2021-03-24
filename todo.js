


let app = {
    todos: []
}
// use of templates and shadow dom
// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots

https://old.reddit.com/r/javascript/comments/9cdxwt/how_do_you_manage_state_with_vanilla_js/
// What does vanilla mean to you? Are you rolling everything yourself? A couple patterns are:

// pub/sub
// flux
// observables

// state management
//   Valoo: just the bare necessities of state management
//   https://gist.github.com/developit/a0430c500f5559b715c2dddf9c40948d
//
//   Immer Create the next immutable state tree by simply modifying the current tree
//   https://github.com/immerjs/immer

function fillTodoList()
{
    var todoList = document.getElementById("todoList"); 
    var todos = getTodos();
    renderTodos(todoList, todos);
    const newListForm = document.querySelector('[data-new-list-form]')
    console.log("newListForm", newListForm);
}


function getTodos()
{
    var todos = [
        {id:1, title:"get Milk", status: "open"}
        ,{id:2, title:"read Book", status: "open"}
        ,{id:3, title:"bake cookies", status: "open"}
        ,{id:4, title:"eat ice cream", status: "open"}
    ];
    app.todos = todos;
    return todos;
}

function renderTodos(targetNode, todos)
{
    todos.forEach(todo => {
        addTodoListItem(todo, targetNode);
    } );
}

function addTodoListItem(todo, targetNode) {
    let listItem = document.createElement("li");
    listItem.id = "todo-item-" + todo.id;
    listItem.innerText = todo.title;
    listItem.setAttribute('data-id', todo.id);
    listItem.setAttribute('class', todo.status);
    listItem.setAttribute('draggable', 'true');
    // listItem.addEventListener("dragstart", todoDragStartEvent, false);
    listItem.addEventListener("dragend", todoDragEndEvent, false);
    addDebugEvents(listItem);
    targetNode.appendChild(listItem);
}

function addDebugEvents(listItem)
{
    var options = {capture: true}; //  EventTarget beneath it in the DOM tree
    // https://www.freecodecamp.org/news/javascript-addeventlistener-example-code/
    // capture or bubble
    // https://javascript.info/bubbling-and-capturing
    // bubbling phase: false means the innermost HTML event handler is executed first <div><img></div>
    listItem.addEventListener("dragover", debugDragOver, false);
    listItem.addEventListener("drop", debugDrop, false);
}

function debugDragOver(event)
{
    let dragOverList = document.getElementById("dragOverList");
    console.log("debugDragOver", event);
}

function debugDrop(event)
{
    // let dragOverList = document.getElementById("dragOverList");
    console.log("debugDrop", event);
}

function todoDragStartEvent(event)
{
    console.log('todoDragtStartEvent', event)
    var foo ="empty"; // console.log('drag start', event);
}

// How to find out which node is below dragged element
function todoDragEndEvent(event)
{
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    console.log(' elemBelow',  elemBelow);
    let draggedElement = event.srcElement;
    var id = draggedElement.getAttribute('data-id');
    // var todo = app.todos.findIndex();
    let todoIndex = app.todos.findIndex(element => element.id == id);
    let ul = elemBelow.closest('div.dragdropArea').querySelector("ul");
    if(ul.getAttribute("data-todo-status") === "in-progress") 
    {
        app.todos[todoIndex].status = "in-progress";
    }
    else if(ul.getAttribute("data-todo-status") === "done") 
    {
        app.todos[todoIndex].status = "done";
    }
    addTodoListItem(app.todos[todoIndex], ul)
    draggedElement.remove();
    console.log(app.todos);

}

fillTodoList();
