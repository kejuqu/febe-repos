<template>
    <div class="static" :class="{ active: isActive, 'text-red-400': hasError }">object syntax Of ClassDemo</div>
    <slot></slot>
    <div :class="[activeClass, errorClass]"> array classnames syntax</div>

    <div :class="[isActive ? activeClass : '', errorClass]">conditaion render classname</div>

    <div :class="classnames"> 通过 props 传入的 classnames 对象</div>


    <div :style="{ color: activeColor, 'font-size': fontSize + 'px' }">类联样式, key 可以支持 camelCase 也可以支持 kebab-case</div>

    <div :style="styleObj">object style</div>

    <div style="color:red" :style="'font-size: 18px'">:style 指令也可以和常规的 style attribute 共存</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const styleObj = reactive({
    color: 'red',
    fontSize: '18px'
})

const activeColor = ref('blue');
const fontSize = ref(30)

const isActive = ref(true)
const hasError = ref(false)

const activeClass = ref('active');
const errorClass = ref('text-danger')

// 通过 defineProps 定义 props， classnames 在 template 中可以直接使用
defineProps<{
    classnames: Record<string, any>
}>()




</script>


<style scoped>
.static {
    font-size: 18px;
}

.active {
    color: green;
}
</style>