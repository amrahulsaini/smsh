import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { del } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const { src } = await request.json();

    if (!src) {
      return NextResponse.json(
        { error: "Missing image source" },
        { status: 400 }
      );
    }

    // Delete from database
    try {
      await sql`
        DELETE FROM gallery_images WHERE image_url = ${src}
      `;
    } catch (dbError) {
      console.error("Database error:", dbError);
    }

    // Try to delete from Vercel Blob if it's a blob URL
    if (src.includes("blob.vercel")) {
      try {
        await del(src);
      } catch (blobError) {
        console.error("Blob delete error:", blobError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
