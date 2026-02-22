"use client";

import { useState, useEffect, FormEvent } from "react";
import { Upload, Image as ImageIcon, Lock, CheckCircle, X } from "lucide-react";
import Link from "next/link";

export default function UploadGalleryPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Building");
  const [customCategory, setCustomCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  const categories = ["Building", "Reception", "Services", "Rooms", "Facilities", "Pharmacy", "Other", "Custom"];

  useEffect(() => {
    if (isAuthenticated) {
      loadGalleryImages();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === "smsh123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password!");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile || !title) {
      setError("Please fill all fields");
      return;
    }

    const finalCategory = category === "Custom" ? customCategory : category;
    if (!finalCategory) {
      setError("Please enter a category name");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("category", finalCategory);

    try {
      const response = await fetch("/api/upload-gallery", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadSuccess(true);
        setTitle("");
        setCategory("Building");
        setCustomCategory("");
        setImageFile(null);
        setPreviewUrl(null);
        
        // Show the entry to copy
        alert(`Image uploaded!\n\nCopy this and add to gallery.json:\n${JSON.stringify({ src: data.imageUrl, title, category: finalCategory }, null, 2)}`);
        
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const loadGalleryImages = async () => {
    try {
      const response = await fetch("/gallery.json");
      const data = await response.json();
      setGalleryImages(data);
    } catch (err) {
      console.error("Failed to load gallery:", err);
    }
  };

  const handleDelete = async (imageSrc: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const response = await fetch("/api/delete-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: imageSrc }),
      });

      const data = await response.json();

      if (response.ok) {
        loadGalleryImages();
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setError(data.error || "Delete failed");
      }
    } catch (err) {
      setError("Delete failed. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-2 border-border">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-foreground mb-2">
            Gallery Upload
          </h1>
          <p className="text-center text-slate-600 mb-6">
            Enter password to access upload panel
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                placeholder="Enter password"
              />
            </div>
            
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
                <X className="h-4 w-4" />
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              Login
            </button>
          </form>
          
          <Link
            href="/"
            className="block text-center text-sm text-primary hover:text-primary-hover mt-4"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-border">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Upload className="h-8 w-8 text-primary" />
              Upload Gallery Image
            </h1>
            <Link
              href="/gallery"
              className="text-sm text-primary hover:text-primary-hover font-semibold"
            >
              View Gallery →
            </Link>
          </div>

          {uploadSuccess && (
            <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">Image uploaded successfully!</span>
            </div>
          )}

          <div className="mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-semibold mb-1">⚠️ Note:</p>
            <p>After uploading, you'll need to manually copy the provided JSON entry and add it to <code className="bg-yellow-100 px-1 rounded">public/gallery.json</code> in your repository, then commit and push the changes.</p>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Image File
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageInput"
                />
                <label htmlFor="imageInput" className="cursor-pointer">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-lg"
                      />
                      <p className="text-sm text-slate-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <ImageIcon className="h-12 w-12 mx-auto text-slate-400" />
                      <p className="text-slate-600">Click to select image</p>
                      <p className="text-xs text-slate-400">PNG, JPG, JPEG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Image Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                placeholder="e.g., Hospital Reception Area"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Category Input */}
            {category === "Custom" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Custom Category Name
                </label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  placeholder="Enter custom category name"
                  required
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
                <X className="h-4 w-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Upload Image
                </>
              )}
            </button>
          </form>

          {/* Gallery Images List */}
          <div className="mt-12 border-t-2 border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <ImageIcon className="h-6 w-6 text-primary" />
              Current Gallery Images ({galleryImages.length})
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border-2 border-border bg-white shadow hover:shadow-lg transition-all">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <p className="font-semibold text-sm text-foreground truncate">{img.title}</p>
                    <p className="text-xs text-slate-600 mt-1">{img.category}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(img.src)}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                    aria-label="Delete image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            {galleryImages.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No images in gallery yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
