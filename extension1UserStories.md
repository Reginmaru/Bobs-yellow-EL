# Extension 1 User Stories

### User Story 1
```
As the manager of bobs bagels
I want to make a snazzy new menu
I want to add all my bagels to the menu
```


### User Story 2
```
As a customer
So that I can choose which bagel to buy
I want to see the available options and prices
```

### User Story 3
```
As the manager of bobs bagels
I no longer make a certain bagel
I want to remove that bagel from the menu
```
| Object | Properties | Message | Context | Output |
| - | - | - | - | - |
| Menu |  | removeItem(@Item) | succesfully remove item | @Array[items] |
|  |  |  | item type (i.e. SKU) not in menu in the first place | @String 'Cannot remove item that is not on the menu' |