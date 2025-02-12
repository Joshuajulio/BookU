import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";

export type Book = {
  _id: ObjectId;
  title: string;
  image: string;
  slug: string;
  author: string;
  final_price: number;
  slice_price: number;
  discount: number;
  isbn: string;
  category: string;
  specifications: BookSpecification;
};

export type BookSpecification = {
  deskripsi: string;
  penerbit: string;
  tanggal_terbit: string;
  halaman: string;
  bahasa: string;
  panjang: string;
  lebar: string;
  berat: string;
};

export default class BookModel {
  static getCollection() {
    const db = getDb();
    return db.collection<Book>("books");
  }

  static async findById(id: ObjectId) {
    const collection = this.getCollection();
    const book = await collection.findOne({ _id: id });
    return book;
  }

  static async findAll(offset: number = 0, limit: number = 20, query?: string) {
    const collection = this.getCollection();
    if (!query) {
      const books = await collection.find().skip(offset).limit(limit).toArray();
      return books;
    }
    const books = await collection
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { author: { $regex: query, $options: "i" } },
          { isbn: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      })
      .skip(offset)
      .limit(limit)
      .toArray();
    return books;
  }

  static async findBySlug(slug: string) {
    const collection = this.getCollection();
    const book = await collection.findOne({ slug });
    return book;
  }

  static async getRandomBooks(limit: number) {
    const collection = this.getCollection();
    const books = await collection
      .aggregate([{ $sample: { size: limit } }])
      .toArray();
    return books;
  }
}
