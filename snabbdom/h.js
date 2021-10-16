import {vnode} from "./vnode";

/**
 *
 * @param sel 字符串 选择器
 * @param data 对象 数据
 * @param c
 *          type1: h('div', {}, 'text')
 *          type2: h('div', {}, [h(),h(),h(),])
 *          type3: h('div', {}, h())
 * @returns {{data, children, sel, text, key: *, ele}}
 */
export function h(sel, data, c) {
  if (
    arguments.length !== 3
    || (typeof sel !== 'string')
    || (typeof data !== 'object')
    || (typeof c === undefined)
    || (c === null)
  ){
    throw new Error("请输入类型正确的3个参数")
  }
  
  let text;
  let children;
  let ele = undefined;
  if (typeof c === 'string'){
    text = c;
  }else if(Array.isArray(c)){
    children = c;
  }else if (c && c.sel !== undefined){
    children = [c];
  }
  
  return vnode(sel, data, text, children, ele);
}
