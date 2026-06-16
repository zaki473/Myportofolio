"use client";

import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import { useState } from "react";

const ORGANISASI = [
  {
    role: "Badan Pengurus Harian (BPH) – Dirjen. Teknologi Komunikasi",
    org: "BEM Fakultas Vokasi Universitas Brawijaya",
    period: "Februari 2025 – Desember 2025",
    icon: "💻",
    points: [
      "Bertanggung jawab dan mengkoordinasikan staff dalam divisi.",
      "Membuat dan mengelola website BEM.",
      "Memproduksi video profile organisasi.",
      "Melaksanakan program kerja divisi sesuai rencana yang ditetapkan."
    ]
  },
  {
    role: "Staff Magang – Divisi Design",
    org: "BEM Fakultas Vokasi Universitas Brawijaya",
    period: "September 2024 – Desember 2024",
    icon: "🎨",
    points: [
      "Membuat desain grafis sesuai permintaan (request) dari berbagai kebutuhan organisasi.",
      "Berkoordinasi dan berkomunikasi dengan kementerian/divisi lain terkait kebutuhan desain.",
      "Mendukung publikasi visual untuk kegiatan dan program kerja BEM."
    ]
  },
  {
    role: "Staff",
    org: "UKM FUTSAL Fakultas Vokasi Universitas Brawijaya",
    period: "September 2024 – Maret 2026",
    icon: "⚽",
    points: [
      "Aktif mengikuti kegiatan latihan dan kompetisi futsal tingkat universitas.",
      "Membangun kemampuan kerja sama tim, komunikasi, dan manajemen waktu antara akademik dan non-akademik."
    ]
  }
];

const KEPANITIAAN_MAGANG = [
  { event: "Brodi (Podcast Obrolan Dalam Negeri)", role: "Staff Perlengkapan" },
  { event: "Dedikarya (Malam Apresiasi)", role: "Coordinator Design Dokumentasi dan Media" },
  { event: "Creanomic (Festival Karya dan Ajang Perlombaan)", role: "Staff Design Dokumentasi dan Media" },
  { event: "BAT (Buku Akhir Tahun / Yearbook)", role: "Wakil Ketua Pelaksana" },
  { event: "Demisioner (Perpisahan Organisasi)", role: "Ketua Pelaksana" }
];

const KEPANITIAAN_BPH = [
  { event: "Launching Kabinet", role: "Steering Committee / Pengurus" },
  { event: "Produksi Website", role: "Steering Committee / Pengurus" },
  { event: "Workshop Kemenbiro (Melatih Design setiap Kemenbiro)", role: "Steering Committee / Pengurus" },
  { event: "Lingkar Himpunan (Wadah Aspirasi Himpunan)", role: "Steering Committee / Pengurus" },
  { event: "Produksi Comprof (Pengambilan Video BEM)", role: "Steering Committee / Pengurus" },
  { event: "Voks Night (Launching Web dan Video)", role: "Steering Committee / Pengurus" },
  { event: "BAT (Buku Akhir Tahun / Yearbook)", role: "Steering Committee / Pengurus" }
];

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState<"organisasi" | "kepanitiaan">("organisasi");

  return (
    <Desktop>
      <div className="ml-20 p-4">
        <Window
          title="Organisasi_Kepanitiaan.exe"
          icon="🏛️"
          className="max-w-3xl"
          defaultPos={{ x: 120, y: 30 }}
          statusLeft={`${ORGANISASI.length} Organisasi | ${KEPANITIAAN_MAGANG.length + KEPANITIAAN_BPH.length} Kepanitiaan`}
          statusRight="Pengalaman berorganisasi & kepanitiaan di Universitas Brawijaya"
        >
          {/* XP Style Tabs */}
          <div className="flex bg-[#D8D2BD] border-b border-gray-400 p-1 gap-1">
            <button
              onClick={() => setActiveTab("organisasi")}
              className={`px-3 py-1 text-xs font-[Tahoma,sans-serif] font-bold border border-gray-400 ${activeTab === "organisasi"
                  ? "bg-[#ECE9D8] border-b-transparent translate-y-[1px] shadow-sm"
                  : "bg-[#D8D2BD] hover:bg-[#E5DFCF]"
                }`}
            >
              👥 Pengalaman Organisasi
            </button>
            <button
              onClick={() => setActiveTab("kepanitiaan")}
              className={`px-3 py-1 text-xs font-[Tahoma,sans-serif] font-bold border border-gray-400 ${activeTab === "kepanitiaan"
                  ? "bg-[#ECE9D8] border-b-transparent translate-y-[1px] shadow-sm"
                  : "bg-[#D8D2BD] hover:bg-[#E5DFCF]"
                }`}
            >
              📋 Pengalaman Kepanitiaan
            </button>
          </div>

          <div className="p-4 bg-[#F1EFE2] min-h-[350px]">
            {activeTab === "organisasi" ? (
              <div className="flex flex-col gap-4">
                {ORGANISASI.map((org, idx) => (
                  <div key={idx} className="xp-inset p-3 bg-white">
                    <div className="flex gap-3 items-start">
                      <span className="text-3xl">{org.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-start flex-wrap gap-1">
                          <h3 className="font-bold text-[13px] text-[#0058A8]">
                            {org.role}
                          </h3>
                          <span className="text-[10px] text-gray-500 bg-[#ECE9D8] border border-gray-400 px-1.5 py-[1px] rounded-sm">
                            📅 {org.period}
                          </span>
                        </div>
                        <h4 className="text-[11px] font-bold text-gray-700 mt-0.5">
                          🏛️ {org.org}
                        </h4>
                        <ul className="list-disc pl-4 mt-2 space-y-1">
                          {org.points.map((pt, pIdx) => (
                            <li key={pIdx} className="text-[11px] text-gray-600 leading-tight">
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {/* Kepanitiaan Staff Magang */}
                <div className="xp-inset p-3 bg-white">
                  <h3 className="font-bold text-[12px] text-[#0058A8] border-b border-gray-300 pb-1 mb-2">
                    🎖️ Staff Magang (Kepanitiaan)
                  </h3>
                  <div className="flex flex-col gap-2">
                    {KEPANITIAAN_MAGANG.map((item, idx) => (
                      <div key={idx} className="border-b border-gray-100 pb-1.5 last:border-0">
                        <div className="font-bold text-[11px] text-gray-800">{item.event}</div>
                        <div className="text-[10px] text-gray-500 font-semibold">{item.role}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kepanitiaan BPH */}
                <div className="xp-inset p-3 bg-white">
                  <h3 className="font-bold text-[12px] text-[#0058A8] border-b border-gray-300 pb-1 mb-2">
                    👔 BPH / Steering Committee (Feb – Des 2025)
                  </h3>
                  <div className="flex flex-col gap-2">
                    {KEPANITIAAN_BPH.map((item, idx) => (
                      <div key={idx} className="border-b border-gray-100 pb-1.5 last:border-0">
                        <div className="font-bold text-[11px] text-gray-800">{item.event}</div>
                        <div className="text-[10px] text-gray-500 font-semibold">{item.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Window>
      </div>
    </Desktop>
  );
}
