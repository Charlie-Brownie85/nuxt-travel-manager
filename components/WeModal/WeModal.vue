<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<{
  contentClasses?: string,
  clickOutside?: boolean,
  showCloseBtn?: boolean,
}>(), {
  contentClasses: '',
  clickOutside: true,
  showCloseBtn: true,
});

const model = defineModel<boolean>({ default: true });

const scrollLock = useScrollLock(document.querySelector('html'));

const close = () => {
  model.value = false;
};

onKeyStroke('Escape', (e) => {
  e.preventDefault();
  close();
});

watch(model, (value) => {
  if(value) {
    scrollLock.value = true;
  } else {
    scrollLock.value = false;
  }
}, { immediate: true });

onBeforeUnmount(() => {
  scrollLock.value = false;
});
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="model"
        :class="[
          'fixed inset-0 flex items-center justify-center bg-base-900 bg-opacity-50 we-modal overscroll-y-auto p-8',
          $attrs.class,
          { 'cursor-pointer': clickOutside },
        ]"
        tabindex="0"
        data-testid="mainEl"
        @click.self="() => {
          if (clickOutside) close()
        }"
        @keydown.esc="() => {
          if (clickOutside) close()
        }"
      >
        <div
          class="bg-white shadow rounded-lg we-modal__window"
          :class="['we-modal__window p-8 pt-10 shadow w-full relative cursor-auto initial:max-w-2xl', contentClasses]"
          data-testid="modalWindow"
        >
          <button
            v-if="showCloseBtn"
            class="!absolute !p-1 z-10 top-2 right-2 cursor-pointer"
            aria-label="close"
            data-testid="closeBtn"
            @click="close"
          >
            <v-icon size="small">mdi-close</v-icon>
          </button>
          <div data-testid="content">
            <slot
              name="content"
              :close="close"
            />
          </div>
          <div
            v-if="!!$slots.actions"
            class="-mb-2"
            data-testid="actions"
          >
            <hr class="mt-8 mb-5 border-0 border-t border-base-400">
            <div class="flex justify-end space-x-6">
              <slot
                name="actions"
                :close="close"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="postcss" scoped>
.we-modal {
  z-index: 50;
}
.fade-enter-from .we-modal__window,
.fade-leave-to .we-modal__window {
  transform: scale(0.9);
}
.fade-enter-active .we-modal__window,
.fade-leave-active .we-modal__window {
  transition: all 0.5s ease;
}
</style>