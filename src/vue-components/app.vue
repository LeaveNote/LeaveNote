<script lang="babel">
import Vue from 'vue'
import Toolbar from './toolbar.vue'
import Highlight from './highlight.vue'
import onHighlightText from '../vue-directives/on-highlight-text'
import {fetchHighlights} from '../store'

export default Vue.extend({
  data () {
    return {
      highlights: [],
      notes: [],
    }
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
      
    },
  },
})
</script>

<template>
<div class="leave-note"
  v-bind:scopeElement="$el.ownerDocument.body"
  v-bind:handleHighlightText="handleHighlightText"
  v-on-highlight-text>
  <Toolbar></Toolbar>
  <Highlight
    v-for="highlight in highlights"
    v-bind:page.sync="highlight.page"
    v-bind:selectors.sync="highlight.selectors"
    v-bind:content.sync="highlight.content">
  </Highlight>
</div>
</template>
