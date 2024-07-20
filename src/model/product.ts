export type ProductModel = Record<string, any>

export const DefaultField = [
    "_id", 
    "profileId",
    "shopId",
    "price", 
    "name",
    "count",
    "fileIds",
    "categoryId", 
    "createAt", 
    "updateAt",
    "deleteAt",
]

export const ProductObjectDefaultField = {
    "_id": "_id",
    "profileId": "profileId",
    "shopId": "shopId",
    "price": "price",
    "name": "name",
    "categoryId": "categoryId",
    "createAt": "createAt",
    "updateAt": "updateAt",
    "deleteAt": "deleteAt",
    "detail": "detail",
}