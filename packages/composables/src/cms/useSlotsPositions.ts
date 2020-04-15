import { computed, Ref } from "@vue/composition-api";
import { CmsSlot } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

/**
 * @alpha
 */
export interface UseSlotsPositions {
  leftSlot: Ref<Readonly<CmsSlot | undefined>>;
  rightSlot: Ref<Readonly<CmsSlot | undefined>>;
  centerSlot: Ref<Readonly<CmsSlot | undefined>>;
  centerLeftSlot: Ref<Readonly<CmsSlot | undefined>>;
  centerRightSlot: Ref<Readonly<CmsSlot | undefined>>;
  leftTopSlot: Ref<Readonly<CmsSlot | undefined>>;
  leftBottomSlot: Ref<Readonly<CmsSlot | undefined>>;
}

/**
 * @alpha
 */
export enum PositionType {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  CENTER_LEFT = "center-left",
  CENTER_RIGHT = "center-right",
  LEFT_TOP = "left-top",
  LEFT_BOTTOM = "left-bottom",
}

/**
 * @alpha
 */
export const useSlotsPositions = (slots: CmsSlot[]): UseSlotsPositions => {
  const findSlot = (positionType: PositionType): CmsSlot | undefined =>
    slots.find(({ slot }) => slot === positionType);

  const leftSlot = computed((): CmsSlot | undefined =>
    findSlot(PositionType.LEFT)
  );
  const rightSlot = computed((): CmsSlot | undefined =>
    findSlot(PositionType.RIGHT)
  );
  const centerSlot = computed((): CmsSlot | undefined =>
    findSlot(PositionType.CENTER)
  );
  const centerLeftSlot = computed((): CmsSlot | undefined =>
    findSlot(PositionType.CENTER_LEFT)
  );
  const centerRightSlot = computed((): CmsSlot | undefined =>
    findSlot(PositionType.CENTER_RIGHT)
  );
  const leftTopSlot = computed((): CmsSlot | undefined =>
    findSlot(PositionType.LEFT_TOP)
  );
  const leftBottomSlot = computed((): CmsSlot | undefined =>
    findSlot(PositionType.LEFT_BOTTOM)
  );

  return {
    leftSlot,
    rightSlot,
    centerSlot,
    centerLeftSlot,
    centerRightSlot,
    leftBottomSlot,
    leftTopSlot,
  };
};
