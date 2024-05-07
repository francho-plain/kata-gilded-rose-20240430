import { decreaseSellIn, modifyQuality } from "./quality-tools";

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
export enum SpecialItemNames { AgedBrie = 'Aged Brie', BackstagePasses = 'Backstage passes', Sulfuras = 'Sulfuras', Conjured = 'Conjured' }

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    return this.items = this.items.map(item => decreaseSellIn(modifyQuality(item)))
  }
}