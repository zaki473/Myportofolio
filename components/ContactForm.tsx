"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "62758110-d0ce-4340-9a25-2efc2a93b482", // We can use Web3Forms access key. Zaki can replace this if needed.
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="xp-inset text-center p-6">
        <div className="text-5xl mb-3">✅</div>
        <div className="text-[#0058A8] font-bold text-[14px] font-[Tahoma,sans-serif]">
          Pesan terkirim!
        </div>
        <div className="text-[11px] text-gray-600 mt-2 font-[Tahoma,sans-serif]">
          Terima kasih sudah menghubungi saya. Pesan telah dikirim ke email saya dan saya akan membalas secepatnya!
        </div>
        <button
          className="xp-btn mt-4"
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", message: "" });
          }}
        >
          Kirim Lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Contact Info */}
      <div className="xp-inset mb-2 p-2">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] font-[Tahoma,sans-serif]">
          <div className="xp-info-row flex items-center gap-1.5">
            <span>✉️</span>
            <a href="mailto:jakiathallah@gmail.com" className="text-[#0058A8] hover:underline truncate">
              jakiathallah@gmail.com
            </a>
          </div>
          <div className="xp-info-row flex items-center gap-1.5">
            <span>🐙</span>
            <a href="https://github.com/zaki473" target="_blank" rel="noreferrer" className="text-[#0058A8] hover:underline truncate">
              github.com/zaki473
            </a>
          </div>
          <div className="xp-info-row flex items-center gap-1.5">
            <span>💼</span>
            <a href="https://www.linkedin.com/in/muhammad-zaki-athallah/" target="_blank" rel="noreferrer" className="text-[#0058A8] hover:underline truncate">
              LinkedIn Profile
            </a>
          </div>
          <div className="xp-info-row flex items-center gap-1.5">
            <span>📍</span>
            <span className="text-gray-800 truncate">Malang, Indonesia</span>
          </div>
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-400 text-red-700 text-[11px] p-2 font-[Tahoma,sans-serif]">
          ⚠️ Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung ke email.
        </div>
      )}

      <div>
        <label className="block text-[11px] font-[Tahoma,sans-serif] mb-1">Nama:</label>
        <input
          type="text"
          required
          disabled={status === "sending"}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full h-[22px] px-2 text-[11px] font-[Tahoma,sans-serif] bg-white border border-gray-600 outline-none focus:border-[#316AC5] disabled:bg-gray-100"
          style={{ boxShadow: "inset 1px 1px #808080" }}
        />
      </div>
      <div>
        <label className="block text-[11px] font-[Tahoma,sans-serif] mb-1">Email:</label>
        <input
          type="email"
          required
          disabled={status === "sending"}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full h-[22px] px-2 text-[11px] font-[Tahoma,sans-serif] bg-white border border-gray-600 outline-none focus:border-[#316AC5] disabled:bg-gray-100"
          style={{ boxShadow: "inset 1px 1px #808080" }}
        />
      </div>
      <div>
        <label className="block text-[11px] font-[Tahoma,sans-serif] mb-1">Pesan:</label>
        <textarea
          required
          rows={5}
          disabled={status === "sending"}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-2 py-1 text-[11px] font-[Tahoma,sans-serif] bg-white border border-gray-600 outline-none focus:border-[#316AC5] resize-none disabled:bg-gray-100"
          style={{ boxShadow: "inset 1px 1px #808080" }}
        />
      </div>
      <div className="flex justify-end gap-2">
        <button type="reset" disabled={status === "sending"} className="xp-btn">Batal</button>
        <button
          type="submit"
          disabled={status === "sending"}
          className="xp-btn bg-[#316AC5] text-white border-[#1a4a9a] disabled:opacity-50"
        >
          {status === "sending" ? "⏳ Mengirim..." : "✉️ Kirim Pesan"}
        </button>
      </div>
    </form>
  );
}