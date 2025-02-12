import BookModel from "@/db/models/BookModel";

export async function GET() {
  const books = await BookModel.getRandomBooks(10);
  return Response.json(books, { status: 200 });
}
