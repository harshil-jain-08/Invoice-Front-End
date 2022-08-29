export const itemsBeforeCreateNewItem =
  [
    {
      id: 1,
      name: "dsfasd",
      description: "nnn",
      price: 23,
      created_at: 1660907003118,
      updated_at: 1660907003118,
    },
    {
      id: 2,
      name: "nnnkm",
      description: "n m,",
      price: 313,
      created_at: 1660907020618,
      updated_at: 1660907020618,
    }
  ]

export const itemToAdd = {
  id: 3,
  name: "green",
  description: "leaf",
  price: 45,
  created_at: 1660907020618,
  updated_at: 1660907020618,
};

export const itemsAfterCreateNewItem =
  [
    ...itemsBeforeCreateNewItem,
    itemToAdd,
  ]
