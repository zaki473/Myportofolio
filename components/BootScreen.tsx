"use client";

import { useEffect, useState } from "react";

interface BootScreenProps {
  onFinish: () => void;
}

const PROFILE_IMAGE = "https://ik.imagekit.io/p27ub3udc/WhatsApp%20Image%202026-06-16%20at%2014.47.23.jpeg";

export default function BootScreen({ onFinish }: BootScreenProps) {
  const [stage, setStage] = useState<"bios" | "boot" | "welcome" | "finished">("bios");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const biosTimeout = setTimeout(() => {
      setStage("boot");
    }, 800);
    return () => clearTimeout(biosTimeout);
  }, []);

  useEffect(() => {
    if (stage !== "boot") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage("welcome");
          return 100;
        }
        return prev + 4;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage !== "welcome") return;
    const welcomeTimeout = setTimeout(() => {
      setStage("finished");
      onFinish();
    }, 3000); // Durasi welcome sedikit lebih lama agar animasinya terlihat
    return () => clearTimeout(welcomeTimeout);
  }, [stage, onFinish]);

  if (stage === "finished") return null;

  // --- BAGIAN BIOS (TETAP) ---
  if (stage === "bios") {
    return (
      <div className="fixed inset-0 bg-black text-[#d4d4d4] font-mono text-[11px] p-6 z-[99999] select-none flex flex-col justify-between">
        <div>
          <div>ZAKI-BIOS V4.06, An Energy Star Ally</div>
          <div>Copyright (C) 2026, Zaki Athallah Corp.</div>
          <br />
          <div>CPU: Intel(R) Core(TM) i7-12700H CPU @ 2.70GHz</div>
          <div>Speed: 2700MHz</div>
          <br />
          <div>Memory Test : 16384KB OK</div>
          <br />
          <div>Detecting Primary Master ... IDE Hard Disk</div>
          <div>Detecting Primary Slave  ... None</div>
          <div>Detecting Secondary Master ... ATAPI CD-ROM</div>
          <div>Detecting Secondary Slave  ... None</div>
          <br />
          <div>Starting Windows XP Professional (Zaki Edition)...</div>
        </div>
        <div className="flex justify-between items-end">
          <div>Press DEL to enter SETUP, F8 for Boot Menu</div>
          <div>06/16/2026-IT-UB-MALANG</div>
        </div>
      </div>
    );
  }

  // --- BAGIAN BOOT XP (TETAP) ---
  if (stage === "boot") {
    return (
      <div className="fixed inset-0 bg-black z-[99999] select-none flex flex-col items-center justify-between py-16 text-white font-[Tahoma,sans-serif]">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative mb-6 flex items-center justify-center">
            <svg className="w-24 h-24 drop-shadow-[4px_4px_8px_rgba(0,0,0,0.8)] animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 25 C 20 20, 35 25, 45 20 L 45 45 C 35 50, 20 45, 10 50 Z" fill="#E14D2A" />
              <path d="M48 20 C 58 15, 75 18, 85 13 L 85 38 C 75 43, 58 40, 48 45 Z" fill="#76BA99" />
              <path d="M10 53 C 20 48, 35 53, 45 48 L 45 73 C 35 78, 20 73, 10 78 Z" fill="#316AC5" />
              <path d="M48 48 C 58 43, 75 46, 85 41 L 85 66 C 75 71, 58 68, 48 73 Z" fill="#FFCC1D" />
            </svg>
          </div>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#808080] font-bold">Microsoft</div>
            <div className="text-3xl font-extrabold font-[Georgia,serif] italic tracking-tight flex items-baseline justify-center">
              <span>Windows</span>
              <span className="text-[#FF8A00] text-[18px] ml-1.5 font-bold font-[Tahoma,sans-serif] not-italic">XP</span>
            </div>
            <div className="text-[11px] text-[#A5C3E8] tracking-widest uppercase mt-0.5 font-bold">Zaki Edition</div>
          </div>
          <div className="mt-12 w-[160px] h-[13px] border border-[#7F9DB9] rounded bg-black p-[2px] overflow-hidden flex relative">
            <div className="xp-loader-bar flex gap-[2px]">
              <div className="w-[10px] h-full bg-gradient-to-r from-[#00d4ff] to-[#0058A8] rounded-[1px]" />
              <div className="w-[10px] h-full bg-gradient-to-r from-[#00d4ff] to-[#0058A8] rounded-[1px]" />
              <div className="w-[10px] h-full bg-gradient-to-r from-[#00d4ff] to-[#0058A8] rounded-[1px]" />
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm flex items-center justify-between text-[10px] text-gray-500 px-6">
          <div>Microsoft</div>
          <div>Copyright &copy; 2026 Muhammad Zaki Athallah</div>
        </div>
        <style jsx global>{`
          @keyframes xp-load { 0% { transform: translateX(-50px); } 100% { transform: translateX(170px); } }
          .xp-loader-bar { animation: xp-load 1.8s infinite linear; }
        `}</style>
      </div>
    );
  }

  // --- BAGIAN WELCOME (DIUBAH MENJADI MEWAH) ---
  // --- BAGIAN WELCOME (FOTO DIHAPUS, TETAP MEWAH) ---
  if (stage === "welcome") {
    return (
      <div className="fixed inset-0 bg-[#0058A8] bg-gradient-to-br from-[#003366] via-[#0058A8] to-[#003366] z-[99999] select-none flex flex-col items-center justify-center text-white overflow-hidden">

        {/* Efek Cahaya Latar Belakang agar tetap mewah */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />

        <div className="relative flex flex-col items-center">
          {/* Teks Welcome dengan Animasi Fade Up */}
          <div className="text-center">
            <h1 className="text-5xl font-extralight tracking-[0.3em] mb-4 opacity-0 animate-[fadeUp_1s_ease-out_forwards]">
              WELCOME
            </h1>

            {/* Garis pemisah mewah yang melebar otomatis */}
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8 opacity-0 animate-[scaleX_1.2s_ease-out_0.5s_forwards]" />

            {/* Nama dengan efek gradasi dan shimmer */}
            <div className="relative">
              <p className="text-3xl font-medium tracking-[0.4em] uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 opacity-0 animate-[fadeUp_1s_ease-out_0.8s_forwards]">
                Muhammad Zaki Athallah
              </p>
              {/* Efek kilauan cahaya yang lewat di atas nama */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Footer minimalis */}
        <div className="absolute bottom-10 opacity-30 text-[10px] tracking-[0.6em] uppercase">
          Authorized Access Only
        </div>

        <style jsx>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleX {
            from { transform: scaleX(0); opacity: 0; }
            to { transform: scaleX(1); opacity: 1; }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return null;
}