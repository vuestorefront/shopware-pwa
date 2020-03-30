import { computed, Ref } from "@vue/composition-api";
import { CmsSlot } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

export interface UseSlotsPositions {
  leftSlot: Ref<Readonly<CmsSlot | undefined>>;
  rightSlot: Ref<Readonly<CmsSlot | undefined>>;
  centerSlot: Ref<Readonly<CmsSlot | undefined>>;
  centerLeftSlot: Ref<Readonly<CmsSlot | undefined>>;
  centerRightSlot: Ref<Readonly<CmsSlot | undefined>>;
}

export enum PositionType {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  CENTER_LEFT = "center-left",
  CENTER_RIGHT = "center-right"
}

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

  return {
    leftSlot,
    rightSlot,
    centerSlot,
    centerLeftSlot,
    centerRightSlot
  };
};
