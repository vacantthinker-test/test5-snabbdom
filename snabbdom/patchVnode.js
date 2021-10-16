/**
 * 新旧节点是一样的 key && sel
 *
 * 比较更新新旧节点, 然后更新旧节点
 * @param oldVnode
 * @param newVnode
 */
import {updateChildren} from "./updateChildren";
import {createElement} from "./createElement";

export function patchVnode(oldVnode, newVnode) {
  let domElement = oldVnode.ele; // 同一个DOM元素
  newVnode.ele = oldVnode.ele;
  
  let newText = newVnode.text;
  let oldText = oldVnode.text;
  let newCh = newVnode.children;
  let oldCh = oldVnode.children;
  
  if (isDefined(newText)) { // 新有text无children
    if (newText !== oldText) { // 新旧text不一样
      domElement.textContent = '' // 清空旧所有内容
      domElement.innerText = newText; // 更新旧innerText
    }
  } else if (isDefined(newCh)) { // 新有children
    if (isDefined(oldText)) { // 新有children 旧有text无children
      domElement.textContent = '' // 清空旧所有内容
      // 创建新元素
      // 插入新元素至domElement
      newCh.forEach(childVnode => {
        let childDomNode = createElement(childVnode);
        domElement.appendChild(childDomNode)
      })
      
    } else if (isDefined(oldCh)) {
      updateChildren(domElement, oldCh, newCh)
    }
  }
  
}

export function isDefined(k) {
  return k !== undefined;
}

export function isUnDefined(k) {
  return k === undefined;
}