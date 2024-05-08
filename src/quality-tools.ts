import { Item, SpecialItemNames } from "./gilded-rose";

export const MaxQualityValue = 50;
export const MinQualityValue = 0;

const addOneToQuality = (item: Item) => {
  if (item.quality === MaxQualityValue) {
    return
  }

  item.quality = item.quality + 1
}

const removeOneFromQuality = (item: Item) => {
  if (item.quality === MinQualityValue) {
    return
  }

  item.quality = item.quality - 1
}

const increaseQuality = (item: Item) => {
  if (item.name !== SpecialItemNames.AgedBrie && item.name !== SpecialItemNames.BackstagePasses) {
    return false
  }

  addOneToQuality(item)

  if (item.name === SpecialItemNames.AgedBrie && item.sellIn < 1) {
    addOneToQuality(item)
  } else if (item.name === SpecialItemNames.BackstagePasses) {
    if (item.sellIn < 11) {
      addOneToQuality(item)
    }
    if (item.sellIn < 6) {
      addOneToQuality(item)
    }
  }

  return true
}

const decreaseQuality = (item: Item) => {
  if (item.name === SpecialItemNames.AgedBrie || item.name === SpecialItemNames.BackstagePasses || item.name === SpecialItemNames.Sulfuras) {
    return false
  }

  removeOneFromQuality(item)
  if (item.sellIn < 1 || item.name === SpecialItemNames.Conjured) {
    removeOneFromQuality(item)
  }

  return true
}

const expireQuality = (item: Item) => {
  if (item.name !== SpecialItemNames.BackstagePasses || item.sellIn >= 1) {
    return false;
  }
  
  item.quality = 0;
  return true;
}

export const modifyQuality = (i: Item) => {
  const item = {...i}

  expireQuality(item) || decreaseQuality(item) || increaseQuality(item)

  return item
}


export const decreaseSellIn = (i: Item) => {
  const item = {...i}
  if (item.name === SpecialItemNames.Sulfuras) {
    return item
  }
  item.sellIn = item.sellIn - 1;
  return item
}


export default {}