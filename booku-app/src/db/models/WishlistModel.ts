import { getDb } from "../config/mongodb";
import BookModel, { Book } from "./BookModel";
import { ObjectId } from "mongodb";

export type Wishlist = {
  _id: ObjectId;
  userId: ObjectId;
  bookId: ObjectId;
};

export type WishlistWithBook = Wishlist & {
  book: Book;
};

export default class WishlistModel {
  static getCollection() {
    const db = getDb();
    return db.collection<Wishlist>("wishlists");
  }

  static async findByUserId(userId: ObjectId) {
    const collection = this.getCollection();
    const wishlists = await collection.find({ userId }).toArray();
    const wishlistsWithBook = await Promise.all(
      wishlists.map(async (wishlist) => {
        const book = await BookModel.findById(wishlist.bookId);
        return {
          ...wishlist,
          book,
        };
      })
    );
    return wishlistsWithBook;
  }

  //check if book is in wishlist
  static async isInWishlist(userId: ObjectId, productId: ObjectId) {
    const collection = this.getCollection();
    const wishlist = await collection.findOne({ userId, productId });
    return wishlist ? true : false;
  }

  //add to wishlist
  static async addToWishlist(payload: Wishlist) {
    const collection = this.getCollection();
    const wishlist = await collection.findOne({
      userId: payload.userId,
      productId: payload.bookId,
    });
    if (wishlist) {
      return wishlist;
    }
    const result = await collection.insertOne(payload);
    return result;
  }

  //remove from wishlist
  static async removeFromWishlist(userId: ObjectId, bookId: ObjectId) {
    const collection = this.getCollection();
    const wishlist = await collection.findOne({ userId, bookId });
    if (wishlist) {
      await collection.deleteOne({ userId, bookId });
      return wishlist;
    }
    return null;
  }
}
