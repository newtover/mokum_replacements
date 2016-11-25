var TEXT_NODE = document.TEXT_NODE;

function replaceWordsInTextNodes(node){
    for (let child of node.childNodes){
        if (child.nodeType != TEXT_NODE) { continue; }
        let oldText = child.nodeValue;
        let newText = oldText.replace(/психотерапевт/g, 'нарколог');
        if (newText != oldText) {
            console.log(newText);
            let newNode = document.createTextNode(newText);
            node.parentNode.replaceChild(newNode, node);
        }
    }
}

function walkThroughTexts(){
    for (let node of document.querySelectorAll('.text, .comment-text')){
       replaceWordsInTextNodes(node);
       console.log(node);
    } 
}
walkThroughTexts();

