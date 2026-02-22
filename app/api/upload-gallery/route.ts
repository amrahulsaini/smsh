import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;

    if (!image || !title || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Generate filename - sanitize category name
    const timestamp = Date.now();
    const sanitizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const fileExtension = image.name.split(".").pop() || "jpg";
    const fileName = `${sanitizedCategory}-${timestamp}.${fileExtension}`;

    // Upload to Vercel Blob
    const blob = await put(`gall/${fileName}`, image, {
      access: "public",
    });

    // Try to save to database
    try {
      // Create table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS gallery_images (
          id SERIAL PRIMARY KEY,
          image_url TEXT NOT NULL,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      // Insert new image
      await sql`
        INSERT INTO gallery_images (image_url, title, category)
        VALUES (${blob.url}, ${title}, ${category})
      `;
      
      console.log("Image saved to database successfully");
    } catch (dbError: any) {
      console.error("Database error details:", dbError);
      console.error("Error name:", dbError.name);
      console.error("Error message:", dbError.message);
      
      // Even if database fails, image is uploaded to blob, so return success
      return NextResponse.json({
        success: true,
        fileName,
        imageUrl: blob.url,
        message: "Image uploaded successfully! (Database save failed - image stored in blob)",
        dbError: dbError.message,
      });
    }

    return NextResponse.json({
      success: true,
      fileName,
      imageUrl: blob.url,
      message: "Image uploaded and saved to database successfully!",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
