import { computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';

import { useElementBounding } from './useElementBounding';

export default function useRelativePosition(
  master: Ref,
  target: Ref,
  settings: {
    xPos: Ref<string>,
    yPos: Ref<string>,
    margin: Ref<number>
  },
): { top: ComputedRef<number>, left: ComputedRef<number>, update: () => void } {
  const {
    top: masterTop,
    left: masterLeft,
    bottom: masterBottom,
    right: masterRight,
    update,
  } = useElementBounding(master);
  const {
    width: targetWidth,
    height: targetHeight,
  } = useElementBounding(target);

  const fits = (orientation: string) => {
    switch (orientation) {
      case 'top':
        return masterTop.value - targetHeight.value - settings.margin.value > 0;
      case 'bottom':
        return masterBottom.value + targetHeight.value + settings.margin.value < window.innerHeight;
      case 'left':
        return masterLeft.value + targetWidth.value < window.innerWidth;
      case 'right':
        return masterRight.value - targetWidth.value > 0;
      default:
        return false;
    }
  };
  const getPos = (pref: string, alternative: string) => {
    if (!fits(pref) && fits(alternative)) {
      return alternative;
    }
    return pref;
  };
  const left = computed(() => {
    const xPosition = getPos(settings.xPos.value, settings.xPos.value === 'left' ? 'right' : 'left');
    return xPosition === 'left'
      ? masterLeft.value
      : masterRight.value - targetWidth.value;
  });
  const top = computed(() => {
    const yPosition = getPos(settings.yPos.value, settings.yPos.value === 'bottom' ? 'top' : 'bottom');
    return yPosition === 'bottom'
      ? masterBottom.value + settings.margin.value
      : masterTop.value - targetHeight.value - settings.margin.value;
  });
  return {
    left,
    top,
    update,
  };
}
