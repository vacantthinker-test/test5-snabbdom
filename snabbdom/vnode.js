/**
 * 创建一个虚拟节点
 * @param sel 选择器
 * @param data 数据
 * @param text 文本
 * @param children 子元素
 * @param ele DOM元素
 * @returns {{data, children, sel, text, key: *, ele}}
 */
export function vnode(sel, data, text, children, ele) {
  let key = data !== undefined ? data.key : undefined;
  return {
    sel, data, text, children, ele, key
  };
}