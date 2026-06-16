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
  onClose,
}: WindowProps) {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [closed, setClosed] = useState(false);
  const [zIndex, setZIndex] = useState(globalZIndex);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Bring to front on click
  const bringToFront = useCallback(() => {
    globalZIndex += 1;
    setZIndex(globalZIndex);
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      bringToFront();
      if (maximized) return; // Disable drag when maximized
      dragging.current = true;
      offset.current = {
        x: e.clientX - pos.x,
        y: e.clientY - pos.y,
      };
      e.preventDefault();
    },
    [pos, bringToFront, maximized]
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
      if (!dragging.current) return;
      const newX = e.clientX - offset.current.x;
      const newY = e.clientY - offset.current.y;
      setPos({ x: newX, y: newY });
    };
    const onMouseUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const handleClose = () => {
    setClosed(true);
    onClose?.();
  };

  if (closed) return null;

  return (
    <div
      ref={windowRef}
      className={clsx(
        "absolute flex flex-col overflow-hidden select-none",
        maximized && !minimized ? "!fixed !inset-0 !w-screen !h-[calc(100dvh-30px)] !m-0 !translate-x-0 !translate-y-0 !max-w-none" : "",
        className
      )}
      style={{
        zIndex,
        transform: maximized && !minimized ? "none" : `translate(${pos.x}px, ${pos.y}px)`,
        border: maximized && !minimized ? "none" : "2px solid #0A246A",
        borderRadius: maximized && !minimized ? "0" : "8px 8px 0 0",
        boxShadow: maximized && !minimized ? "none" : "2px 2px 10px rgba(0,0,0,0.7)",
        minWidth: 200,
        // When minimized, collapse height to titlebar only
        ...(minimized ? { height: "auto" } : {}),
      }}
      onClick={bringToFront}
    >
      {/* Title Bar — drag handle */}
      <div
        className="xp-titlebar flex items-center gap-1 select-none cursor-move"
        onMouseDown={onMouseDown}
        onDoubleClick={() => setMaximized((v) => !v)}
        style={{ borderRadius: maximized && !minimized ? "0" : "6px 6px 0 0" }}
      >
        <span className="text-base leading-none">{icon}</span>
        <span className="xp-titlebar-text">{title}</span>

        {/* Window Controls */}
        <div
          className="flex items-center gap-[2px] ml-auto"
          onMouseDown={(e) => e.stopPropagation()} // don't drag when clicking controls
        >
          <button
            className="xp-min-btn"
            onClick={() => setMinimized((v) => !v)}
            title={minimized ? "Restore" : "Minimize"}
          >
            <span style={{ fontSize: 9 }}>─</span>
          </button>
          <button
            className="xp-max-btn"
            onClick={() => setMaximized((v) => !v)}
            title={maximized ? "Restore" : "Maximize"}
          >
            <span style={{ fontSize: 9 }}>{maximized ? "❐" : "□"}</span>
          </button>
          <button className="xp-close-btn" onClick={handleClose} title="Close">
            <span style={{ fontSize: 10 }}>✕</span>
          </button>
        </div>
      </div>

      {/* Body — hidden when minimized */}
      {!minimized && (
        <>
          {/* Menubar */}
          <div className="xp-menubar">
            {menuItems.map((item) => (
              <span key={item} className="xp-menu-item">
                {item}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="xp-window flex-1 overflow-auto cursor-default">
            {children}
          </div>

          {/* Statusbar */}
          {(statusLeft || statusRight) && (
            <div className="xp-statusbar">
              <span>{statusLeft}</span>
              <span>{statusRight}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}