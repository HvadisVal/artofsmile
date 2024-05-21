import { reactive } from 'vue';

export const bus = reactive({
  emit(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  on(event, callback) {
    document.addEventListener(event, callback);
  },
  off(event, callback) {
    document.removeEventListener(event, callback);
  }
});
