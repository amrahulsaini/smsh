import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    let allImages: any[] = [];

    // Get images from static gallery.json first
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "https://www.saharamultispecialityhospital.com"}/gallery.json`);
      if (response.ok) {
        const staticImages = await response.json();
        allImages = [...staticImages];
      }
    } catch (jsonError) {
      console.log("Could not load gallery.json, continuing with database only");
    }

    // Add images from database
    try {
      const { rows } = await sql`
        SELECT * FROM gallery_images ORDER BY created_at DESC
      `;
      
      const dbImages = rows.map(row => ({
        src: row.image_url,
        title: row.title,
        category: row.category,
      }));
      
      // Add database images to the list
      allImages = [...allImages, ...dbImages];
    } catch (dbError) {
      console.log("Database not available, using static gallery.json only");
    }

    return NextResponse.json(allImages);
  } catch (error) {
    console.error("Get gallery error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}
