import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

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

    // Generate filename
    const timestamp = Date.now();
    const fileName = `${category.toLowerCase()}-${timestamp}.jpeg`;
    
    // Convert file to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/gall
    const filePath = join(process.cwd(), "public", "gall", fileName);
    await writeFile(filePath, buffer);

    // Update gallery data file
    const galleryDataPath = join(process.cwd(), "public", "gallery.json");
    let galleryData = [];
    
    try {
      const existingData = await readFile(galleryDataPath, "utf-8");
      galleryData = JSON.parse(existingData);
    } catch {
      // File doesn't exist, start with empty array
    }

    // Add new entry
    galleryData.push({
      src: `/gall/${fileName}`,
      title: title,
      category: category,
    });

    // Save updated gallery data
    await writeFile(galleryDataPath, JSON.stringify(galleryData, null, 2));

    return NextResponse.json({
      success: true,
      fileName,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
