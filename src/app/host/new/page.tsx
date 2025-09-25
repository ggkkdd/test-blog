"use client";

import { useState } from "react";

export default function NewListingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(10000);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrls, setImageUrls] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          city,
          country,
          address,
          imageUrls: imageUrls.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create listing");
      }
      window.location.href = "/";
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container mx-auto px-5 py-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Host your home</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="w-full border rounded px-3 py-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <div className="grid grid-cols-2 gap-3">
          <input className="w-full border rounded px-3 py-2" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          <input className="w-full border rounded px-3 py-2" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <input className="w-full border rounded px-3 py-2" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input className="w-full border rounded px-3 py-2" type="number" min={0} placeholder="Price (cents)" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        <input className="w-full border rounded px-3 py-2" placeholder="Image URLs (comma separated)" value={imageUrls} onChange={(e) => setImageUrls(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-black text-white py-2 px-4 rounded disabled:opacity-50" disabled={saving}>{saving ? "Creating..." : "Create listing"}</button>
      </form>
    </div>
  );
}