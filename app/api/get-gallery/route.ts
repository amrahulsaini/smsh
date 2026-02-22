import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    // Try to get from database first
    try {
      const { rows } = await sql`
        SELECT * FROM gallery_images ORDER BY created_at DESC
      `;
      
      if (rows.length > 0) {
        return NextResponse.json(rows.map(row => ({
          src: row.image_url,
          title: row.title,
          category: row.category,
        })));
      }
    } catch (dbError) {
      console.log("Database not available, using static gallery.json");
    }

    // Fallback to static gallery.json
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || "https://www.saharamultispecialityhospital.com"}/gallery.json`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Get gallery error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}
