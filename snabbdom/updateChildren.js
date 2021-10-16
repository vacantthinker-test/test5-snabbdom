/**
 * 四命中查找
 * @param domElement
 * @param oldCh
 * @param newCh
 */
import {sameVnode} from "./patch";
import {patchVnode} from "./patchVnode";
import {createElement} from "./createElement";

export function updateChildren(domElement, oldCh, newCh) {
  let newStartIndex = 0;
  let newEndIndex = newCh.length - 1;
  let oldStartIndex = 0;
  let oldEndIndex = oldCh.length - 1;
  
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIndex]
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIndex];
  
  let oldMap;
  let positionInOldMap;
  
  
  // 四命中 一：新前与旧前 二：新后与旧后 三：新后与旧前 四：新前与旧后
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (sameVnode(oldStartVnode, newStartVnode)) {
      // 一：新前与旧前匹配
      // 1更新节点
      // 2移动指针 更新指针节点
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIndex];
      newStartVnode = newCh[++newStartIndex];
    } else if (sameVnode(newEndVnode, oldEndVnode)) {
      // 二 新后与旧后
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 三 新后与旧前
      console.log('type3')
      patchVnode(oldStartVnode, newEndVnode);
      //  E     D
      //  A2    B2    C2    D2    E2
      
      // E vs E2
      // E2   D
      
      let refChild = oldCh[oldEndIndex].ele.nextSibling;
      let newChild = oldCh[oldStartIndex].ele;
      domElement.insertBefore(newChild, refChild)
      
      oldStartVnode = oldCh[++oldStartIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // 四 新前与旧后
      patchVnode(oldEndVnode, newStartVnode)
      
      //  B     A
      //  A2    B2    C2    D2    E2
      
      // A vs A2
      // B   A2
      // A2  B
      let refChild = oldCh[oldStartIndex].ele;
      let newChild = oldCh[oldEndIndex].ele;
      domElement.insertBefore(newChild, refChild)
      
      oldEndVnode = oldCh[--oldEndIndex];
      newStartVnode = newCh[++newStartIndex];
    } else {
      // 非四命中
      if (oldMap === undefined) {
        oldMap = createOldMap(oldCh);
      }
      // console.log(oldMap)
      let keySearch = newStartVnode.key;
      positionInOldMap = oldMap[keySearch];
      if (positionInOldMap === undefined) {
        console.log('undefined', keySearch)
        // 没找到key 创建新元素 插入新元素
        
        // A2   D2    M     N
        // A2   B2    C2    D2    E2
        
        
        let refChild = oldCh[oldStartIndex].ele;
        let newChild = createElement(newStartVnode);
        domElement.insertBefore(newChild, refChild);
        
      } else {
        console.log('definition', keySearch)
        // 找到了key 更新元素 移动元素
        let oldVnodeFound = oldCh[positionInOldMap];
        patchVnode(oldVnodeFound, newStartVnode);
  
        // M    D     A     N
        // A2   B2    C2    D2    E2
  
        let refChild = oldCh[oldStartIndex].ele;
        let newChild = oldVnodeFound.ele;
        domElement.insertBefore(newChild, refChild)
        
        oldCh[positionInOldMap] = undefined; // 标记为undefined表示已处理
      }
      newStartVnode = newCh[++newStartIndex];
    }
  }
  
  
  if (oldStartIndex <= oldEndIndex || newStartIndex <= newEndIndex) {
    if (oldStartIndex > oldEndIndex) {
      // console.log('if')
      let refChild = oldCh[oldEndIndex].ele.nextSibling;
      // console.log(refChild)
      addNode(domElement, refChild, newCh, newStartIndex, newEndIndex);
    } else {
      // console.log('else');
      // 删除多余的
      removeNode(oldCh, oldStartIndex, oldEndIndex)
    }
  }
  
}

function createOldMap(oldCh) {
  const map = {};
  oldCh.forEach((node, index) => {
    if (node) {
      let key = node.key
      map[key] = index;
    }
  })
  
  return map;
}

/**
 * 添加新元素
 * @param domElement
 * @param refChild
 * @param children
 * @param startIndex
 * @param endIndex
 */
export function addNode(domElement, refChild, children, startIndex, endIndex) {
  for (; startIndex <= endIndex; startIndex++) {
    let node = children[startIndex]
    let newChild = createElement(node);
    domElement.insertBefore(newChild, refChild)
  }
}

/**
 * 删除多余的元素
 * @param children 旧children
 * @param startIndex 开始下标
 * @param endIndex 结束下标
 */
export function removeNode(children, startIndex, endIndex) {
  for (; startIndex <= endIndex; startIndex++) {
    let node = children[startIndex]
    if (node) {
      node.ele.remove();
    }
  }
}