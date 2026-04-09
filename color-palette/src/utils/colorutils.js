export function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function generateShades(hex) {
  const [h, s] = hexToHsl(hex);
  const lightnesses = [95, 85, 74, 62, 50, 40, 30, 22, 14];
  return lightnesses.map((l, i) => ({
    label: String((i + 1) * 100),
    hex: hslToHex(h, Math.min(s, 90), l),
  }));
}

export function generateHarmony(hex) {
  const [h, s, l] = hexToHsl(hex);
  return [
    { label: "Base",          hex: hslToHex(h, s, l) },
    { label: "Complementary", hex: hslToHex((h + 180) % 360, s, l) },
    { label: "Triadic A",     hex: hslToHex((h + 120) % 360, s, l) },
    { label: "Triadic B",     hex: hslToHex((h + 240) % 360, s, l) },
    { label: "Analogous",     hex: hslToHex((h + 30)  % 360, s, l) },
  ];
}

export function getTextColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 140 ? "#1a1a1a" : "#f5f5f5";
}

export function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function getLuminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function exportToJSON(color, shades, harmony) {
  const data = {
    base: color,
    shades: shades.map(s => ({ label: s.label, hex: s.hex })),
    harmony: harmony.map(h => ({ label: h.label, hex: h.hex }))
  };
  return JSON.stringify(data, null, 2);
}

export function exportToCSS(color, shades, harmony) {
  let css = `:root {\n  /* Base */\n  --color-base: ${color};\n\n  /* Shades */\n`;
  shades.forEach(s => {
    css += `  --color-shade-${s.label}: ${s.hex};\n`;
  });
  css += `\n  /* Harmony */\n`;
  harmony.forEach(h => {
    const slug = h.label.toLowerCase().replace(/\\s+/g, '-');
    css += `  --color-harmony-${slug}: ${h.hex};\n`;
  });
  css += `}\n`;
  return css;
}
