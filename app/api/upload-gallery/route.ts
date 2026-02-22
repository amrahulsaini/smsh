import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

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

    // Return success with the blob URL
    // Note: You'll need to manually add this to gallery.json or use a database
    return NextResponse.json({
      success: true,
      fileName,
      imageUrl: blob.url,
      message: "Image uploaded successfully! Add this entry to gallery.json: " + 
               JSON.stringify({ src: blob.url, title, category }),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
