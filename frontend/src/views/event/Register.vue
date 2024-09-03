<script setup>
import { reactive, ref, watch } from 'vue'
import Editor from '@/components/Editor.vue'
import Address from '@/components/Address.vue'
import { uploadFile, deleteFile } from '@/utils/fileUtil'
import { isEmpty } from '@/utils/validateUtil'
import axios from 'axios'

const form = reactive({
    thumbnail: {},
    title: '',
    intro: '',
    content: '',
    category: '',
    startDt: '',
    startTm: '',
    endDt: '',
    endTm: '',
    online: true,
    zonecode: '',
    address: '',
    detailAddress: '',
    extraAddress: '',
    free: true,
    amount: 0,
    limit: true,
    limitCount: 0,
    question: [],
    keyword: []
})

const step = ref(4)
const previewThumbnail = ref('')
const categories = ref({})
const showCategoryId = ref('')
const oneday = ref(false)
const allday = ref(false)

// 썸내일 변경
const changeThumbnail = async (event) => {
    // 이전 저장된 썸내일 삭제
    await deleteFile(form.thumbnail?.filename)

    const files = event.target?.files
    if (files.length > 0) {
        const file = files[0]
        const uploadedFile = await uploadFile(file)
        
        previewThumbnail.value = uploadedFile.src
        form.thumbnail = uploadedFile

        // const reader = new FileReader()
        // reader.onload = (e) => {
        //     previewThumbnail.value = e.target.result
        // }
        // reader.readAsDataURL(file)
    }
}

// 에디터 내용 변경
const changeContent = (content) => {
    form.content = content
}

// 전체 카테고리 조회
const getAllCategories = async () => {
    const result = await axios.get('/api/categories/all')
    if (result.data.success == true) {
        categories.value = result.data.data
        showCategoryId.value = categories.value[0]._id
    }
}

// 다음 넘어가기 전 유효성 체크
const handleNextStep = () => {
    const checkStep = step.value
    // TODO 유효성 체크
    step.value++
}

// 등록
const submit = () => {
    if (oneday.value) {
        form.endDt = form.startDt
    }
}

const updateAddress = (data) => {
    form.zonecode = data.zonecode || form.zonecode
    form.address = data.address || form.address
    form.detailAddress = data.detailAddress || form.detailAddress
    form.extraAddress = data.extraAddress || form.extraAddress
}

watch (step, () => {
    if (step.value == 2 && isEmpty(categories.value)) {
        getAllCategories()
    }
})
</script>

<template>
    <div>
        <div v-show="step == 0">
            <h1>이벤트를 등록해볼까요?</h1>
            <table>
                <tr>
                    <th>썸내일 등록</th>
                    <td>
                        <input 
                            id="thumbnailFile" 
                            type="file" 
                            @change="changeThumbnail" 
                            accept="image/*"
                            hidden
                        />
                        <label for="thumbnailFile">
                            <!-- 썸내일 미리보기 영역 -->
                            <img 
                                v-if="!!previewThumbnail" 
                                id="thumbnailImage" 
                                :src="previewThumbnail"
                                :style="{
                                    width: '400px',
                                    height: '300px'
                                }"
                            />
                            <a v-else>등록하기</a>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th>이벤트 제목</th>
                    <td>
                        <input type="text" v-model="form.title" maxlength="30"/>
                    </td>
                </tr>
                <tr>
                    <th>소개글</th>
                    <td>
                        <textarea v-model="form.intro" maxlength="400"/>
                    </td>
                </tr>
            </table>
            <button type="button" @click="handleNextStep">다음으로</button>
        </div>
        <div v-show="step == 1">
            <h1>이벤트의 상세 내용을 입력해주세요.</h1>
            <Editor :content="form.content" @update="changeContent"/>
            <button type="button" @click="handleNextStep">다음으로</button>
        </div>
        <div v-show="step == 2">
            <h1>이벤트의 카테고리를 선택해주세요.</h1>
            <div>
                <ul>
                    <li v-for="category in categories" :key="category._id">
                        <a href="#" @click.prevent="showCategoryId = category._id">{{ category.name }}</a>
                        <ul v-show="showCategoryId == category._id">
                            <li v-for="subCategory in category.subCategories" :key="subCategory._id">
                                <a href="#" @click.prevent="form.category = subCategory._id">{{ subCategory.name }}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <button type="button" @click="handleNextStep">다음으로</button>
        </div>
        <div v-show="step == 3">
            <h1>이벤트가 언제 시작하나요?</h1>
            <table>
                <tr>
                    <th>날짜</th>
                    <td>
                        <input type="date" v-model="startDt"/>
                        <input type="date" v-model="endDt" :disabled="oneday"/>
                        <input 
                            type="checkbox" 
                            id="oneday" 
                            :checked="oneday"
                            v-model="oneday"
                        />
                        <label for="oneday"> 하루만</label>
                    </td>
                </tr>
                <tr>
                    <th>시간</th>
                    <td>
                        <input type="time" v-model="form.startTm" :disabled="allday"/>
                        <input type="time" v-model="form.endTm" :disabled="allday"/>
                        <input type="checkbox" 
                            id="allday" 
                            :checked="allday" 
                            v-model="allday"
                            @change="() => {
                                form.startTm = '00:00'
                                form.endTm = '23:59'
                            }"
                        />
                        <label for="allday"> 하루종일</label>
                    </td>
                </tr>
            </table>
            <button type="button" @click="handleNextStep">다음으로</button>
        </div>
        <div v-show="step == 4">
            <h1>장소를 정해주세요.</h1>
            <input type="radio" id="online" @click="form.online = true" :checked="form.online">
            <label for="online">온라인</label>
            <input type="radio" id="offline" @click="form.online = false" :checked="!form.online">
            <label for="offline">오프라인</label>

            <Address 
                v-show="!form.online"
                @update="updateAddress"
             />
             <button type="button" @click="handleNextStep">다음으로</button>
        </div>
        <div v-show="step == 5">
            <h1>참여비가 있나요?</h1>
        </div>
        <div v-show="step == 6">
            <h1>참여자에게 물어보고 싶은 것이 있나요?</h1>
        </div>
        <div v-show="step == 7">
            <h2>키워드로 이벤트를 소개해볼까요?<br>키워드를 통해 이벤트를 검색할 수 있어요.</h2>
            <a>준비가 다 되었어요!<br>참여자를 만나러 가볼까요?</a>
        </div>
    </div>
</template>