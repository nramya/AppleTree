/**
 * Created by ramya on 11/18/18.
 */

var rootNode = null;
var modal = document.querySelector('.modal');
var lastClickedTreeNode = null;
var treeMetadata = {};

document.addEventListener('DOMContentLoaded', () => {
    let txtCreate = document.getElementsByClassName('input-tree-create')[0];
    txtCreate.addEventListener('keyup', createRootNode);

    let btnCalculate = document.getElementsByClassName('btn-calculate')[0];
    btnCalculate.addEventListener('click', calculateMaxSum);
    
    let btnLogout = document.querySelector('.btn-logout');
    btnLogout.addEventListener('click', () => {
        btnLogout.firstElementChild.click();
    });

    var closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', hideModal);
    window.addEventListener('click', windowOnClick);

    var btnAddChildNodes = document.getElementById('btn-add-nodes');
    btnAddChildNodes.addEventListener('click', createChildNodes);
});

let createRootNode = (event) => {
    if (event.keyCode == 13) {
        event.target.classList.add('hidden');
        let data = event.target.value.trim().valueOf();
        rootNode = create_node(null, 'root', data);
        rootNode.addEventListener('click', showModal);
        var btnCalculate = document.getElementsByClassName('btn-calculate')[0];
        btnCalculate.removeAttribute('disabled');
    }
};

let createChildNodes = () => {
    let leftChildData = document.querySelector('#txt-left-data').value.trim().valueOf();
    let rightChildData = document.querySelector('#txt-right-data').value.trim().valueOf();
    let parent = lastClickedTreeNode;

    if (leftChildData){
        let leftChild = create_node(parent, 'left', leftChildData);
        leftChild.addEventListener('click', showModal);
    }
    if (rightChildData) {
        let rightChild = create_node(parent, 'right', rightChildData);
        rightChild.addEventListener('click', showModal);
    }
    hideModal();
    lastClickedTreeNode = null;
};

let showModal = (event) => {
    lastClickedTreeNode = event.target;
    modal.classList.add('show-modal');
};

let hideModal = () => {
    modal.classList.remove('show-modal');
    let formInputs = document.getElementById('frm-modal').querySelectorAll('input[type="text"]');
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].value = '';
    }
};

let windowOnClick = (event) => {
    if (event.target === modal) {
        hideModal();
    }
};

let create_node = (parent, position, data) => {
    let newDataDiv = document.createElement('div');
    newDataDiv.classList.add('tree-node');
    newDataDiv.innerHTML = data;

    let newUl = document.createElement('ul');
    let newLiLeft = document.createElement('li');
    newUl.appendChild(newLiLeft);
    let newLiRight = document.createElement('li');
    newUl.appendChild(newLiRight);

    if (!parent || (!data && data !== 0)) {
        if (!rootNode && position == 'root') {
            let tree = document.querySelector('.tree > ul > li');
            tree.appendChild(newDataDiv);
            tree.appendChild(newUl);
            return newDataDiv;
        } else {
            return null;
        }
    }
    let existingChildren = parent.nextSibling.querySelectorAll(':scope > li');
    if (position == 'left') {
        existingChildren[0].appendChild(newDataDiv);
        existingChildren[0].appendChild(newUl);
    } else if (position == 'right') {
        existingChildren[1].appendChild(newDataDiv);
        existingChildren[1].appendChild(newUl);
    } else {
        return null;
    }
    return newDataDiv;
};

let calculateMaxSum = () => {
    let txtResult = document.getElementById('txt-result');
    let jsonData = buildJson();
    if (jsonData.tagName === 'LI') {
        calculateTreeMaxHelper(jsonData, 0, 0);
    }
    txtResult.classList.remove('hidden');
    txtResult.value = treeMetadata[Math.max(...Object.keys(treeMetadata))];
};

let calculateTreeMaxHelper = (currNode, tempSum, currDepth) => {
    console.log(currNode);
    if (currNode.childNodes.length > 0) {
        tempSum += Number(currNode.childNodes[0].childNodes[0].nodeValue.trim());
        currDepth++;
        let children = currNode.childNodes[1].childNodes;
        calculateTreeMaxHelper(children[0], tempSum, currDepth);
        calculateTreeMaxHelper(children[1], tempSum, currDepth);
    } else {
        if (!treeMetadata[currDepth] || treeMetadata[currDepth] < tempSum) {
            treeMetadata[currDepth] = tempSum;
        }
    }
};

let buildJson = () => {
    let root = document.querySelector('.tree > ul > li');
    return domJSON.toJSON(root, {
        attributes: false,
        domProperties: false,
        metadata:false,
        stringify: false
    });
};

