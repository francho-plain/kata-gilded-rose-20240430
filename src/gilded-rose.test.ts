import { GildedRose, Item, MaxQualityValue, MinQualityValue, SpecialItemNames } from "./gilded-rose";

const anyItemName = 'foo';

describe('Gilded Rose', () => {
  it.each([
    ['decreases quality and sellIn', { name: anyItemName, sellIn: 1, quality: 2 }, {name: anyItemName, sellIn: 0, quality: 1}],
    ['Once the sell by date has passed, Quality degrades twice as fast', { name: anyItemName, sellIn: 0, quality: 4 }, {name: anyItemName, sellIn: -1, quality: 2}],
    ['Aged Brie actually increases in Quality the older it gets', { name: SpecialItemNames.AgedBrie, sellIn: 1, quality: 2 }, {name: SpecialItemNames.AgedBrie, sellIn: 0, quality: 3}],
    ['The Quality of an item is never more than 50', { name: SpecialItemNames.AgedBrie, sellIn: 1, quality: MaxQualityValue }, {name: SpecialItemNames.AgedBrie, sellIn: 0, quality: 50}],
    ['Sulfuras, being a legendary item, never has to be sold or decreases in Quality', { name: SpecialItemNames.Sulfuras, sellIn: 1, quality: MaxQualityValue }, {name: SpecialItemNames.Sulfuras, sellIn: 1, quality: 50}],
    ['Backstage passes, like aged brie, increases in Quality as its SellIn value approaches', { name: SpecialItemNames.BackstagePasses, sellIn: 11, quality: 2 }, {name: SpecialItemNames.BackstagePasses, sellIn: 10, quality: 3}],
    ['Backstage passes Quality increases by 2 when there are 10 days or less', { name: SpecialItemNames.BackstagePasses, sellIn: 10, quality: 2 }, {name: SpecialItemNames.BackstagePasses, sellIn: 9, quality: 4}],
    ['Backstage passes Quality increases by 3 when there are 5 days or less', { name: SpecialItemNames.BackstagePasses, sellIn: 5, quality: 2 }, {name: SpecialItemNames.BackstagePasses, sellIn: 4, quality: 5}],
    ['Backstage passes Quality drops to 0 after the concert', { name: SpecialItemNames.BackstagePasses, sellIn: 0, quality: 2 }, {name: SpecialItemNames.BackstagePasses, sellIn: -1, quality: 0}],
    ['The Quality of an item is never negative', { name: anyItemName, sellIn: 1, quality: MinQualityValue }, {name: anyItemName, sellIn: 0, quality: 0}],
    ['**(not in Readme)Aged Brie actually increases in Quality by 2 when sellIn is negative', { name: SpecialItemNames.AgedBrie, sellIn: -1, quality: 2 }, {name: SpecialItemNames.AgedBrie, sellIn: -2, quality: 4}],
  ])
  ('%s', (_, actualItem, expectedItem) => {
    const item = new Item(actualItem.name, actualItem.sellIn, actualItem.quality);
    const gildedRose = new GildedRose([item]);
    const resultItem = gildedRose.updateQuality().shift();
    expect(resultItem).toEqual(expectedItem)
  });
});