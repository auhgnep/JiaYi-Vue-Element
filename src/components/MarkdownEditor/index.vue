<template>
    <div class="markdown-editor">
      <div class="toolbar" v-if="!readOnly">
        <span class="tool-item" v-for="item in toolbars" :key="item.type" @click="insertContent(item)">
          <i :class="item.icon"></i>
        </span>
      </div>
      <div class="editor-container" :class="{ 'read-only': readOnly }">
        <div class="edit-area" v-if="!readOnly">
          <textarea
            ref="textarea"
            :value="value"
            @input="handleInput"
            :style="styles"
            :placeholder="placeholder"
          ></textarea>
        </div>
        <div class="preview-area" :style="styles" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </template>
  
  <script>
//   import MarkdownIt from 'markdown-it'
  import MarkdownIt from 'markdown-it/dist/markdown-it.js'
  import 'highlight.js/styles/github.css'
  import hljs from 'highlight.js'
  
  export default {
    name: 'MarkdownEditor',
    props: {
      value: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 400
      },
      minHeight: {
        type: Number,
        default: 200
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '请输入Markdown内容'
      }
    },
    data() {
      return {
        md: null,
        toolbars: [
          { type: 'bold', icon: 'iconfont icon-bold', text: '**粗体**' },
          { type: 'italic', icon: 'iconfont icon-italic', text: '*斜体*' },
          { type: 'header', icon: 'iconfont icon-header', text: '# 标题' },
          { type: 'link', icon: 'iconfont icon-link', text: '[链接](url)' },
          { type: 'image', icon: 'iconfont icon-image', text: '![图片](url)' },
          { type: 'code', icon: 'iconfont icon-code', text: '```\n代码块\n```' },
          { type: 'quote', icon: 'iconfont icon-quote', text: '> 引用' },
          { type: 'list', icon: 'iconfont icon-list', text: '- 列表项' },
          { type: 'orderedList', icon: 'iconfont icon-ordered-list', text: '1. 有序列表' },
          { type: 'table', icon: 'iconfont icon-table', text: '| 表头 | 表头 |\n| --- | --- |\n| 内容 | 内容 |' }
        ]
      }
    },
    computed: {
      styles() {
        let style = {}
        if (this.minHeight) {
          style.minHeight = `${this.minHeight}px`
        }
        if (this.height) {
          style.height = `${this.height}px`
        }
        return style
      },
      compiledMarkdown() {
        return this.md ? this.md.render(this.value || '') : ''
      }
    },
    created() {
      this.md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) {}
          }
          return '' // 使用默认的转义
        }
      })
    },
    methods: {
      handleInput(e) {
        const value = e.target.value
        this.$emit('input', value)
        this.$emit('change', value)
      },
      insertContent(item) {
        const textarea = this.$refs.textarea
        const position = textarea.selectionStart
        const value = this.value || ''
        
        let newValue = ''
        // 在光标位置插入内容
        if (textarea.selectionStart || textarea.selectionStart === 0) {
          newValue = value.substring(0, position) + item.text + value.substring(textarea.selectionEnd)
          this.$emit('input', newValue)
          
          // 设置光标位置
          this.$nextTick(() => {
            textarea.focus()
            const newPosition = position + item.text.length
            textarea.setSelectionRange(newPosition, newPosition)
          })
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .markdown-editor {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  
  .toolbar {
    padding: 8px;
    border-bottom: 1px solid #dcdfe6;
    background-color: #f5f7fa;
  }
  
  .tool-item {
    display: inline-block;
    padding: 6px 8px;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .tool-item:hover {
    background-color: #ecf5ff;
    color: #409eff;
  }
  
  .editor-container {
    display: flex;
    position: relative;
  }
  
  .editor-container.read-only {
    display: block;
  }
  
  .edit-area, .preview-area {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
  }
  
  .edit-area textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    resize: none;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    line-height: 1.6;
  }
  
  .preview-area {
    border-left: 1px solid #dcdfe6;
    background-color: #fafafa;
  }
  
  /* Markdown 预览样式 */
  .preview-area :deep(h1) {
    font-size: 2em;
    margin: 0.67em 0;
  }
  
  .preview-area :deep(h2) {
    font-size: 1.5em;
    margin: 0.75em 0;
  }
  
  .preview-area :deep(h3) {
    font-size: 1.17em;
    margin: 0.83em 0;
  }
  
  .preview-area :deep(p) {
    margin: 1em 0;
  }
  
  .preview-area :deep(code) {
    background-color: #f3f3f3;
    padding: 2px 4px;
    border-radius: 3px;
  }
  
  .preview-area :deep(pre) {
    background-color: #f6f8fa;
    padding: 16px;
    overflow: auto;
    border-radius: 3px;
  }
  
  .preview-area :deep(blockquote) {
    margin: 0;
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
  }
  
  .preview-area :deep(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
  }
  
  .preview-area :deep(table th),
  .preview-area :deep(table td) {
    border: 1px solid #dfe2e5;
    padding: 6px 13px;
  }
  
  .preview-area :deep(table th) {
    background-color: #f6f8fa;
  }
  </style>