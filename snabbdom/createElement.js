import {isDefined} from "./patchVnode";

/**
 * 根据给定的虚拟节点创建DOM节点
 * @param vnode
 * @returns {*}
 */
export function createElement(vnode) {
  let sel = vnode.sel;
  let text = vnode.text;
  let children = vnode.children;
  
  let domNode = document.createElement(sel);
  
  if (isDefined(text)) {
    domNode.innerText = text;
  } else if (isDefined(children)) {
    children.forEach(childVnode => { // h('li', {}, 'A')
      let childDomNode = createElement(childVnode);
      domNode.appendChild(childDomNode)
    })
  }
  
  vnode.ele = domNode;
  return domNode;
}