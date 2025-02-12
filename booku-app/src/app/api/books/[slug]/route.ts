import BookModel from "@/db/models/BookModel";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: Params) {
  const { slug } = await params;
  const book = await BookModel.findBySlug(slug);
  return Response.json(book, { status: 200 });
}
