import type { MaybeElementRef } from '@vueuse/core';
import debounce from 'lodash/debounce';

export function useElementBounding(target: MaybeElementRef) {
  const height = ref(0);
  const bottom = ref(0);
  const left = ref(0);
  const right = ref(0);
  const top = ref(0);
  const width = ref(0);
  const x = ref(0);
  const y = ref(0);

  const update = debounce(() => {
    const element = unref(target) as HTMLElement | SVGElement;
    if (!element) return;
    const boundingRect = element.getBoundingClientRect();

    height.value = boundingRect.height;
    bottom.value = boundingRect.bottom;
    left.value = boundingRect.left;
    right.value = boundingRect.right;
    top.value = boundingRect.top;
    width.value = boundingRect.width;
    x.value = boundingRect.x;
    y.value = boundingRect.y;
  }, 100);

  onMounted(() => {
    update();
    window.addEventListener('resize', update);
    document.addEventListener('scroll', update);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', update);
    document.removeEventListener('scroll', update);
    update.cancel();
  });

  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update,
  };
}
