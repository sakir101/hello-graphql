import { db } from "../../db.js";

export const resolvers = {
    Query: {
        products: () => db.products,
        product: (parent: any, args: { productId: string }, context: any) => {
            return db.products.find(pd => pd.id === args.productId)
        },

        categories: () => db.categories,
        category: (parent: any, args: { categoryId: string }, context: any) => {
            return db.categories.find(category => category.id === args.categoryId)
        }
    },

    Product: {
        category: ({ categoryId }, args: any, context: any) => {
            // console.log(parent, args, context)
            return db.categories.find(category => category.id === categoryId)
        },
        reviews: ({ id }, args: any, context: any) => {
            return db.reviews.filter(review => review.productId === id)
        }
    },

    Category: {
        products: (parent, args, context) => {
            return db.products.filter(product => product.categoryId === parent.id)
        }
    }
};