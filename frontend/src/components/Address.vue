<script setup>
import { reactive, ref, onMounted, onUnmounted, watch } from 'vue'

const isScriptLoaded = ref(false)
const zonecode = ref('')
const address = ref('')
const detailAddress = ref('')
const extraAddress = ref('')

const emit = defineEmits(['update:zonecode', 'update:address', 'update:detailAddress', 'update:extraAddress'])

const execDaumPostcode = () => {
    if (window.daum && window.daum.Postcode) {
        new daum.Postcode({
            oncomplete: (data) => {
                // 우편번호 검색 완료 후의 처리 로직
                zonecode.value = data.zonecode
                address.value = data.address
                detailAddress.value = data.buildingName // 건물명
            }
        }).open();
    } else {
        console.error("Daum Postcode 스크립트가 로드되지 않았습니다.");
    }
}

let script = null
const loadScript = () => {
  return new Promise((resolve, reject) => {
    script = document.createElement('script')
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    script.onload = () => {
      isScriptLoaded.value = true
      resolve()
    }
    script.onerror = () => {
      reject(new Error('Failed to load Daum Postcode script'))
    }
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  try {
    await loadScript()
    console.log('Daum Postcode script loaded successfully')
  } catch (error) {
    console.error('Error loading Daum Postcode script:', error)
  }
})

onUnmounted(() => {
  if (script && script.parentNode) {
    script.parentNode.removeChild(script)
    isScriptLoaded.value = false
  }
})

watch(zonecode, (newValue) => {
  emit('update:zonecode', newValue)
})

watch(address, (newValue) => {
  emit('update:address', newValue)
})

watch(detailAddress, (newValue) => {
  emit('update:detailAddress', newValue)
})

watch(extraAddress, (newValue) => {
  emit('update:extraAddress', newValue)
})

</script>

<template>
    <div>
        <input type="text" v-model="zonecode" placeholder="우편번호" readonly>
        <!-- 스크립트 로딩 완료 후에만 버튼을 활성화합니다 -->
        <input type="button" @click="execDaumPostcode" value="우편번호 찾기" :disabled="!isScriptLoaded"><br>
        <input type="text" v-model="address" placeholder="도로명주소" readonly>
        <input type="text" v-model="detailAddress" placeholder="상세주소">
        <input type="text" v-model="extraAddress" placeholder="참고항목">
    </div>
</template>