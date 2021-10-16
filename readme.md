# vue2 虚拟节点和diff算法 手写代码

---

### h ✔

 - h.js 创建3种类型的虚拟节点
   - type1: h('div', {}, 'text')
   - type2: h('div', {}, [h(),h(),h()])
   - type3: h('div', {}, h())
   - 
   - return vnode()
 - vnode.js 创建虚拟节点
   - sel 选择器
   - data {}
   - text 标签内的文本内容
   - children 子元素
   - ele 虚拟节点对应的DOM元素
   - key 唯一标志

### patch

 - patch.js (oldVnode, newVnode)
   - isVnode oldVnode是虚拟节点么?
     - 不是虚拟节点, 转换一下, 转换为虚拟节点
   - sameVnode()
     - true 是相同的节点
       - patchVnode.js
     - false 不是相同的节点
       - 根据newVnode创建新元素
       - 插入新元素在oldVnode.ele之前
       - 删除oldVnode.ele

 - patchVnode.js
   - text是不是一样
     - oldVnode.ele.textContent = ''
     - oldVnode.ele.innerText = newVnode.text
   - children是不是一样
     - updateChildren.js

 - createElement.js
 - updateChildren.js
   - 四指针
   - 四指针对应的虚拟节点
   - 四命中查找
   - if来处理剩余的
   
---

end
finished