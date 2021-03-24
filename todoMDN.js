var dragged;

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
}




