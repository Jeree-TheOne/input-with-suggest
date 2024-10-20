import './assets/main.css'

import { createApp } from 'vue'
import { vClickOutside } from '@/directives/click-outside'
import App from './App.vue'

createApp(App).directive('click-outside', vClickOutside).mount('#app')
