"use client";

import { ReactNode, useState, useRef, useCallback, useEffect } from "react";
import { clsx } from "clsx";

interface WindowProps {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
  statusLeft?: string;
  statusRight?: string;
  menuItems?: string[];
  defaultPos?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onClose?: () => void;
}

let globalZIndex = 100;

export default function Window({
  title,
  icon = "📁",
  children,
  className,
  statusLeft,
  statusRight,
  menuItems = ["File", "Edit", "View", "Help"],
  defaultPos,
  defaultSize = { width: 450, height: 300 },
  onClose,
}: WindowProps) {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [closed, setClosed] = useState(false);
  const [zIndex, setZIndex] = useState(globalZIndex);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(defaultSize);

  const dragging = useRef(false);
  const resizeType = useRef<"e" | "s" | "se" | null>(null); 
  
  const offset = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const bringToFront = useCallback(() => {
    globalZIndex += 1;
    setZIndex(globalZIndex);
  }, []);

  // Handle Drag Posisi Window
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      bringToFront();
      if (maximized) return;
      dragging.current = true;
      offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      e.preventDefault();
    },
    [pos, bringToFront, maximized]
  );

  // Handle Mulai Resize ('e' = Kanan, 's' = Bawah, 'se' = Pojok Kanan Bawah)
  const onResizeMouseDown = useCallback(
    (e: React.MouseEvent, type: "e" | "s" | "se") => {
      bringToFront();
      if (maximized) return;
      resizeType.current = type;
      startSize.current = { width: size.width, height: size.height };
      startPos.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
      e.stopPropagation(); // Mencegah bentrok dengan drag titlebar
    },
    [size, bringToFront, maximized]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setMaximized(true);
        setPos({ x: 0, y: 0 });
      } else if (defaultPos) {
        setPos(defaultPos);
      }
    }
  }, [defaultPos]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y;
        setPos({ x: newX, y: newY });
      }
      
      if (resizeType.current) {
        const deltaX = e.clientX - startPos.current.x;
        const deltaY = e.clientY - startPos.current.y;
        
        let newWidth = size.width;
        let newHeight = size.height;

        if (resizeType.current === "e" || resizeType.current === "se") {
          newWidth = Math.max(250, startSize.current.width + deltaX);
        }
        if (resizeType.current === "s" || resizeType.current === "se") {
          newHeight = Math.max(150, startSize.current.height + deltaY);
        }

        setSize({ width: newWidth, height: newHeight });
      }
    };

    const onMouseUp = () => {
      dragging.current = false;
      resizeType.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [size]);

  // Fungsi handleClose yang sebelumnya hilang/error
  const handleClose = () => {
    setClosed(true);
    onClose?.();
  };

  if (closed) return null;

  return (
    <div
      className={clsx(
        "absolute flex flex-col overflow-hidden select-none",
        maximized && !minimized ? "!fixed !inset-0 !w-screen !h-[calc(100dvh-40px)] !m-0 !translate-x-0 !translate-y-0 !max-w-none" : "",
        className
      )}
      style={{
        zIndex,
        transform: maximized && !minimized ? "none" : `translate(${pos.x}px, ${pos.y}px)`,
        width: maximized && !minimized ? "100vw" : `${size.width}px`,
        height: maximized && !minimized ? "calc(100dvh - 40px)" : minimized ? "auto" : `${size.height}px`,
        border: maximized && !minimized ? "none" : "2px solid #0A246A",
        borderRadius: maximized && !minimized ? "0" : "8px 8px 0 0",
        boxShadow: maximized && !minimized ? "none" : "2px 2px 10px rgba(0,0,0,0.7)",
      }}
      onClick={bringToFront}
    >
      {/* ─── INVISIBLE RESIZE HANDLES ─── */}
      {!maximized && (
        <>
          {/* Sisi Kanan (Resize Kanan-Kiri) */}
          <div
            className="absolute top-0 right-0 w-[6px] h-full cursor-e-resize z-50"
            onMouseDown={(e) => onResizeMouseDown(e, "e")}
          />
          {/* Sisi Bawah (Resize Atas-Bawah) */}
          <div
            className="absolute bottom-0 left-0 h-[6px] w-full cursor-s-resize z-50"
            onMouseDown={(e) => onResizeMouseDown(e, "s")}
          />
          {/* Pojok Kanan Bawah (Resize Diagonal Bebas) */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50"
            onMouseDown={(e) => onResizeMouseDown(e, "se")}
          />
        </>
      )}

      {/* Title Bar */}
      <div
        className="xp-titlebar flex items-center gap-1 select-none cursor-move shrink-0"
        onMouseDown={onMouseDown}
        onDoubleClick={() => setMaximized((v) => !v)}
        style={{ borderRadius: maximized && !minimized ? "0" : "6px 6px 0 0" }}
      >
        <span className="text-base leading-none">{icon}</span>
        <span className="xp-titlebar-text text-ellipsis overflow-hidden whitespace-nowrap">{title}</span>

        {/* Window Controls */}
        <div className="flex items-center gap-[2px] ml-auto" onMouseDown={(e) => e.stopPropagation()}>
          <button className="xp-min-btn" onClick={() => setMinimized((v) => !v)} title={minimized ? "Restore" : "Minimize"}>
            <span style={{ fontSize: 9 }}>─</span>
          </button>
          <button className="xp-max-btn" onClick={() => setMaximized((v) => !v)} title={maximized ? "Restore" : "Maximize"}>
            <span style={{ fontSize: 9 }}>{maximized ? "❐" : "□"}</span>
          </button>
          <button className="xp-close-btn" onClick={handleClose} title="Close">
            <span style={{ fontSize: 10 }}>✕</span>
          </button>
        </div>
      </div>

      {/* Body Window */}
      {!minimized && (
        <>
          {/* Menubar */}
          <div className="xp-menubar shrink-0">
            {menuItems.map((item) => (
              <span key={item} className="xp-menu-item">{item}</span>
            ))}
          </div>

          {/* Content Area */}
          <div className="xp-window flex-1 overflow-auto cursor-default bg-white text-black">
            {children}
          </div>

          {/* Statusbar */}
          <div className="xp-statusbar shrink-0 flex justify-between items-center relative pr-4">
            <span>{statusLeft || "Ready"}</span>
            <span>{statusRight}</span>
          </div>
        </>
      )}
    </div>
  );
}