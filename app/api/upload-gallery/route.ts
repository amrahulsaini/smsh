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

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Image upload not configured. Please add BLOB_READ_WRITE_TOKEN environment variable in Vercel." },
        { status: 500 }
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

    // Get existing gallery data
    const galleryResponse = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/get-gallery`);
    let galleryData = [];
    if (galleryResponse.ok) {
      galleryData = await galleryResponse.json();
    }

    // Add new entry
    const newEntry = {
      src: blob.url,
      title: title,
      category: category,
    };
    
    galleryData.push(newEntry);

    // Save updated gallery data
    await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/save-gallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(galleryData),
    });

    return NextResponse.json({
      success: true,
      fileName,
      imageUrl: blob.url,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
