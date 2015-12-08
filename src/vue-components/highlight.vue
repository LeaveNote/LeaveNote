<script lang="babel">
import Vue from 'vue'

export default Vue.extend({
  props: {
    page: {type: String, required: true, twoWay: true},
    selectors: {type: Array, required: true, twoWay: true},
    content: {type: String, required: true, twoWay: true},
  },
})
</script>

<template>
<div>
  {{content}}
</div>
</template>
