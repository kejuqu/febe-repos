<template>
  <header>header</header>
  <main v-bind="$attrs">
    main 多跟节点的 Attributes 继承
    <div>
      和单跟节点组件有所不同，有着多个跟节点的组件没有自动 attribute 透传行为
      <p>
        如果 $attrs 没有被显示绑定，将会抛出一个运行时警告，可以使用 $attrs 和 v-bind
        来显式绑定解除警告
      </p>
    </div>

    <div>可以在 &lt; script setup &gt; 中使用 useAttrs() API 来访问一个组件的所有透传 attrbute</div>

    <br />
    插槽内容无法访问字组件的数据， Vue 模板中的表达式只能访问其定义时所在的作用域

    <p>父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。</p>

    <slot> <span class="text-white">default content for slot</span> </slot>

    <slot name="extra">
      <p>footer</p>
    </slot>

    <!-- 使用
    <template #extra>
        或者
    <template v-slot:slotName="extra">
        extra content
    </template>
    -->
  </main>
  <footer>footer</footer>

  <SlotDemo>
    <template #main>
      <p class="text-orange-300"><i>main slot content</i></p>
    </template>
    <!-- 动态插槽名字 -->
    <!-- <template v-slot:[dynamicSlotName]> -->
    <template #[dynamicSlotName]>
      <p class="text-orange-300"><i>footer slot content</i></p>
    </template>

    <!-- 作用域插槽 -->
    <template #scope="propsFromSlot">
      <p class="text-orange-300">{{ propsFromSlot.text }}___ {{ propsFromSlot.count }}</p>
    </template>

    <template #default="propsFromSlot">
      <p class="text-zinc-500">{{ propsFromSlot.text }}___ {{ propsFromSlot.count }}</p>
    </template>
  </SlotDemo>

  <FancyListScopeSlot>
    <!-- 使用 item 具名插槽，并且解构出 item 传递过来 props 值 -->
    <template #item="{ body, username, likes }">
      <section class="text-left text-black">
        <h2>{{ body }}</h2>
        <p class="text-green-500 text-sm">by {{ username }} | {{ likes }} likes</p>
      </section>
    </template>
  </FancyListScopeSlot>

  <MouseTracker v-slot="{ x, y }"> Mouse is at {{ x }}, {{ y }} </MouseTracker>
</template>

<script setup lang="ts">
  import { useAttrs, ref } from 'vue';
  import SlotDemo from './SlotDemo.vue';
  import FancyListScopeSlot from './FancyListScopeSlot.vue';
  import MouseTracker from './MouseTracker.vue';

  // 动态插槽名字
  const dynamicSlotName = ref('footer');

  //   defineProps<{ name: string }>(); defineProps 定义过的 props 不会出现在 useAttrs 返回的 对象中

  const attrs = useAttrs();
  console.log('attrs>>> ', attrs);
</script>
