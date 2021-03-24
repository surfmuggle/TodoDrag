var dragged;
let app = {
    todos: []
}

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
    listItem.addEventListener("dragend", todoDragEndEvent, false);
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

function todoDragEndEvent(event)
{

}

function onDragStart(event)
{
    // store a ref. on the dragged elem
    dragged = event.target;
    console.log("dragtstart event.target", event.target);
}

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

function onDrop(event) {
    console.log("onDrop dragged + event", dragged, event);
    console.log("dragtstart event.target.className", event.target.className);
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
    }
}

function addEventListener()
{
    var dropNodes = document.querySelectorAll(".dropzone");

    dropNodes.forEach(node =>
        {
            console.log("node =>", node);
            node.addEventListener("dragstart", onDragStart, false);
            /* events fired on the drop targets */
            node.addEventListener("dragover", function( event ) {
                  // prevent default to allow drop
                  event.preventDefault();
            }, false);
            
            node.addEventListener("dragenter", onDragEnter, false);
            node.addEventListener("dragleave", onDragLeave, false);
            node.addEventListener("drop", onDrop, false);
        });
}



function init()
{
    addEventListener();
    fillTodoList()
}




