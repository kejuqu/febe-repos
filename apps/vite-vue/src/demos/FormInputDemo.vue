<script setup lang="ts">
  import { ref } from 'vue';

  const msg = ref('default input value');
  const textareaMsg = ref('default input value');

  const checked = ref(true);

  const checkedNames = ref([]);

  const checkOptions = [
    {
      label: 'Jake',
      value: 'jake',
    },
    {
      label: 'John',
      value: 'john',
    },
    {
      label: 'Jimmy',
      value: 'jimmy',
    },
  ];

  const picked = ref('');

  const pickedOptions = [
    {
      label: 'One',
      value: 'one',
    },
    {
      label: 'Two',
      value: 'two',
    },
  ];

  const selected = ref('');
  const selectedOptions = [
    {
      label: 'Please select an option',
      value: '',
      disabled: true,
    },
    {
      label: 'A',

      value: 'a',
    },
    {
      label: 'B',
      value: 'b',
    },
    {
      label: 'C',
      value: 'c',
    },
  ];

  const toggle = ref(false);
</script>

<template>
  <p>Message is: {{ msg }}</p>
  <input v-model="msg" placeholder="v-model 双向数据绑定" />

  <span>Multipline message is:</span>
  <p style="white-space: pre-line">{{ textareaMsg }}</p>
  <textarea v-model="textareaMsg" placeholder="v-model add multiple lines"></textarea>

  <br />

  <input type="checkbox" id="checkbox-id" v-model="checked" />
  <label for="checkbox-id">{{ checked }}</label>

  <br />
  <h1 class="text-blue-400">Multiple checkbox:</h1>
  <div>Checked names: {{ checkedNames }}</div>
  <template v-for="option in checkOptions" :key="option.value">
    <input type="checkbox" :id="option.value" :value="option.value" v-model="checkedNames" />
    <label :for="option.value">{{ option.label }}</label>
  </template>

  <br />
  <h1 class="text-blue-400">Radio Input: {{ picked }}</h1>
  <template v-for="option in pickedOptions" :key="option.value">
    <input type="radio" :id="option.value" :value="option.value" v-model="picked" />
    <label :for="option.value">{{ option.label }}</label>
  </template>

  <br />
  <h1 class="text-red-400">Select: {{ selected }}</h1>
  <select v-model="selected">
    <option
      v-for="option in selectedOptions"
      :key="option.value"
      :value="option.value"
      :disabled="!!option.disabled"
    >
      {{ option.label }}
    </option>
  </select>

  <br />
  <h1 class="text-red-400">true/false map: {{ toggle }}</h1>
  <input type="checkbox" v-model="toggle" true-value="Yes" false-value="False" />

  <br />
  <h1 class="text-green-400">表单修饰符</h1>
  <p>
    v-model 会在每次 input 事件后更新数据（IME 拼字阶段的状态列外），可以使用 .lazy 修饰符来更改每次
    change 事件后更新数据
  </p>
  <p>msg: {{ msg }}</p>
  <input v-model.lazy="msg" />

  <p>v-model.number="variable" 可以将输入值转为 number 类型</p>
  <p>v-model.trim 可以自动去除用户输入首尾空格</p>
</template>

<style scoped></style>
