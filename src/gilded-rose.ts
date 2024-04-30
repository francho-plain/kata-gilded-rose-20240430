export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
//.......
export enum SpecialItemNames { AgedBrie = 'Aged Brie', BackstagePasses = 'Backstage passes', Sulfuras = 'Sulfuras' }

export const MaxQualityValue = 50;
export const MinQualityValue = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const decreaseSellIn = (item: Item) => {
      if (item.name != SpecialItemNames.Sulfuras) {
        item.sellIn = item.sellIn - 1;
      }
    }

    const increaseQuality = (item: Item) => {
      if (item.quality < MaxQualityValue) {
        item.quality = item.quality + 1
      }
    }

    const decreaseQuality = (item: Item) => {
      if (item.quality > MinQualityValue && item.name != SpecialItemNames.Sulfuras) {
        item.quality = item.quality - 1
      }
    }

    this.items.forEach(item => {
      if (item.name == SpecialItemNames.AgedBrie) {
        increaseQuality(item)
      } else if (item.name == SpecialItemNames.BackstagePasses) {
        increaseQuality(item)
        if (item.sellIn < 11) {
          increaseQuality(item)
        }
        if (item.sellIn < 6) {
          increaseQuality(item)
        }
      } else {
        decreaseQuality(item);
      }

      decreaseSellIn(item);

      if (item.sellIn < 0) {
        if (item.name == SpecialItemNames.AgedBrie) {
          increaseQuality(item)
        } else if (item.name == SpecialItemNames.BackstagePasses) {
          item.quality = 0;
        } else {
          decreaseQuality(item);
        }
      }
    })

    return this.items;
  }
}