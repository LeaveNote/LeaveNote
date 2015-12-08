<script lang="babel">
import Vue from 'vue'
import Toolbar from './toolbar.vue'
import Highlight from './highlight.vue'
import onHighlightText from '../vue-directives/on-highlight-text'
import {fetchHighlights} from '../store'

export default Vue.extend({
  data: {
    highlights: [],
    notes: [],
  },
  components: {
    Toolbar,
    Highlight,
  },
  directives: {
    onHighlightText,
  },
  created () {
    fetchHighlights()
    .then((highlights) => {
      this.highlights = highlights
    })
    .done()
  },
  methods: {
    handleHighlightText (highlights) {
      this.highlights = this.highlights.concat(highlights)
    },
  },
})
</script>

<template>
<div class="leave-note"
  on-highlight-text="{
    containerElement: $el.ownerDocument.body,
    handleHighlightText,
  }">
  <Toolbar></Toolbar>
  <Highlight
    v-for="highlight in highlights"
    v-bind:page="highlight.page"
    v-bind:selectors="highlight.selectors"
    v-bind:content="highlight.content">
  </Highlight>
</div>
</template>
