import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

// 支持的语言列表
export const supportedLocales = {
  'zh-CN': '简体中文',
  'en-US': 'English',
  'ja-JP': '日本語',
  'ko-KR': '한국어'
} as const

export type SupportedLocale = keyof typeof supportedLocales

// 翻译内容
const messages = {
  'zh-CN': {
    header: {
      home: '首页',
      about: '关于',
      darkMode: '黑暗模式',
      lightMode: '明亮模式',
      language: '语言',
      theme: '主题'
    }
  },
  'en-US': {
    header: {
      home: 'Home',
      about: 'About',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      language: 'Language',
      theme: 'Theme'
    }
  },
  'ja-JP': {
    header: {
      home: 'ホーム',
      about: 'について',
      darkMode: 'ダークモード',
      lightMode: 'ライトモード',
      language: '言語',
      theme: 'テーマ'
    }
  },
  'ko-KR': {
    header: {
      home: '홈',
      about: '소개',
      darkMode: '다크 모드',
      lightMode: '라이트 모드',
      language: '언어',
      theme: '테마'
    }
  }
}

// 主题状态
const isDarkMode = useStorage('darkMode', false)

// 语言状态
const currentLocale = ref<SupportedLocale>('zh-CN')

// 监听黑暗模式变化
watch(isDarkMode, (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

// 翻译函数
export function t(key: string, locale?: SupportedLocale): string {
  const targetLocale = locale || currentLocale.value
  const keys = key.split('.')
  let value: any = messages[targetLocale]
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      return key // 如果找不到翻译，返回原始key
    }
  }
  
  return value || key
}

// 切换黑暗模式
export function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
}

// 设置语言
export function setLocale(locale: SupportedLocale) {
  currentLocale.value = locale
}

// 获取当前语言
export function getCurrentLocale() {
  return currentLocale.value
}

// 获取当前黑暗模式状态
export function getDarkMode() {
  return isDarkMode.value
}