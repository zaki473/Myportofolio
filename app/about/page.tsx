"use client";

import Desktop from "@/components/Desktop";
import Window from "@/components/Window";

// Silakan ganti URL di bawah ini dengan URL foto ImageKit Anda
const PROFILE_IMAGE = "https://ik.imagekit.io/p27ub3udc/WhatsApp%20Image%202026-06-16%20at%2014.47.23.jpeg";

export default function AboutPage() {
  return (
    <Desktop>
      <div className="ml-20 p-4">
        <Window
          title="About Me — Zaki"
          icon="👤"
          className="max-w-2xl"
          defaultPos={{ x: 120, y: 30 }}
          statusLeft="Information Technology Student"
          statusRight="Indonesia"
        >
          <div className="p-5 font-[Tahoma,sans-serif]">
            {/* Header */}
            <div className="flex gap-5 mb-5">
              <div
                className="w-24 h-24 flex items-center justify-center border-2 border-gray-500 flex-shrink-0 bg-[#d4e8ff] overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PROFILE_IMAGE}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = "<span class='text-6xl'>👦</span>";
                      parent.className += " flex items-center justify-center";
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0058A8]">Muhammad Zaki Athallah</h1>
                <p className="text-gray-600 text-sm">
                  Teknologi Informasi Student | Web & Mobile Developer | AI Enthusiast
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {["Web Dev", "Java Dev", "IoT", "Mobile Dev", "AI"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#316AC5] text-white text-[10px] px-2 py-[2px] rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Biodata */}
            <div className="xp-inset mb-4">
              <h2 className="text-[#0058A8] font-bold mb-2 text-sm">
                📋 Biodata
              </h2>
              <table className="w-full text-[11px]">
                <tbody>
                  {[
                    ["Nama", "Muhammad Zaki Athallah"],
                    ["Jurusan", "Teknologi Informasi"],
                    ["Universitas", "Universitas Brawijaya"],
                    ["Email", "jakiathallah@gmail.com"],
                    ["GitHub", "https://github.com/zaki473"],
                    ["LinkedIn", "https://www.linkedin.com/in/muhammad-zaki-athallah/"],
                    ["Lokasi", "Indonesia, Jawa Timur, Kota Malang"],
                    ["Status", "Aktif Kuliah & Open to Freelance"],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-200">
                      <td className="py-1 pr-4 text-gray-600 font-semibold w-28">
                        {k}
                      </td>
                      <td className="py-1 text-gray-800">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tentang Saya */}
            <div className="xp-inset mb-4">
              <h2 className="text-[#0058A8] font-bold mb-2 text-sm">
                💬 Tentang Saya
              </h2>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                Mahasiswa Teknologi Informasi dengan minat kuat di bidang Web Development dan penerapan teknologi machine learning sederhana. Memiliki kemampuan membangun aplikasi web menggunakan HTML, CSS, JavaScript, Laravel, dan Next.js,
                serta pengembangan aplikasi mobile dengan Flutter. Berpengalaman mengembangkan sistem rekomendasi wisata berbasis AI menggunakan dataset dari Kaggle, menunjukkan ketertarikan pada penerapan data science dalam proyek nyata.
                Aktif dalam organisasi kemahasiswaan (BEM Fakultas) serta memiliki pengalaman mengerjakan proyek joki aplikasi dan berbagai tugas akademik yang memperkuat kemampuan problem-solving dan kerja dengan deadline.
                Didukung pula dengan pengalaman kerja lintas bidang sebagai resepsionis freelance pada moment high-season dan acara wedding,
                yang melatih kemampuan komunikasi sosial, pelayanan, dan adaptasi cepat di lingkungan kerja yang dinamis. Cepat belajar, fleksibel, dan terbuka terhadap tantangan baik di bidang teknis maupun non-teknis.
              </p>
            </div>

            {/* Fokus */}
            <div className="xp-inset">
              <h2 className="text-[#0058A8] font-bold mb-2 text-sm">
                🎯 Fokus Saat Ini
              </h2>
              <ul className="text-[11px] text-gray-700 list-disc list-inside space-y-1">
                <li>Mengembangkan full-stack web app dengan Next.js & Laravel</li>
                <li>Mendalami IoT dengan ESP32 dan Firebase</li>
                <li>Mempersiapkan diri untuk kontribusi pada open-source projects</li>
                <li>Mencari kesempatan magang di bidang Web/Mobile Development</li>
              </ul>
            </div>
          </div>
        </Window>
      </div>
    </Desktop>
  );
}