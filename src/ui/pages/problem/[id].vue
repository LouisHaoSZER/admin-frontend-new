<route lang="yaml">
  meta:
    requiresAuth: 1
  path: ":problemid"
  props: true
  </route>

<script setup lang='ts'>
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor'
import { CloudDownloadIcon, DiscountIcon } from 'tdesign-icons-vue-next'
import { ProblemAuth } from '@/domain/problem/ProblemAuth'

const props = withDefaults(defineProps<{
  problemid: number
}>(), {
  problemid: 0,
})

const router = useRouter()

onMounted(() => {
  console.log(props.problemid)

  ProblemAuth.getProblemInfo(props.problemid).then((res) => {
    console.log(res)
  })
})

const text = ref('')
const language = ref('go')

//
// MonacoEditor start
//
onBeforeUnmount(() => {
  let editor: monaco.editor.IStandaloneCodeEditor

  const editorDispose = () => {
    if (editor)
      editor.dispose()
  }

  onBeforeUnmount(() => {
    editorDispose()
  })
})
// @ts-expect-error Description of why the @ts-expect-error is necessary.
globalThis.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json')
      return new JsonWorker()

    if (label === 'css' || label === 'scss' || label === 'less')
      return new CssWorker()

    if (label === 'html' || label === 'handlebars' || label === 'razor')
      return new HtmlWorker()

    if (['typescript', 'javascript'].includes(label))
      return new TsWorker()

    return new EditorWorker()
  },
}
let editor: monaco.editor.IStandaloneCodeEditor

const editorInit = () => {
  nextTick(() => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
    })

    // eslint-disable-next-line style/multiline-ternary
    !(editor) ? editor = monaco.editor.create(document.getElementById('codeEditBox') as HTMLElement, {
      value: text.value, // 编辑器初始显示文字
      language: 'javascript', // 语言支持自行查阅demo
      automaticLayout: true, // 自适应布局
      theme: 'vs', // 官方自带三种主题vs, hc-black, or vs-dark
      foldingStrategy: 'indentation',
      renderLineHighlight: 'all', // 行亮
      selectOnLineNumbers: true, // 显示行号
      minimap: {
        enabled: false,
      },
      readOnly: false, // 只读
      fontSize: 16, // 字体大小
      scrollBeyondLastLine: false, // 取消代码后面一大段空白
      overviewRulerBorder: false, // 不要滚动条的边框
    })
      : editor.setValue('')
    // console.log(editor)
    // 监听值的变化
    editor.onDidChangeModelContent((_val: any) => {
      text.value = editor.getValue()
    })
  })
}
editorInit()
const changeLanguage = () => {
  monaco.editor.setModelLanguage(editor.getModel(), language.value)
}

// 编辑器上方部分
const languageValue = ref('')
const themeValue = ref('')

const langOption = ref([
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'go', label: 'Go' },
])

const themeOption = ref([
  { value: 'vs', label: 'vs' },
  { value: 'hc-black', label: 'hc-black' },
  { value: 'vs-dark', label: 'vs-dark' },
])

watch(languageValue, () => {
  changeLanguage()
})

// 弹出信息框
function createSnackbar(message: string) {
  Snackbar({
    content: message,
    duration: 1000,
  })
}

// 提交代码
const submitCode = () => {
  const problemauth = new ProblemAuth(props.problemid, text.value, languageValue.value)
  problemauth.submitCode().then((_res) => {
    createSnackbar('Submit Success!')
    router.push('/status')
  }).catch((_err) => {
    createSnackbar('Submit Failed!')
  })
}

// 刷新编辑器区代码
const refreshCode = () => {
  editor.setValue('')
}
</script>

<template>
  <div class="m-8 mt-4 flex gap-20">
    <div class="flex flex-4/5 flex-col gap-20 overflow-y-scroll rounded">
      <div
        class="rounded p-6"
        style="background-color: "
      >
        <ProblemContent />
      </div>
      <div
        style="background-color: "
        class="rounded p-6"
      >
        <div class="h-240 p-2 p-t-10">
          <div class="m-b-10 flex gap-10">
            <div
              class="flex flex-3/5 items-center gap-10"
            >
              <t-select
                v-model="languageValue"
                label="Language:"
                placeholder="Select Language"
                auto-width
                clearable
              >
                <t-option
                  v-for="item in langOption"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </t-select>
              <div
                class="m-2 flex flex-3/4 gap-5"
              >
                <t-button
                  shape="circle"
                  theme="primary"
                >
                  <template #icon>
                    <DiscountIcon />
                  </template>
                </t-button>
                <t-button
                  shape="circle"
                  theme="primary"
                >
                  <template #icon>
                    <CloudDownloadIcon />
                  </template>
                </t-button>
              </div>
            </div>
            <div
              class="flex-1/5"
            >
              <t-select
                v-model="themeValue"
                label="Theme:"
                placeholder="Select Theme"
                auto-width
                clearable
              >
                <t-option
                  v-for="item in themeOption"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </t-select>
            </div>
          </div>
          <div
            id="codeEditBox"
            style="height: 80%;"
            class="mb-10"
          />
          <div class="flex flex-row-reverse">
            <t-button
              theme="primary"
              @click="submitCode"
            >
              Submit
            </t-button>
          </div>
        </div>
      </div>
    </div>
    <ProblemContentTagCard />
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
#codeEditBox {
  height: 50%;
}
</style>
