<template>
  <p>
    plugins 是 能为 vue 添加全局功能的工具带啊么，一个插件可以拥有一个 install
    方法的对象，也可以直接是一个安装函数本身。安装函数接受到安装他的应用实例和传递给 app.use()
    的额外选项作为参数
  </p>

  <div>
    greetings.hello translate to chinese is:
    {{ $t('greetings.hello') }}
  </div>
</template>
