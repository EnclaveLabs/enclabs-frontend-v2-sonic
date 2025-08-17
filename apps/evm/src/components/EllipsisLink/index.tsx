import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

interface EllipsisTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  to: string;
}

export default function EllipsisLink({
  children,
  className = "",
  style,
  to
}: EllipsisTextProps) {
    const ref = useRef<HTMLParagraphElement | null>(null);
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState<{ x: number; y: number; h: number } | null>(null);
    const [isTruncated, setIsTruncated] = useState(false);
    const [fontStyle, setFontStyle] = useState<React.CSSProperties>({});
  
    // Vérifier si le texte est tronqué
    useLayoutEffect(() => {
      if (!ref.current) return;
      const el = ref.current;
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }, [children, style, className]);
  
    // Copier la position + styles du texte source
    useLayoutEffect(() => {
      if (!open || !ref.current) return;
  
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
  
      setCoords({ x: rect.left - 4, y: rect.top, h: rect.height });
  
      setFontStyle({
        fontSize: cs.fontSize,
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight as any,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        fontStyle: cs.fontStyle,
        color: cs.color,
      });
    }, [open]);

  const base =
    " block whitespace-nowrap overflow-hidden text-ellipsis";
  const _className = `${className} ${base}`;
  const _portalClassname = `fixed z-[9999] pointer-events-none bg-white px-1 rounded-md ${className}`;

  return (
    <>
      <p
        ref={ref}
        style={style}
        className={_className}
        onMouseEnter={() => isTruncated && setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        title={isTruncated ? "" : undefined} // optionnel : pas de title si on gère déjà le tooltip
      >
        {children}
      </p>

      {open && coords &&
        createPortal(
          <Link
            to={to}
            className={_portalClassname}
            style={{
                // Même origine que le <p>
                left: coords.x,
                top: coords.y,
                // *** Pas de width imposée ***
                // On laisse le texte s'étendre librement
                whiteSpace: "nowrap",   // garde une seule ligne complète
                lineHeight: `${coords.h}px`, // aligné verticalement avec la ligne originale
                ...fontStyle,
                ...style
              }}
          >
            {children}
          </Link>,
          document.body
        )}
    </>
  );
}
