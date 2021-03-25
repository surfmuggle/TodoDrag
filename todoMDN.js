var dragged;
let app = {
    draggedElement: null,
    todos: []
}


// #region  fillTodoList renderTodos addTodoListItem getTodos
function fillTodoList()
{
    var todoList = document.getElementById("todoList"); 
    var todos = getTodos();
    renderTodos(todoList, todos);
    const newListForm = document.querySelector('[data-new-list-form]')
    console.log("newListForm", newListForm);
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
    listItem.addEventListener("dragstart", onDragStart, false);
    listItem.addEventListener("drop", onDrop, false);
    // listItem.addEventListener("dragend", todoDragEndEvent, false);
    // addDebugEvents(listItem);
    targetNode.appendChild(listItem);
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

// #endregion

function todoDragEndEvent(event)
{

}

function onDragStart(event)
{
    // store a ref. on the dragged elem in global var
    app.draggedElement = event.target;
}

function onDragOver(event) {
    // prevent default to allow drop
    event.preventDefault();
}


// #region onDragEnter and onDragLeave are optional but improve UX
function onDragEnter(event)
{
    // highlight potential drop target when the draggable element enters it
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "purple";
    }
}

function onDragLeave(event) {
    // reset background of potential drop target when the draggable element leaves it
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
    }
}
// #endregion 

function onDrop(event) {
    console.log("onDrop draggedElement, event", app.draggedElement, event);
    // prevent default action (open as link for some elements)
    event.preventDefault();
    console.log("onDrop event.target.parentNode", event.target.parentNode);

    // move dragged elem to the selected drop target
    if ( event.target.className == "dropzone" || event.target.parentNode.className == "dropzone"  ) {
        event.target.style.background = "";
        // app.draggedElement.parentNode.removeChild( app.draggedElement );
        if(event.target.nodeName ==="LI")
        {
            event.target.parentNode.appendChild( app.draggedElement );
        }
        else {
            event.target.appendChild( app.draggedElement );
        }
        // setTimeout(()=>{console.log("timeout")}, 300);
    }
}

function addEventListener()
{
    var dropNodes = document.querySelectorAll(".dropzone");

    dropNodes.forEach(node => {
        node.addEventListener("dragstart", onDragStart, false);
        /* events fired on the drop targets */
        node.addEventListener("dragover", onDragOver, false);
        
        // adding these improves usability but is not needed 
        // node.addEventListener("dragenter", onDragEnter, false);
        // node.addEventListener("dragleave", onDragLeave, false);
        node.addEventListener("drop", onDrop, false);
    });
}



function init()
{
    addEventListener();
    fillTodoList()
}




