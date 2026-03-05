# Gilded Rose
You start with a class GildedRose that updates the quality of different items in a warehouse.
The code is bad: big `if`-blocks, duplicated logic and edge cases everywhere.
The assignment is:
- Write tests first
- Refactor without changing the behavior
- Add a new item with its own rules

It is an exercise in *safe refactoring* and *design under constraints*.

## Domain Rules
### All items have:
- `sellIn` - number of days left to sell
- `quality` - quality of the item (0-50, with exceptions)

### Rules:
- Quality decreases with 1 per day.
- When `sellIn < 0` the quality decreases twice as fast.
- Quality is never negative.
- Quality is never above 50.

### Edge Cases:
- **Aged Brie** increases in quality the older it gets.
- **Backstage passes** increases in quality faster the closer the concert date is, but drops to 0 after the concert.
- **Sulfuras** never changes.
- **Conjured**(new item) decreases in quality twice as fast as regular items.

## Common architectures to aim for:
### Alternative 1: Polymorphism
One `ItemUpdater` per item type:
- `DefaultItemUpdater`
- `AgedBrieUpdater`
- `BackstagePassUpdater`
- `SulfurasUpdater`
- `ConjuredUpdater`
A factory mapping name -> updater.
### Alternative 2: Strategy + table
A table mapping name to strategy-object. Good if you want to avoid inheritance.
### Alternative 3: Functional style
Every item type have a function that takes an `Item` and returns a new.