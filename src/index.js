import {h, patch} from "snabbdom";

let nodeApp = document.getElementById('app');
// let vnode1 = h('div', {},'this is a text');

let vnode1 = h('ul', {key: 'ul'}, [
  h('li', {key: 'M'}, 'M'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'N'}, 'N'),
])
patch(nodeApp, vnode1); // 第一次patch, 真实DOM节点 与 虚拟节点 比较

let vnode2 = h('ul', {key: 'ul'}, [
  h('li', {key: 'A'}, 'A2'),
  h('li', {key: 'B'}, 'B2'),
  h('li', {key: 'C'}, 'C2'),
  h('li', {key: 'D'}, 'D2'),
  h('li', {key: 'E'}, 'E2'),
])
setTimeout(() => {
  patch(vnode1, vnode2); // 第二次patch, 新旧一样, 比较children
}, 500); // 延迟500毫秒执行, 方便查看效果


