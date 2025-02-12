import WishlistModel from "@/db/models/WishlistModel";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const wishlist = await WishlistModel.findByUserId(new ObjectId(userId));
    return Response.json(wishlist);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { bookId } = body;
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const wishlist = await WishlistModel.addToWishlist({
      _id: new ObjectId(),
      userId: new ObjectId(userId),
      bookId: new ObjectId(bookId),
    });
    return Response.json(wishlist);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { bookId } = body;
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const wishlist = await WishlistModel.removeFromWishlist(
      new ObjectId(userId),
      new ObjectId(bookId)
    );
    return Response.json(wishlist);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
