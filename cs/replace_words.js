const TEXT_NODE = document.TEXT_NODE;

function replaceWordsInTextNodes(node){
    for (let child of node.childNodes){
        if (child.nodeType != TEXT_NODE) { continue; }
        let oldText = child.nodeValue;
        let newText = oldText.replace(/психотерапевт/ig, 'нАрКоЛоГ');
        if (newText != oldText) {
            // console.log(oldText, newText);
            let newNode = document.createTextNode(newText);
            node.replaceChild(newNode, child);
        }
    }
}

function addMutationObserver(target){
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                for (let addedNode of mutation.addedNodes){
                    let nodeToReplaceIn;
                    if (addedNode.classList.contains('comment')){
                        // we are in a comment container
                        nodeToReplaceIn = addedNode.querySelector('.comment-text');
                        // console.log(nodeToReplaceIn);
                    }
                    if (nodeToReplaceIn){
                        replaceWordsInTextNodes(nodeToReplaceIn);
                    }
                }
            }
        });
    });
    var config = { childList: true };
    observer.observe(target, config);
}

function walkThroughTexts(){
    for (let node of document.querySelectorAll('.comments_div')){
        // new comments and expanded comments
        addMutationObserver(node);
    }

    for (let node of document.querySelectorAll('.text, .comment-text')){
       // posts and comments
       replaceWordsInTextNodes(node);
//       console.log(node);
    } 
}

// it' better to find a container for react, observe 
// when it is first rendered, and then invoke walkThroughTexts(),
// but I will not
setTimeout(walkThroughTexts, 2000)

