<template>
  &lt; KeepAlive &gt; 默认会缓存内部的所有组件实例，但我们可以通过 include 和 exclude prop
  来定制该行为。这两个 prop
  的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：它会根据组件的
  name 选项进行匹配，所以组件如果想要条件性地被 KeepAlive 缓存，就必须显式声明一个 name 选项。

  <p>KeepAlive 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。</p>
</template>
