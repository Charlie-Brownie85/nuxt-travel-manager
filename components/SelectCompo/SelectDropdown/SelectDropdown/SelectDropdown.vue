<script setup lang="ts">
import { onClickOutside, useEventListener } from '@vueuse/core';

import { getScrollableParent } from '@/utils';

import useRelativePosition from '@/composables/useRelativePosition';

export interface Props {
  modelValue?: boolean,
  xPosition?: 'left' | 'right',
  yPosition?: 'top' | 'bottom',
  margin?: number,
  disabled?: boolean,
  zIndexMenu?: number | string,
  closeOnScroll?: boolean,
  closeOnOutside?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  xPosition: 'left',
  yPosition: 'bottom',
  margin: 4,
  disabled: false,
  zIndexMenu: 9999,
  closeOnScroll: false,
  closeOnOutside: true,
});

const emit = defineEmits(['open', 'close', 'update:modelValue']);

const open = typeof props.modelValue === 'undefined'
  ? ref(false)
  : computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

const wrapper: Ref<HTMLElement | null> = ref(null);
const menu = ref(null);

const {
  top: menuTop,
  left: menuLeft,
  update: updateMenuPosition,
} = useRelativePosition(
  wrapper,
  menu,
  {
    xPos: toRef(props, 'xPosition'),
    yPos: toRef(props, 'yPosition'),
    margin: toRef(props, 'margin'),
  },
);

const openMenu = () => {
  open.value = true;
  updateMenuPosition();
  emit('open');
};

const closeMenu = () => {
  open.value = false;
  emit('close');
};

const toggleMenu = () => {
  if (open.value) {
    closeMenu();
  } else {
    openMenu();
  }
};

onClickOutside(menu, (ev) => {
  if (wrapper.value && !wrapper.value.contains(ev.target as Node) && props.closeOnOutside) {
    closeMenu();
  }
});

onMounted(() => {
  if (props.closeOnScroll && wrapper.value) {
    const scrollableParent = getScrollableParent(wrapper.value);
    if (scrollableParent) useEventListener(scrollableParent, 'scroll', closeMenu);
  }
});
</script>

<template>
  <div
    ref="wrapper"
    :class="['relative', { 'pointer-events-none': disabled }]"
  >
    <div
      data-testid="openbtn"
      @click.stop="toggleMenu"
    >
      <slot
        name="btn"
        :is-open="open"
        :open-menu="openMenu"
        :close-menu="closeMenu"
      />
    </div>
    <Teleport to="body">
      <transition :name="yPosition === 'bottom' ? 'slidemenu-bottom' : 'slidemenu-top'">
        <div
          v-if="open"
          ref="menu"
          data-testid="menu"
          class="fixed dropdown__menu"
          :style="{ left: `${menuLeft}px`, top: `${menuTop}px`, zIndex: Number(zIndexMenu) }"
        >
          <slot
            name="menu"
            :close-menu="closeMenu"
          />
        </div>
      </transition>
    </Teleport>
  </div>
</template>
