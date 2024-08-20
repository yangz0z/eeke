<script setup>
import { reactive, ref, watch } from "vue"
import Editor from '@/components/Editor.vue'

const form = reactive({
    thumbnail: '',
    title: '',
    intro: '',
    content: '',
    category: '',
    startDt: '',
    startTm: '',
    endDt: '',
    endTm: '',
    online: true,
    location: '',
    locationDetail: '',
    free: true,
    amount: 0,
    limit: true,
    limitCount: 0,
    question: [],
    keyword: []
})

const step = ref(0)

const previewThumbnail = ref('')

// 썸내일 변경
const changeThumbnail = (event) => {
    const files = event.target?.files
    if (files.length > 0) {
        const file = files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
            previewThumbnail.value = e.target.result
        }
        reader.readAsDataURL(file)
        form.thumbnail = file
    }
}

const changeContent = (content) => {
    // console.log('내용 변경 => ', content)   
}

// watch (form, () => {
//     console.log(form.thumbnail)
// })
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
            <button type="button" @click="step++">다음으로</button>
        </div>
        <div v-show="step == 1">
            <h1>이벤트의 상세 내용을 입력해주세요.</h1>
            <Editor :content="form.content" @update="changeContent"/>
            <button type="button" @click="step++">다음으로</button>
        </div>
        <div v-show="step == 2">
            <h1>이벤트의 카테고리를 선택해주세요.</h1>
            <!-- 이벤트 카테고리 리스트 -->
        </div>
        <div v-show="step == 3">
            <h1>이벤트가 언제 시작하나요?</h1>
            <table>
                <tr>
                    <th>날짜</th>
                    <td>
                        <input type="date"/>
                        <input type="date"/>
                        <input type="radio" id="oneday"/>
                        <label for="oneday"> 하루만</label>
                        <!-- TODO 하루만 체크시 종료일 disabled하고 종료일 = 시작일 -->
                    </td>
                </tr>
                <tr>
                    <th>시간</th>
                    <td>
                        <input type="time"/>
                        <input type="time"/>
                        <input type="radio" id="allday"/>
                        <label for="allday"> 하루종일</label>
                        <!-- TODO 하루종일 체크시 시작 종료시간 모두 disabled하고 00:00 - 23:59 셋팅 -->
                    </td>
                </tr>
            </table>
        </div>
        <div v-show="step == 4">
            <h1>장소를 정해주세요.</h1>
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