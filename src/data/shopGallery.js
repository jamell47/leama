import { shop } from '../assets/shop'

/**
 * Every photo shipped in `src/assets/shop` (farm1 … farm26), labelled by
 * what the photo actually shows so the tile name always matches the image.
 */
export const SHOP_GALLERY = [
  { image: shop.layerHouse, name: 'Layer Hens', caption: 'Layer hens in a modern poultry house', tag: 'Poultry' },
  { image: shop.chickenCoop, name: 'Hens in a Coop', caption: 'Hens inside a wooden coop', tag: 'Poultry' },
  { image: shop.freeRangeFlock, name: 'Free-Range Flock', caption: 'Free-range chickens roaming on grass', tag: 'Poultry' },
  { image: shop.chickenTractor, name: 'Chicken Tractor', caption: 'Chickens in a mobile chicken tractor', tag: 'Poultry' },
  { image: shop.nestBoxes, name: 'Nest Boxes', caption: 'Layer hens at wooden nest boxes', tag: 'Poultry' },
  { image: shop.layerCages, name: 'Layer Cages', caption: 'Layer hens in battery cages', tag: 'Poultry' },
  { image: shop.layerEquipment, name: 'Layer Equipment', caption: 'Layer cage egg-production equipment', tag: 'Equipment' },
  { image: shop.poultryHousing, name: 'Poultry Housing', caption: 'Poultry housing under construction', tag: 'Equipment' },
  { image: shop.chickenHouse, name: 'Elevated Chicken Coop', caption: 'Elevated wooden chicken coop', tag: 'Equipment' },
  { image: shop.broilers, name: 'Broiler Chickens', caption: 'Broiler chickens', tag: 'Poultry' },
  { image: shop.broilerHouse, name: 'Broiler House', caption: 'Broilers in a deep-litter house', tag: 'Poultry' },
  { image: shop.eggs, name: 'Farm Fresh Eggs', caption: 'Eggs piled beside a hen', tag: 'Dairy & Eggs' },
  { image: shop.dairyCow, name: 'Dairy Cow', caption: 'Dairy cow grazing on pasture', tag: 'Dairy & Eggs' },
  { image: shop.dairyHerd, name: 'Dairy Herd', caption: 'Dairy cows resting in a shed', tag: 'Dairy & Eggs' },
  { image: shop.piggery, name: 'Piggery Pen', caption: 'Pigs in a piggery pen', tag: 'Livestock' },
  { image: shop.piglets, name: 'Piglets', caption: 'Piglets suckling a sow', tag: 'Livestock' },
  { image: shop.rabbitsCaged, name: 'Caged Rabbits', caption: 'Rabbits in a wire cage', tag: 'Livestock' },
  { image: shop.rabbitsHutch, name: 'Rabbit in a Hutch', caption: 'Rabbits in a hutch', tag: 'Livestock' },
  { image: shop.rabbitHutches, name: 'Rabbit Hutches', caption: 'Rows of rabbit hutches', tag: 'Livestock' },
  { image: shop.livestockCollage, name: 'Mixed Livestock', caption: 'Mixed livestock from the farm', tag: 'Livestock' },
  { image: shop.watermelons, name: 'Watermelons', caption: 'Fresh watermelons', tag: 'Produce' },
  { image: shop.watermelonsCrates, name: 'Watermelons in Crates', caption: 'Watermelons stacked in crates', tag: 'Produce' },
  { image: shop.potatoes, name: 'Fresh Potatoes', caption: 'Potatoes packed in nets', tag: 'Produce' },
  { image: shop.onions, name: 'Red Onions', caption: 'Red onions in a basin', tag: 'Produce' },
  { image: shop.greenhouseTomatoes, name: 'Greenhouse Tomatoes', caption: 'Tomatoes growing in a greenhouse', tag: 'Produce' },
  { image: shop.cabbage, name: 'Cabbage Field', caption: 'Cabbage growing in the field', tag: 'Produce' },
]

export default SHOP_GALLERY