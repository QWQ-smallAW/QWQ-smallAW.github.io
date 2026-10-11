<script lang="ts" setup>
import { onMounted } from 'vue'
import 'valaxy-addon-twikoo/client/styles/index.scss'

const TWIKOO_JS_URL = 'https://registry.npmmirror.com/twikoo/1.7.9/files/dist/twikoo.all.min.js'

function loadScript() {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${TWIKOO_JS_URL}"]`)) {
      return resolve(true)
    }
    const script = document.createElement('script')
    script.src = TWIKOO_JS_URL
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 等待 window.twikoo 就绪
function waitForTwikoo(timeout = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const timer = setInterval(() => {
      if (window.twikoo) {
        clearInterval(timer)
        resolve(true)
      } else if (Date.now() - start > timeout) {
        clearInterval(timer)
        reject(new Error('Twikoo 加载超时'))
      }
    }, 100)
  })
}

onMounted(async () => {
  try {
    await loadScript()
    await waitForTwikoo()

    if (window.twikoo && document.getElementById('tcomment')) {
      window.twikoo.init({
        envId: 'https://smallaw-twikoo.netlify.app',
        el: '#tcomment',
      })
    }
  } catch (error) {
    console.error('Twikoo 初始化失败:', error)
  }
})
</script>

<template>
  <div id="tcomment" w="full" />
</template>