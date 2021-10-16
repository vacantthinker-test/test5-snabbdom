import {vnode} from "./vnode";
import {patchVnode} from "./patchVnode";
import {createElement} from "./createElement";

/**
 * 是不是虚拟节点, 判断其有没有sel 属性
 * @param oldVnode
 * @returns {boolean}
 */
function isVnode(oldVnode) {
  return oldVnode.sel !== undefined;
}

/**
 * 转换为虚拟节点
 * @param oldVnode
 * @returns {{data, children, sel, text, key: *, ele}}
 */
function convertVnode(oldVnode) {
  let sel = oldVnode.tagName.toLowerCase();
  let data = {};
  let text = oldVnode.innerText;
  let children = undefined;
  return vnode(sel, data, text, children, oldVnode);
}

/**
 * 是不是相同的节点 key && sel
 * @param oldVnode
 * @param newVnode
 * @returns {boolean}
 */
export function sameVnode(oldVnode, newVnode) {
  if (oldVnode && newVnode) {
    let sameSel = oldVnode.sel === newVnode.sel;
    let sameKey = oldVnode.key === newVnode.key;
    
    return sameSel && sameKey;
  }else {
    return false;
  }
}

/**
 * 比较新旧节点, 然后更新旧节点
 * @param oldVnode
 * @param newVnode
 */
export function patch(oldVnode, newVnode) {
  if (!isVnode(oldVnode)) {
    // console.log('非虚拟节点')
    oldVnode = convertVnode(oldVnode)
    // console.log(oldVnode)
  }
  if (sameVnode(oldVnode, newVnode)) {
    patchVnode(oldVnode, newVnode); // 新旧是一样的节点, 比较然后更新
  } else {
    // 新旧不一样, 创建新的, 添加新的, 删除旧的
    let domElement = oldVnode.ele;
    let newDomElement = createElement(newVnode);
    domElement.parentNode.insertBefore(newDomElement, domElement);
    domElement.remove();
    
  }
}
