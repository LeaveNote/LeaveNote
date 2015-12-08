import App from './vue-components/app.vue'

let app = new App()
// TODO: `$appendTo()` after `DOMContentLoaded` event
app.$mount().$appendTo('body')
