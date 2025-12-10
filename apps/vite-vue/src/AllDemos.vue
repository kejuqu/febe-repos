<script setup lang="ts">
  import ClassDemo from './demos/ClassDemo.vue';
  import BaseDemo from './demos/BaseDemo.vue';
  import ForIfDemo from './demos/ForIfDemo.vue';
  import EventChange from './demos/EventChange.vue';
  import FormInputDemo from './demos/FormInputDemo.vue';
  import WatchDemo from './demos/WatchDemo.vue';
  import RefDemo from './demos/RefDemo.vue';
  import DynamicComponent from './demos/DynamicComponent.vue';
  import ComponentVModel from './demos/ComponentVModel.vue';
  import ExtendAttributesDemo from './demos/ExtendAttributesDemo.vue';
  import BindAttributesBy from './demos/BindAttributesBy.vue';
  import ProvideAndInjectDemo from './demos/ProvideAndInjectDemo.vue';
  import CustomDirections from './demos/CustomDirections.vue';
  import Plugins from './demos/Plugins.vue';
  import TransitionDemo from './demos/TransitionDemo.vue';
  import FlipDemo from './demos/FlipDemo.vue';
  import TransitionSearchDemo from './demos/TransitionSearchDemo.vue';
  import TeleportDemo from './demos/TeleportDemo.vue';
  import RouteDemo from './demos/RouteDemo.vue';

  const classnames = {
    'text-red-400': true,
    'font-bold': true,
  };
</script>

<template>
  <hr class="my-4 border-amber-800" />
  <RouteDemo></RouteDemo>
  <hr class="my-4 border-amber-800" />

  <TeleportDemo></TeleportDemo>
  <hr class="my-4 border-amber-800" />
  <TransitionSearchDemo></TransitionSearchDemo>
  <hr class="my-4 border-amber-800" />
  <FlipDemo></FlipDemo>
  <hr class="my-4 border-amber-800" />
  <TransitionDemo></TransitionDemo>
  <hr class="my-4 border-amber-800" />
  <Plugins></Plugins>
  <hr class="my-4 border-amber-800" />
  <CustomDirections />
  <hr class="my-4 border-amber-800" />
  <ProvideAndInjectDemo></ProvideAndInjectDemo>
  <hr class="my-4 border-amber-800" />
  <BindAttributesBy name="BindAttributesBy">
    <template #default> hello </template>
    <template #extra> extra content </template>
  </BindAttributesBy>
  <hr class="my-4 border-amber-800" />
  <ExtendAttributesDemo />
  <hr class="my-4 border-amber-800" />
  <ComponentVModel />
  <hr class="my-4" />
  <WatchDemo />
  <hr class="my-4" />
  <!-- 在 DOM 内模板中，我们必须显式地写出关闭标签： -->
  <dynamic-component />
  <hr class="my-4" />
  <RefDemo />
  <hr class="my-4" />

  <hr class="my-4" />
  <form-input-demo></form-input-demo>
  <hr class="my-4" />
  <event-change></event-change>
  <hr class="my-4" />

  <for-if-demo></for-if-demo>
  <hr class="my-4" />

  <base-demo></base-demo>

  <!-- 给 classDemo 组件传入 classnames props -->
  <class-demo :classnames="classnames">default slot</class-demo>
</template>

<style scoped></style>
