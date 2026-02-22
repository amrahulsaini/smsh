import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, unlink } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { src } = await request.json();

    if (!src) {
      return NextResponse.json(
        { error: "Missing image source" },
        { status: 400 }
      );
    }

    // Read gallery data
    const galleryDataPath = join(process.cwd(), "public", "gallery.json");
    const existingData = await readFile(galleryDataPath, "utf-8");
    let galleryData = JSON.parse(existingData);

    // Find and remove the image entry
    const imageToDelete = galleryData.find((img: any) => img.src === src);
    if (!imageToDelete) {
      return NextResponse.json(
        { error: "Image not found in gallery" },
        { status: 404 }
      );
    }

    galleryData = galleryData.filter((img: any) => img.src !== src);

    // Delete the physical file
    const fileName = src.replace("/gall/", "");
    const filePath = join(process.cwd(), "public", "gall", fileName);
    
    try {
      await unlink(filePath);
    } catch (err) {
      console.error("Failed to delete file:", err);
      // Continue even if file deletion fails
    }

    // Save updated gallery data
    await writeFile(galleryDataPath, JSON.stringify(galleryData, null, 2));

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
