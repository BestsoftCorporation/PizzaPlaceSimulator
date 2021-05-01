# PizzaPlaceSimulator

Order examle, post user contact, pizza(s) size(s), pizza(s) ingredient(s) id(s)
http://localhost:3000/order 
```json
{
    "firstName":"Marko",
    "lastName":"Stojkovic",
    "address":"Carigradska 15",
    "phone":"123400",
    "pizzas":[{"size":"Small","i":[{  
      "_id": "608c80c599992036350526d1"},{  
      "_id": "608c80c599992036350526d2"}
      ]},{"size":"Medium","i":[{  
      "_id": "608c80c599992036350526d4"},{  
      "_id": "608c80c599992036350526d5"}
      ]}
      ]
}
```

Check order example, post order id which you get after posting (creating) order
http://localhost:3000/checkOrder

```json
{
    "orderID": "608d4d4655830a312e3ad80c"
}
```

Cancel order example, post order id which you get after posting (creating) order
http://localhost:3000/cancelOrder

```json
{
    "orderID": "608d4d4655830a312e3ad80c"
}
```