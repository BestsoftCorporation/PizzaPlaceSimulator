# PizzaPlaceSimulator
## Project By Marko Stojkovic (software.developer@hotmail.rs)

# Order examle, post user contact, pizza(s) size(s), pizza(s) ingredient(s) id(s)
## http://localhost:3000/order 
## Method: post
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

# Check order example, post order id which you get after posting (creating) order
## http://localhost:3000/checkOrder
## Method: post
```json
{
    "orderID": "608d4d4655830a312e3ad80c"
}
```

#Cancel order example, post order id which you get after posting (creating) order
## http://localhost:3000/cancelOrder
## Method: delete

```json
{
    "orderID": "608d4d4655830a312e3ad80c"
}
```

# Admin, login, (take token)

## http://localhost:3000/admin/login
## Method: post
### use "password123" to login (to get token)

```json
{
    "password":"password123"
}
```
# Get total money earned

## http://localhost:3000/admin/totalMoney
## Method: get
### Put token from login in header with "token" as key and value (token from login)


# Get application time

## http://localhost:3000/admin/time
## Method: get
### Put token from login in header with "token" as key and value (token from login)

# Get history orders

## http://localhost:3000/admin/orderHistory
## Method: get
### Put token from login in header with "token" as key and value (token from login)

