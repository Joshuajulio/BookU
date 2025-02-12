import BookModel from "@/db/models/BookModel";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") || "0");
  const limit = parseInt(searchParams.get("limit") || "20");
  const query = searchParams.get("query") || "";

  const books = await BookModel.findAll(offset, limit, query);
  return Response.json(books);
}
