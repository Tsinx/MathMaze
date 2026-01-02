import React from 'react';

export interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  stroke?: string;
  isLowHp?: boolean;
}

// --- IMMUNE CELLS ---

export const MacrophageIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="macrophageBody" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor="#63B3ED" />
        <stop offset="100%" stopColor="#3182CE" />
      </radialGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* 细胞主体 - 增加伪足蠕动感 */}
    <path d="M25 25C15 35 10 60 20 75C30 90 60 95 75 80C90 65 95 40 80 25C65 10 35 10 25 25Z" fill="url(#macrophageBody)" stroke="#2c5282" strokeWidth="2">
      <animate attributeName="d" dur="6s" repeatCount="indefinite"
        values="M25 25C15 35 10 60 20 75C30 90 60 95 75 80C90 65 95 40 80 25C65 10 35 10 25 25Z;
                M20 30C5 45 15 70 30 85C50 95 75 90 85 70C95 50 85 25 65 15C45 5 30 15 20 30Z;
                M30 20C15 30 10 55 25 75C40 90 70 95 85 80C95 60 90 35 75 20C60 5 40 10 30 20Z;
                M25 25C15 35 10 60 20 75C30 90 60 95 75 80C90 65 95 40 80 25C65 10 35 10 25 25Z" />
    </path>

    {/* 细胞核 - 半透明 */}
    <ellipse cx="50" cy="50" rx="15" ry="12" fill="#1A365D" opacity="0.2">
        <animate attributeName="rx" values="15;16;15" dur="4s" repeatCount="indefinite" />
        <animate attributeName="ry" values="12;13;12" dur="4s" repeatCount="indefinite" />
        <animate attributeName="cx" values="50;52;48;50" dur="8s" repeatCount="indefinite" />
    </ellipse>

    {/* 溶酶体/颗粒 - 漂浮物 */}
    <circle cx="30" cy="40" r="3" fill="#BEE3F8" opacity="0.5">
        <animate attributeName="cy" values="40;38;40" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="70" cy="60" r="2.5" fill="#BEE3F8" opacity="0.5">
        <animate attributeName="cy" values="60;62;60" dur="2.5s" repeatCount="indefinite" />
    </circle>
     <circle cx="65" cy="35" r="2" fill="#BEE3F8" opacity="0.4">
        <animate attributeName="cy" values="35;33;35" dur="4s" repeatCount="indefinite" />
    </circle>

    {/* 眼睛左 */}
    <g transform="translate(38, 45)">
        <ellipse cx="0" cy="0" rx="6" ry="7" fill="white" />
        <circle cx="1" cy="0" r="3" fill="#2D3748" />
        <circle cx="2.5" cy="-1.5" r="1.5" fill="white" opacity="0.9" />
    </g>

    {/* 眼睛右 */}
    <g transform="translate(62, 45)">
        <ellipse cx="0" cy="0" rx="6" ry="7" fill="white" />
        <circle cx="-1" cy="0" r="3" fill="#2D3748" />
        <circle cx="0.5" cy="-1.5" r="1.5" fill="white" opacity="0.9" />
    </g>

    {/* 腮红 */}
    <ellipse cx="30" cy="55" rx="5" ry="3" fill="#F687B3" opacity="0.5" />
    <ellipse cx="70" cy="55" rx="5" ry="3" fill="#F687B3" opacity="0.5" />

    {/* 嘴巴 */}
    <path d="M42 62 Q50 68 58 62" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M42 62 Q50 68 58 62; M42 62 Q50 65 58 62; M42 62 Q50 68 58 62" dur="3s" repeatCount="indefinite" />
    </path>
  </svg>
);

export const NeutrophilIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="neutrophilBody" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor="#F6AD55" />
        <stop offset="100%" stopColor="#DD6B20" />
      </radialGradient>
    </defs>

    {/* 鞭毛 - 动态摆动 */}
    <line x1="15" y1="50" x2="5" y2="50" stroke="#DD6B20" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="y1" values="50;48;52;50" dur="0.5s" repeatCount="indefinite" />
    </line>
    <line x1="85" y1="50" x2="95" y2="50" stroke="#DD6B20" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="y1" values="50;52;48;50" dur="0.5s" repeatCount="indefinite" />
    </line>

    {/* 细胞主体 - 不规则形状 + 脉动 */}
    <path d="M20 30 Q10 50 20 70 Q30 90 50 90 Q70 90 80 70 Q90 50 80 30 Q70 10 50 10 Q30 10 20 30Z" fill="url(#neutrophilBody)" stroke="#9C4221" strokeWidth="2">
        <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M20 30 Q10 50 20 70 Q30 90 50 90 Q70 90 80 70 Q90 50 80 30 Q70 10 50 10 Q30 10 20 30Z;
                  M18 32 Q12 50 18 68 Q28 88 50 88 Q72 88 82 68 Q88 50 82 32 Q72 12 50 12 Q28 12 18 32Z;
                  M20 30 Q10 50 20 70 Q30 90 50 90 Q70 90 80 70 Q90 50 80 30 Q70 10 50 10 Q30 10 20 30Z" />
    </path>

    {/* 多叶细胞核 - 标志性特征 */}
    <g fill="#7B341E" opacity="0.4">
        <ellipse cx="35" cy="45" rx="8" ry="6">
            <animate attributeName="rx" values="8;9;8" dur="3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="50" cy="55" rx="8" ry="6">
            <animate attributeName="ry" values="6;7;6" dur="3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="65" cy="45" rx="8" ry="6">
            <animate attributeName="rx" values="8;7;8" dur="3s" repeatCount="indefinite" />
        </ellipse>
    </g>

    {/* 颗粒 - 溶酶体 */}
    <circle cx="30" cy="35" r="2.5" fill="#ED8936" opacity="0.6">
        <animate attributeName="cy" values="35;33;35" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="70" cy="65" r="2" fill="#ED8936" opacity="0.6">
        <animate attributeName="cy" values="65;67;65" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="25" cy="60" r="1.5" fill="#ED8936" opacity="0.5" />
    <circle cx="75" cy="40" r="1.5" fill="#ED8936" opacity="0.5" />

    {/* 眼睛左 */}
    <g transform="translate(40, 48)">
        <ellipse cx="0" cy="0" rx="5" ry="6" fill="white" />
        <circle cx="0.5" cy="0" r="2.5" fill="#2D3748" />
        <circle cx="1.5" cy="-1" r="1.2" fill="white" opacity="0.9" />
    </g>

    {/* 眼睛右 */}
    <g transform="translate(60, 48)">
        <ellipse cx="0" cy="0" rx="5" ry="6" fill="white" />
        <circle cx="-0.5" cy="0" r="2.5" fill="#2D3748" />
        <circle cx="0.5" cy="-1" r="1.2" fill="white" opacity="0.9" />
    </g>

    {/* 腮红 */}
    <ellipse cx="32" cy="58" rx="4" ry="2.5" fill="#FBB6CE" opacity="0.5" />
    <ellipse cx="68" cy="58" rx="4" ry="2.5" fill="#FBB6CE" opacity="0.5" />

    {/* 嘴巴 - 微笑 */}
    <path d="M43 65 Q50 70 57 65" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M43 65 Q50 70 57 65; M43 65 Q50 68 57 65; M43 65 Q50 70 57 65" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
);

export const TCellIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="tcellBody" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor="#68D391" />
        <stop offset="100%" stopColor="#38A169" />
      </radialGradient>
    </defs>

    {/* T细胞受体 - 动态伸展 */}
    <g stroke="#276749" strokeWidth="2" strokeLinecap="round">
      <line x1="50" y1="12" x2="50" y2="2">
          <animate attributeName="y2" values="2;0;2" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="50" y1="88" x2="50" y2="98">
          <animate attributeName="y2" values="98;100;98" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="12" y1="50" x2="2" y2="50">
          <animate attributeName="x2" values="2;0;2" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="88" y1="50" x2="98" y2="50">
          <animate attributeName="x2" values="98;100;98" dur="2s" repeatCount="indefinite" />
      </line>
    </g>

    {/* 外层细胞膜 - 脉动 */}
    <circle cx="50" cy="50" r="38" fill="url(#tcellBody)" stroke="#276749" strokeWidth="2">
        <animate attributeName="r" values="38;39;38" dur="3s" repeatCount="indefinite" />
    </circle>

    {/* 细胞核 - 半透明 */}
    <ellipse cx="50" cy="50" rx="22" ry="20" fill="#22543D" opacity="0.3">
        <animate attributeName="rx" values="22;23;22" dur="4s" repeatCount="indefinite" />
    </ellipse>

    {/* 受体突起细节 - 四个方向 */}
    <g fill="#48BB78" opacity="0.5">
        <circle cx="50" cy="15" r="4">
            <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="85" r="4">
            <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="15" cy="50" r="4">
            <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="85" cy="50" r="4">
            <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
        </circle>
    </g>

    {/* 眼睛左 */}
    <g transform="translate(40, 48)">
        <ellipse cx="0" cy="0" rx="5" ry="6" fill="white" />
        <circle cx="0.5" cy="0" r="2.5" fill="#2D3748" />
        <circle cx="1.5" cy="-1" r="1.2" fill="white" opacity="0.9" />
    </g>

    {/* 眼睛右 */}
    <g transform="translate(60, 48)">
        <ellipse cx="0" cy="0" rx="5" ry="6" fill="white" />
        <circle cx="-0.5" cy="0" r="2.5" fill="#2D3748" />
        <circle cx="0.5" cy="-1" r="1.2" fill="white" opacity="0.9" />
    </g>

    {/* 腮红 */}
    <ellipse cx="32" cy="58" rx="4" ry="2.5" fill="#FBB6CE" opacity="0.5" />
    <ellipse cx="68" cy="58" rx="4" ry="2.5" fill="#FBB6CE" opacity="0.5" />

    {/* 嘴巴 */}
    <path d="M43 65 Q50 70 57 65" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M43 65 Q50 70 57 65; M43 65 Q50 68 57 65; M43 65 Q50 70 57 65" dur="2.5s" repeatCount="indefinite" />
    </path>
  </svg>
);

export const BCellIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bcellBody" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor="#D6BCFA" />
        <stop offset="100%" stopColor="#805AD5" />
      </radialGradient>
    </defs>

    {/* Y形抗体 - 左上 */}
    <g stroke="#6B46C1" strokeWidth="2" strokeLinecap="round">
        <line x1="20" y1="35" x2="12" y2="25">
            <animate attributeName="y1" values="35;33;35" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="20" y1="35" x2="28" y2="25">
            <animate attributeName="y1" values="35;33;35" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="20" y1="35" x2="20" y2="45" strokeWidth="2.5" />
    </g>

    {/* Y形抗体 - 右上 */}
    <g stroke="#6B46C1" strokeWidth="2" strokeLinecap="round">
        <line x1="80" y1="35" x2="72" y2="25">
            <animate attributeName="y1" values="35;33;35" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="80" y1="35" x2="88" y2="25">
            <animate attributeName="y1" values="35;33;35" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="80" y1="35" x2="80" y2="45" strokeWidth="2.5" />
    </g>

    {/* Y形抗体 - 左下 */}
    <g stroke="#6B46C1" strokeWidth="2" strokeLinecap="round">
        <line x1="20" y1="65" x2="12" y2="75">
            <animate attributeName="y1" values="65;67;65" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="20" y1="65" x2="28" y2="75">
            <animate attributeName="y1" values="65;67;65" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="20" y1="65" x2="20" y2="55" strokeWidth="2.5" />
    </g>

    {/* Y形抗体 - 右下 */}
    <g stroke="#6B46C1" strokeWidth="2" strokeLinecap="round">
        <line x1="80" y1="65" x2="72" y2="75">
            <animate attributeName="y1" values="65;67;65" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="80" y1="65" x2="88" y2="75">
            <animate attributeName="y1" values="65;67;65" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="80" y1="65" x2="80" y2="55" strokeWidth="2.5" />
    </g>

    {/* 细胞主体 - 脉动 */}
    <circle cx="50" cy="50" r="35" fill="url(#bcellBody)" stroke="#553C9A" strokeWidth="2">
        <animate attributeName="r" values="35;36;35" dur="3s" repeatCount="indefinite" />
    </circle>

    {/* 细胞核 */}
    <ellipse cx="50" cy="50" rx="18" ry="16" fill="#44337A" opacity="0.3">
        <animate attributeName="rx" values="18;19;18" dur="4s" repeatCount="indefinite" />
    </ellipse>

    {/* 眼睛左 */}
    <g transform="translate(40, 48)">
        <ellipse cx="0" cy="0" rx="5" ry="6" fill="white" />
        <circle cx="0.5" cy="0" r="2.5" fill="#2D3748" />
        <circle cx="1.5" cy="-1" r="1.2" fill="white" opacity="0.9" />
    </g>

    {/* 眼睛右 */}
    <g transform="translate(60, 48)">
        <ellipse cx="0" cy="0" rx="5" ry="6" fill="white" />
        <circle cx="-0.5" cy="0" r="2.5" fill="#2D3748" />
        <circle cx="0.5" cy="-1" r="1.2" fill="white" opacity="0.9" />
    </g>

    {/* 腮红 */}
    <ellipse cx="32" cy="58" rx="4" ry="2.5" fill="#FBB6CE" opacity="0.5" />
    <ellipse cx="68" cy="58" rx="4" ry="2.5" fill="#FBB6CE" opacity="0.5" />

    {/* 嘴巴 */}
    <path d="M43 65 Q50 70 57 65" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M43 65 Q50 70 57 65; M43 65 Q50 68 57 65; M43 65 Q50 70 57 65" dur="2.5s" repeatCount="indefinite" />
    </path>
  </svg>
);

export const NKCellIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="nkcellBody" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor="#FC8181" />
        <stop offset="100%" stopColor="#C53030" />
      </radialGradient>
      <filter id="nkGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* 星形主体 - 缓慢旋转 */}
    <path d="M50 12 L58 32 L80 32 L63 46 L73 66 L50 56 L27 66 L37 46 L20 32 L42 32 Z" fill="url(#nkcellBody)" stroke="#742A2A" strokeWidth="2" strokeLinejoin="round" filter="url(#nkGlow)">
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="15s" repeatCount="indefinite" />
      <animate attributeName="d" dur="4s" repeatCount="indefinite"
        values="M50 12 L58 32 L80 32 L63 46 L73 66 L50 56 L27 66 L37 46 L20 32 L42 32 Z;
                M50 12 L57 33 L79 33 L62 46 L72 66 L50 56 L28 66 L38 46 L21 33 L43 33 Z;
                M50 12 L58 32 L80 32 L63 46 L73 66 L50 56 L27 66 L37 46 L20 32 L42 32 Z" />
    </path>

    {/* 细胞核 - 内部发光 */}
    <ellipse cx="50" cy="50" rx="12" ry="10" fill="#742A2A" opacity="0.3">
        <animate attributeName="rx" values="12;13;12" dur="3s" repeatCount="indefinite" />
    </ellipse>

    {/* 颗粒 - 溶酶体 */}
    <circle cx="40" cy="35" r="2" fill="#FEB2B2" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="15s" repeatCount="indefinite" />
    </circle>
    <circle cx="60" cy="55" r="2" fill="#FEB2B2" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="15s" repeatCount="indefinite" />
    </circle>
    <circle cx="55" cy="40" r="1.5" fill="#FEB2B2" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="15s" repeatCount="indefinite" />
    </circle>

    {/* 眼睛左 */}
    <g transform="translate(43, 46)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>

    {/* 眼睛右 */}
    <g transform="translate(57, 46)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>

    {/* 腮红 */}
    <ellipse cx="35" cy="54" rx="3" ry="2" fill="#FBB6CE" opacity="0.5" />
    <ellipse cx="65" cy="54" rx="3" ry="2" fill="#FBB6CE" opacity="0.5" />

    {/* 嘴巴 */}
    <path d="M46 60 Q50 64 54 60" stroke="#2D3748" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M46 60 Q50 64 54 60; M46 60 Q50 62 54 60; M46 60 Q50 64 54 60" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
);

// --- GENERIC PATHOGEN COMPONENTS ---

const RodBacteriaIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#48BB78", stroke = "#2F855A", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`rodBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 鞭毛 - 动态摆动 */}
    <g stroke={stroke} strokeWidth="1.5" strokeLinecap="round">
        <line x1="25" y1="40" x2="18" y2="30">
            <animate attributeName="y1" values="40;38;40" dur="0.8s" repeatCount="indefinite" />
        </line>
        <line x1="50" y1="35" x2="50" y2="20">
            <animate attributeName="y1" values="35;33;35" dur="0.7s" repeatCount="indefinite" />
        </line>
        <line x1="75" y1="40" x2="82" y2="30">
            <animate attributeName="y1" values="40;42;40" dur="0.8s" repeatCount="indefinite" />
        </line>
        <line x1="25" y1="60" x2="18" y2="70">
            <animate attributeName="y1" values="60;62;60" dur="0.8s" repeatCount="indefinite" />
        </line>
        <line x1="50" y1="65" x2="50" y2="80">
            <animate attributeName="y1" values="65;67;65" dur="0.7s" repeatCount="indefinite" />
        </line>
        <line x1="75" y1="60" x2="82" y2="70">
            <animate attributeName="y1" values="60;58;60" dur="0.8s" repeatCount="indefinite" />
        </line>
    </g>

    {/* 细菌主体 - 脉动 */}
    <rect x="20" y="35" width="60" height="30" rx="15" fill={`url(#rodBody-${stroke})`} stroke={stroke} strokeWidth="2">
        <animate attributeName="width" values="60;61;60" dur="3s" repeatCount="indefinite" />
        <animate attributeName="rx" values="15;16;15" dur="3s" repeatCount="indefinite" />
    </rect>

    {/* 细胞核 - 半透明 */}
    <ellipse cx="50" cy="50" rx="20" ry="8" fill={stroke} opacity="0.2">
        <animate attributeName="rx" values="20;21;20" dur="4s" repeatCount="indefinite" />
    </ellipse>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="35" cy="45" r="2.5" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="65" cy="55" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="55;57;55" dur="2.5s" repeatCount="indefinite" />
    </circle>

    {isLowHp ? (
      <>
        {/* Low HP Eyes (X X) */}
        <g transform="translate(40, 48)">
           <path d="M-3 -3 L3 3 M3 -3 L-3 3" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g transform="translate(60, 48)">
           <path d="M-3 -3 L3 3 M3 -3 L-3 3" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        {/* Sweat Drop */}
        <path d="M70 38 Q72 35 74 38 Q76 41 74 43 Q72 45 70 43" fill="#63B3ED" opacity="0.8">
           <animate attributeName="d" values="M70 38 Q72 35 74 38 Q76 41 74 43 Q72 45 70 43; M70 41 Q72 38 74 41 Q76 44 74 46 Q72 48 70 46" dur="1s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Low HP Mouth (Wavy/Trembling) */}
        <path d="M44 62 Q50 58 56 62" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
             <animate attributeName="d" values="M44 62 Q50 58 56 62; M44 62 Q50 60 56 62; M44 62 Q50 58 56 62" dur="0.2s" repeatCount="indefinite" />
        </path>
      </>
    ) : (
      <>
        {/* 眼睛左 */}
        <g transform="translate(40, 48)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>

        {/* 眼睛右 */}
        <g transform="translate(60, 48)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>

        {/* 腮红 */}
        <ellipse cx="32" cy="55" rx="3" ry="2" fill="#FBB6CE" opacity="0.5" />
        <ellipse cx="68" cy="55" rx="3" ry="2" fill="#FBB6CE" opacity="0.5" />

        {/* 嘴巴 */}
        <path d="M44 60 Q50 63 56 60" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M44 60 Q50 63 56 60; M44 60 Q50 61 56 60; M44 60 Q50 63 56 60" dur="2s" repeatCount="indefinite" />
        </path>
      </>
    )}
  </svg>
);

const CocciBacteriaIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#9F7AEA", stroke = "#805AD5", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`cocciBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    <g transform="translate(10, 10)">
      {/* 球菌1 - 左上 */}
      <g>
        <circle cx="30" cy="30" r="15" fill={`url(#cocciBody-${stroke})`} stroke={stroke} strokeWidth="2">
            <animate attributeName="r" values="15;16;15" dur="3s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="30" cy="30" rx="6" ry="4" fill={stroke} opacity="0.2">
            <animate attributeName="rx" values="6;7;6" dur="4s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* 球菌2 - 右上 */}
      <g>
        <circle cx="60" cy="30" r="15" fill={`url(#cocciBody-${stroke})`} stroke={stroke} strokeWidth="2">
            <animate attributeName="r" values="15;14;15" dur="3s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="60" cy="30" rx="6" ry="4" fill={stroke} opacity="0.2">
            <animate attributeName="rx" values="6;5;6" dur="4s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* 球菌3 - 下方 */}
      <g>
        <circle cx="45" cy="55" r="15" fill={`url(#cocciBody-${stroke})`} stroke={stroke} strokeWidth="2">
            <animate attributeName="r" values="15;16;15" dur="3s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="45" cy="55" rx="6" ry="4" fill={stroke} opacity="0.2">
            <animate attributeName="rx" values="6;7;6" dur="4s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* 内部颗粒 - 漂浮物 */}
      <circle cx="30" cy="30" r="2" fill="white" opacity="0.3">
          <animate attributeName="cy" values="30;28;30" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="30" r="2" fill="white" opacity="0.3">
          <animate attributeName="cy" values="30;32;30" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="45" cy="55" r="2" fill="white" opacity="0.3">
          <animate attributeName="cy" values="55;53;55" dur="2s" repeatCount="indefinite" />
      </circle>

      {isLowHp ? (
        <>
          {/* Low HP Eyes (X X) */}
          <g transform="translate(40, 53)">
             <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <g transform="translate(50, 53)">
             <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          
          {/* Sweat Drop */}
          <path d="M55 45 Q57 42 59 45 Q61 48 59 50 Q57 52 55 50" fill="#63B3ED" opacity="0.8">
             <animate attributeName="d" values="M55 45 Q57 42 59 45 Q61 48 59 50 Q57 52 55 50; M55 48 Q57 45 59 48 Q61 51 59 53 Q57 55 55 53" dur="1s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
          </path>

          {/* Low HP Mouth (Wavy/Trembling) */}
          <path d="M42 62 Q45 58 48 62" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
               <animate attributeName="d" values="M42 62 Q45 58 48 62; M42 62 Q45 60 48 62; M42 62 Q45 58 48 62" dur="0.2s" repeatCount="indefinite" />
          </path>
        </>
      ) : (
        <>
          {/* 眼睛 */}
          <g transform="translate(40, 53)">
              <ellipse cx="0" cy="0" rx="3.5" ry="4" fill="white" />
              <circle cx="0.3" cy="0" r="1.8" fill="#2D3748" />
              <circle cx="0.8" cy="-0.6" r="0.8" fill="white" opacity="0.9" />
          </g>
          <g transform="translate(50, 53)">
              <ellipse cx="0" cy="0" rx="3.5" ry="4" fill="white" />
              <circle cx="-0.3" cy="0" r="1.8" fill="#2D3748" />
              <circle cx="0.2" cy="-0.6" r="0.8" fill="white" opacity="0.9" />
          </g>

          {/* 嘴巴 */}
          <path d="M42 60 Q45 63 48 60" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
              <animate attributeName="d" values="M42 60 Q45 63 48 60; M42 60 Q45 61 48 60; M42 60 Q45 63 48 60" dur="2s" repeatCount="indefinite" />
          </path>
        </>
      )}
    </g>
  </svg>
);

const SpiralBacteriaIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#ECC94B", stroke = "#D69E2E", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`spiralBody-${stroke}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </linearGradient>
    </defs>

    {/* 螺旋主体 - 游动动画 */}
     <path d="M15 45 Q25 20 45 40 T75 45 T105 40" stroke={`url(#spiralBody-${stroke})`} strokeWidth="14" strokeLinecap="round" fill="none">
        <animate attributeName="d" dur="2s" repeatCount="indefinite"
          values="M15 45 Q25 20 45 40 T75 45 T105 40;
                  M15 45 Q25 18 45 38 T75 43 T105 38;
                  M15 45 Q25 20 45 40 T75 45 T105 40" />
     </path>
     <path d="M15 45 Q25 20 45 40 T75 45 T105 40" stroke={stroke} strokeWidth="2" fill="none" strokeDasharray="2 2">
        <animate attributeName="d" dur="2s" repeatCount="indefinite"
          values="M15 45 Q25 20 45 40 T75 45 T105 40;
                  M15 45 Q25 18 45 38 T75 43 T105 38;
                  M15 45 Q25 20 45 40 T75 45 T105 40" />
     </path>

    {/* 内部细胞核 */}
    <ellipse cx="45" cy="42" rx="8" ry="4" fill={stroke} opacity="0.2">
        <animate attributeName="cx" values="45;46;45" dur="2s" repeatCount="indefinite" />
    </ellipse>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="55" cy="38" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="38;36;38" dur="1.5s" repeatCount="indefinite" />
    </circle>

    {isLowHp ? (
      <>
        {/* Low HP Eye (X) */}
        <g transform="translate(50, 42)">
           <path d="M-3 -3 L3 3 M3 -3 L-3 3" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        {/* Sweat Drop */}
        <path d="M60 35 Q62 32 64 35 Q66 38 64 40 Q62 42 60 40" fill="#63B3ED" opacity="0.8">
           <animate attributeName="d" values="M60 35 Q62 32 64 35 Q66 38 64 40 Q62 42 60 40; M60 38 Q62 35 64 38 Q66 41 64 43 Q62 45 60 43" dur="1s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Low HP Mouth (Wavy/Trembling) */}
        <path d="M46 50 Q50 46 54 50" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
             <animate attributeName="d" values="M46 50 Q50 46 54 50; M46 50 Q50 48 54 50; M46 50 Q50 46 54 50" dur="0.2s" repeatCount="indefinite" />
        </path>
      </>
    ) : (
      <>
        {/* 眼睛 */}
        <g transform="translate(50, 42)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="0" cy="0" r="2" fill="#2D3748" />
            <circle cx="0.8" cy="-0.8" r="0.8" fill="white" opacity="0.9" />
        </g>

        {/* 嘴巴 */}
        <path d="M46 48 Q50 51 54 48" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M46 48 Q50 51 54 48; M46 48 Q50 49 54 48; M46 48 Q50 51 54 48" dur="1.5s" repeatCount="indefinite" />
        </path>
      </>
    )}
  </svg>
);

const SpikyVirusIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#A0AEC0", stroke = "#4A5568", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`spikyBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 刺突 - 8个方向，动态波动 */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 50 50)`}>
        <line x1="50" y1="25" x2="50" y2="12" stroke={stroke} strokeWidth="3" strokeLinecap="round">
            <animate attributeName="y1" values="25;23;25" dur="2.5s" repeatCount="indefinite" />
        </line>
        <circle cx="50" cy="12" r="3" fill={stroke}>
            <animate attributeName="cy" values="12;10;12" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
    ))}

    {/* 病毒主体 - 脉动 */}
    <circle cx="50" cy="50" r="25" fill={`url(#spikyBody-${stroke})`} stroke={stroke} strokeWidth="2">
        <animate attributeName="r" values="25;26;25" dur="3s" repeatCount="indefinite" />
    </circle>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="42" cy="45" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="58" cy="55" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="55;57;55" dur="2.5s" repeatCount="indefinite" />
    </circle>

    {isLowHp ? (
      <>
        {/* Low HP Eyes (X X) */}
        <g transform="translate(42, 48)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g transform="translate(58, 48)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        
        {/* Sweat Drop */}
        <path d="M68 40 Q70 37 72 40 Q74 43 72 45 Q70 47 68 45" fill="#63B3ED" opacity="0.8">
           <animate attributeName="d" values="M68 40 Q70 37 72 40 Q74 43 72 45 Q70 47 68 45; M68 43 Q70 40 72 43 Q74 46 72 48 Q70 50 68 48" dur="1s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Low HP Mouth (Wavy/Trembling) */}
        <path d="M45 62 Q50 58 55 62" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
             <animate attributeName="d" values="M45 62 Q50 58 55 62; M45 62 Q50 60 55 62; M45 62 Q50 58 55 62" dur="0.2s" repeatCount="indefinite" />
        </path>
      </>
    ) : (
      <>
        {/* 眼睛 */}
        <g transform="translate(42, 48)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>
        <g transform="translate(58, 48)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>

        {/* 嘴巴 */}
        <path d="M45 60 Q50 63 55 60" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M45 60 Q50 63 55 60; M45 60 Q50 61 55 60; M45 60 Q50 63 55 60" dur="2s" repeatCount="indefinite" />
        </path>
      </>
    )}
  </svg>
);

const GeometricVirusIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#63B3ED", stroke = "#3182CE", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`geoBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 六边形主体 - 脉动 */}
    <path d="M50 18 L78 35 L78 65 L50 82 L22 65 L22 35 Z" fill={`url(#geoBody-${stroke})`} stroke={stroke} strokeWidth="3">
        <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M50 18 L78 35 L78 65 L50 82 L22 65 L22 35 Z;
                  M50 16 L80 33 L80 67 L50 84 L20 67 L20 33 Z;
                  M50 18 L78 35 L78 65 L50 82 L22 65 L22 35 Z" />
    </path>

    {/* 表面纹理线 */}
    <path d="M50 18 L50 50 L78 65 M50 50 L22 65" stroke={stroke} strokeWidth="1" opacity="0.3">
        <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M50 18 L50 50 L78 65 M50 50 L22 65;
                  M50 16 L50 50 L80 67 M50 50 L20 67;
                  M50 18 L50 50 L78 65 M50 50 L22 65" />
    </path>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="40" cy="45" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="60" cy="55" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="55;57;55" dur="2.5s" repeatCount="indefinite" />
    </circle>

    {isLowHp ? (
      <>
        {/* Low HP Eyes (X X) */}
        <g transform="translate(42, 48)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g transform="translate(58, 48)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        
        {/* Sweat Drop */}
        <path d="M68 40 Q70 37 72 40 Q74 43 72 45 Q70 47 68 45" fill="#63B3ED" opacity="0.8">
           <animate attributeName="d" values="M68 40 Q70 37 72 40 Q74 43 72 45 Q70 47 68 45; M68 43 Q70 40 72 43 Q74 46 72 48 Q70 50 68 48" dur="1s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Low HP Mouth (Wavy/Trembling) */}
        <path d="M45 62 Q50 58 55 62" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
             <animate attributeName="d" values="M45 62 Q50 58 55 62; M45 62 Q50 60 55 62; M45 62 Q50 58 55 62" dur="0.2s" repeatCount="indefinite" />
        </path>
      </>
    ) : (
      <>
        {/* 眼睛 */}
        <g transform="translate(42, 48)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>
        <g transform="translate(58, 48)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>

        {/* 嘴巴 */}
        <path d="M45 60 Q50 63 55 60" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M45 60 Q50 63 55 60; M45 60 Q50 61 55 60; M45 60 Q50 63 55 60" dur="2s" repeatCount="indefinite" />
        </path>
      </>
    )}
  </svg>
);

const FiloVirusIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#C53030", stroke = "#742A2A", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`filoBody-${stroke}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </linearGradient>
    </defs>

    {/* 丝状身体 - 游动动画 */}
    <path d="M30 80 C30 80 20 60 30 40 C40 20 70 20 80 40 C90 60 70 80 50 60" stroke={`url(#filoBody-${stroke})`} strokeWidth="10" strokeLinecap="round" fill="none">
        <animate attributeName="d" dur="3s" repeatCount="indefinite"
          values="M30 80 C30 80 20 60 30 40 C40 20 70 20 80 40 C90 60 70 80 50 60;
                  M28 78 C28 78 18 58 28 38 C38 18 72 18 82 38 C92 58 72 78 52 58;
                  M30 80 C30 80 20 60 30 40 C40 20 70 20 80 40 C90 60 70 80 50 60" />
    </path>

    {/* 内部轮廓 */}
    <path d="M30 80 C30 80 20 60 30 40 C40 20 70 20 80 40 C90 60 70 80 50 60" stroke={stroke} strokeWidth="2" strokeDasharray="3 3" fill="none">
        <animate attributeName="d" dur="3s" repeatCount="indefinite"
          values="M30 80 C30 80 20 60 30 40 C40 20 70 20 80 40 C90 60 70 80 50 60;
                  M28 78 C28 78 18 58 28 38 C38 18 72 18 82 38 C92 58 72 78 52 58;
                  M30 80 C30 80 20 60 30 40 C40 20 70 20 80 40 C90 60 70 80 50 60" />
    </path>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="35" cy="45" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="45" cy="40" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="40;42;40" dur="2s" repeatCount="indefinite" />
    </circle>

    {isLowHp ? (
      <>
        {/* Low HP Eye (X) */}
        <g transform="translate(35, 45)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        
        {/* Sweat Drop */}
        <path d="M45 35 Q47 32 49 35 Q51 38 49 40 Q47 42 45 40" fill="#63B3ED" opacity="0.8">
           <animate attributeName="d" values="M45 35 Q47 32 49 35 Q51 38 49 40 Q47 42 45 40; M45 38 Q47 35 49 38 Q51 41 49 43 Q47 45 45 43" dur="1s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Low HP Mouth (Wavy/Trembling) - Added for effect */}
        <path d="M30 52 Q35 48 40 52" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
             <animate attributeName="d" values="M30 52 Q35 48 40 52; M30 52 Q35 50 40 52; M30 52 Q35 48 40 52" dur="0.2s" repeatCount="indefinite" />
        </path>
      </>
    ) : (
      <>
        {/* 眼睛 */}
        <g transform="translate(35, 45)">
            <ellipse cx="0" cy="0" rx="3.5" ry="4.5" fill="white" />
            <circle cx="0.3" cy="0" r="2" fill="#2D3748" />
            <circle cx="1" cy="-0.7" r="0.8" fill="white" opacity="0.9" />
        </g>
      </>
    )}
  </svg>
);

const BulletVirusIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#4A5568", stroke = "#1A202C", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`bulletBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
      <filter id="bulletGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* 弹状主体 - 脉动 */}
    <path d="M35 80 L65 80 L65 40 C65 25 50 25 35 40 Z" fill={`url(#bulletBody-${stroke})`} stroke={stroke} strokeWidth="3">
        <animate attributeName="d" dur="3s" repeatCount="indefinite"
          values="M35 80 L65 80 L65 40 C65 25 50 25 35 40 Z;
                  M33 78 L67 78 L67 38 C67 23 50 23 33 38 Z;
                  M35 80 L65 80 L65 40 C65 25 50 25 35 40 Z" />
    </path>

    {/* 表面纹理 */}
    <line x1="35" y1="50" x2="65" y2="50" stroke={stroke} strokeWidth="2" opacity="0.3">
        <animate attributeName="y1" values="50;48;50" dur="3s" repeatCount="indefinite" />
    </line>
    <line x1="35" y1="65" x2="65" y2="65" stroke={stroke} strokeWidth="2" opacity="0.3">
        <animate attributeName="y1" values="65;63;65" dur="3s" repeatCount="indefinite" />
    </line>

    {/* 头部发光效果 */}
    <ellipse cx="50" cy="35" rx="8" ry="6" fill="white" opacity="0.2" filter="url(#bulletGlow)">
        <animate attributeName="opacity" values="0.2;0.3;0.2" dur="2s" repeatCount="indefinite" />
    </ellipse>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="42" cy="50" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="50;48;50" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="58" cy="60" r="1.5" fill="white" opacity="0.3">
        <animate attributeName="cy" values="60;62;60" dur="2.5s" repeatCount="indefinite" />
    </circle>

    {isLowHp ? (
      <>
        {/* Low HP Eyes (X X) */}
        <g transform="translate(42, 43)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g transform="translate(58, 43)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        
        {/* Sweat Drop */}
        <path d="M68 35 Q70 32 72 35 Q74 38 72 40 Q70 42 68 40" fill="#63B3ED" opacity="0.8">
           <animate attributeName="d" values="M68 35 Q70 32 72 35 Q74 38 72 40 Q70 42 68 40; M68 38 Q70 35 72 38 Q74 41 72 43 Q70 45 68 43" dur="1s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Low HP Mouth (Wavy/Trembling) */}
        <path d="M45 57 Q50 53 55 57" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
             <animate attributeName="d" values="M45 57 Q50 53 55 57; M45 57 Q50 55 55 57; M45 57 Q50 53 55 57" dur="0.2s" repeatCount="indefinite" />
        </path>
      </>
    ) : (
      <>
        {/* 眼睛 */}
        <g transform="translate(42, 43)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>
        <g transform="translate(58, 43)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>

        {/* 嘴巴 */}
        <path d="M45 55 Q50 50 55 55" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M45 55 Q50 50 55 55; M45 55 Q50 52 55 55; M45 55 Q50 50 55 55" dur="2s" repeatCount="indefinite" />
        </path>
      </>
    )}
  </svg>
);

const WormParasiteIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#F687B3", stroke = "#D53F8C" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`wormBody-${stroke}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </linearGradient>
    </defs>

    {/* 身体 - 蠕动动画 */}
    <path d="M15 80 Q35 20 50 50 T85 20" stroke={`url(#wormBody-${stroke})`} strokeWidth="12" strokeLinecap="round" fill="none">
        <animate attributeName="d" dur="2.5s" repeatCount="indefinite"
          values="M15 80 Q35 20 50 50 T85 20;
                  M12 78 Q32 18 52 48 T82 18;
                  M15 80 Q35 20 50 50 T85 20" />
    </path>

    {/* 身体轮廓 */}
    <path d="M15 80 Q35 20 50 50 T85 20" stroke={stroke} strokeWidth="3" fill="none" opacity="0.5">
        <animate attributeName="d" dur="2.5s" repeatCount="indefinite"
          values="M15 80 Q35 20 50 50 T85 20;
                  M12 78 Q32 18 52 48 T82 18;
                  M15 80 Q35 20 50 50 T85 20" />
    </path>

    {/* 身体节段 - 游动效果 */}
    <circle cx="40" cy="50" r="2" fill="white" opacity="0.4">
        <animate attributeName="cy" values="50;48;50" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="60" cy="40" r="2" fill="white" opacity="0.4">
        <animate attributeName="cy" values="40;42;40" dur="1.5s" repeatCount="indefinite" />
    </circle>

    {/* 眼睛 */}
    <g transform="translate(78, 25)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>
  </svg>
);

const TapewormIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#F6E05E", stroke = "#D69E2E", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`tapewormBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 身体节段 - 摆动动画 */}
    <g>
        <rect x="20" y="70" width="20" height="15" rx="5" fill={`url(#tapewormBody-${stroke})`} stroke={stroke} strokeWidth="2">
            <animate attributeName="x" values="20;18;20" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="35" y="60" width="20" height="15" rx="5" fill={`url(#tapewormBody-${stroke})`} stroke={stroke} strokeWidth="2">
            <animate attributeName="x" values="35;37;35" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="50" y="50" width="20" height="15" rx="5" fill={`url(#tapewormBody-${stroke})`} stroke={stroke} strokeWidth="2">
            <animate attributeName="x" values="50;52;50" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="65" y="40" width="20" height="15" rx="5" fill={`url(#tapewormBody-${stroke})`} stroke={stroke} strokeWidth="2">
            <animate attributeName="x" values="65;67;65" dur="2s" repeatCount="indefinite" />
        </rect>
    </g>

    {/* 头部 */}
    <circle cx="85" cy="35" r="10" fill={`url(#tapewormBody-${stroke})`} stroke={stroke} strokeWidth="2">
        <animate attributeName="cx" values="85;87;85" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* 节段连接细节 */}
    <line x1="28" y1="70" x2="35" y2="75" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
    <line x1="43" y1="60" x2="50" y2="65" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
    <line x1="58" y1="50" x2="65" y2="55" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
    <line x1="73" y1="40" x2="80" y2="45" stroke={stroke} strokeWidth="1.5" opacity="0.5" />

    {isLowHp ? (
      <>
        {/* Low HP Eyes (X X) */}
        <g transform="translate(82, 33)">
           <path d="M-2 -2 L2 2 M2 -2 L-2 2" stroke="#2D3748" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        <g transform="translate(88, 33)">
           <path d="M-2 -2 L2 2 M2 -2 L-2 2" stroke="#2D3748" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        
        {/* Sweat Drop - Smaller */}
        <path d="M92 25 Q93 23 94 25 Q95 27 94 28 Q93 29 92 28" fill="#63B3ED" opacity="0.8">
           <animate attributeName="d" values="M92 25 Q93 23 94 25 Q95 27 94 28 Q93 29 92 28; M92 27 Q93 25 94 27 Q95 29 94 30 Q93 31 92 30" dur="1s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Low HP Mouth (Wavy/Trembling) */}
        <path d="M82 40 Q85 38 88 40" stroke="#2D3748" strokeWidth="1.2" strokeLinecap="round" fill="none">
             <animate attributeName="d" values="M82 40 Q85 38 88 40; M82 40 Q85 39 88 40; M82 40 Q85 38 88 40" dur="0.2s" repeatCount="indefinite" />
        </path>
      </>
    ) : (
      <>
        {/* 眼睛 */}
        <g transform="translate(82, 33)">
            <ellipse cx="0" cy="0" rx="3.5" ry="4.5" fill="white" />
            <circle cx="0.3" cy="0" r="2" fill="#2D3748" />
            <circle cx="0.8" cy="-0.7" r="0.8" fill="white" opacity="0.9" />
        </g>
        <g transform="translate(88, 33)">
            <ellipse cx="0" cy="0" rx="3.5" ry="4.5" fill="white" />
            <circle cx="-0.3" cy="0" r="2" fill="#2D3748" />
            <circle cx="0.2" cy="-0.7" r="0.8" fill="white" opacity="0.9" />
        </g>

        {/* 嘴巴 */}
        <path d="M82 38 Q85 41 88 38" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M82 38 Q85 41 88 38; M82 38 Q85 40 88 38; M82 38 Q85 41 88 38" dur="1.5s" repeatCount="indefinite" />
        </path>
      </>
    )}
  </svg>
);

const ProtozoaIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#9F7AEA", stroke = "#6B46C1", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`protozoaBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 主体 - 不规则形状脉动 */}
    <path d="M30 40 Q20 20 50 20 Q80 20 70 50 Q80 80 50 80 Q20 80 30 40" fill={`url(#protozoaBody-${stroke})`} stroke={stroke} strokeWidth="2">
        <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M30 40 Q20 20 50 20 Q80 20 70 50 Q80 80 50 80 Q20 80 30 40;
                  M28 42 Q18 22 50 22 Q82 22 72 50 Q82 82 50 82 Q18 82 28 42;
                  M30 40 Q20 20 50 20 Q80 20 70 50 Q80 80 50 80 Q20 80 30 40" />
    </path>

    {/* 细胞核 */}
    <ellipse cx="50" cy="50" rx="12" ry="10" fill={stroke} opacity="0.3">
        <animate attributeName="rx" values="12;13;12" dur="3s" repeatCount="indefinite" />
    </ellipse>

    {/* 伪足效果 - 动态伸出 */}
    <path d="M20 50 L10 50" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <animate attributeName="d" values="M20 50 L10 50; M20 50 L12 50; M20 50 L10 50" dur="2s" repeatCount="indefinite" />
    </path>
    <path d="M80 50 L90 50" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <animate attributeName="d" values="M80 50 L90 50; M80 50 L88 50; M80 50 L90 50" dur="2s" repeatCount="indefinite" />
    </path>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="40" cy="45" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="60" cy="55" r="2" fill="white" opacity="0.3">
        <animate attributeName="cy" values="55;57;55" dur="2.5s" repeatCount="indefinite" />
    </circle>

    {isLowHp ? (
      <>
        {/* Low HP Eyes (X X) */}
        <g transform="translate(42, 48)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g transform="translate(58, 48)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        
        {/* Sweat Drop */}
        <path d="M68 40 Q70 37 72 40 Q74 43 72 45 Q70 47 68 45" fill="#63B3ED" opacity="0.8">
           <animate attributeName="d" values="M68 40 Q70 37 72 40 Q74 43 72 45 Q70 47 68 45; M68 43 Q70 40 72 43 Q74 46 72 48 Q70 50 68 48" dur="1s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Low HP Mouth (Wavy/Trembling) */}
        <path d="M45 62 Q50 58 55 62" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
             <animate attributeName="d" values="M45 62 Q50 58 55 62; M45 62 Q50 60 55 62; M45 62 Q50 58 55 62" dur="0.2s" repeatCount="indefinite" />
        </path>
      </>
    ) : (
      <>
        {/* 眼睛 */}
        <g transform="translate(42, 48)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>
        <g transform="translate(58, 48)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>

        {/* 嘴巴 */}
        <path d="M45 60 Q50 63 55 60" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M45 60 Q50 63 55 60; M45 60 Q50 61 55 60; M45 60 Q50 63 55 60" dur="2s" repeatCount="indefinite" />
        </path>
      </>
    )}
  </svg>
);

const FungusIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#EDF2F7", stroke = "#CBD5E0", isLowHp }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`fungusBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 菌盖1 - 下方大 */}
    <ellipse cx="40" cy="60" rx="20" ry="25" fill={`url(#fungusBody-${stroke})`} stroke={stroke} strokeWidth="2">
        <animate attributeName="rx" values="20;21;20" dur="4s" repeatCount="indefinite" />
    </ellipse>

    {/* 菌盖2 - 中等 */}
    <ellipse cx="60" cy="40" rx="15" ry="18" fill={`url(#fungusBody-${stroke})`} stroke={stroke} strokeWidth="2">
        <animate attributeName="ry" values="18;19;18" dur="3.5s" repeatCount="indefinite" />
    </ellipse>

    {/* 菌盖3 - 顶部小 */}
    <ellipse cx="70" cy="25" rx="8" ry="10" fill={`url(#fungusBody-${stroke})`} stroke={stroke} strokeWidth="2">
        <animate attributeName="rx" values="8;9;8" dur="3s" repeatCount="indefinite" />
    </ellipse>

    {/* 孢子 - 飘浮物 */}
    <circle cx="25" cy="35" r="2" fill="white" opacity="0.4">
        <animate attributeName="cy" values="35;33;35" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="75" cy="50" r="1.5" fill="white" opacity="0.4">
        <animate attributeName="cy" values="50;52;50" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="65" cy="15" r="1.5" fill="white" opacity="0.4">
        <animate attributeName="cy" values="15;13;15" dur="2s" repeatCount="indefinite" />
    </circle>

    {isLowHp ? (
      <>
        {/* Low HP Eyes (X X) */}
        <g transform="translate(35, 58)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g transform="translate(45, 58)">
           <path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        
        {/* Sweat Drop */}
        <path d="M50 50 Q52 47 54 50 Q56 53 54 55 Q52 57 50 55" fill="#63B3ED" opacity="0.8">
           <animate attributeName="d" values="M50 50 Q52 47 54 50 Q56 53 54 55 Q52 57 50 55; M50 53 Q52 50 54 53 Q56 56 54 58 Q52 60 50 58" dur="1s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Low HP Mouth (Wavy/Trembling) */}
        <path d="M38 70 Q40 66 42 70" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
             <animate attributeName="d" values="M38 70 Q40 66 42 70; M38 70 Q40 68 42 70; M38 70 Q40 66 42 70" dur="0.2s" repeatCount="indefinite" />
        </path>
      </>
    ) : (
      <>
        {/* 眼睛 */}
        <g transform="translate(35, 58)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>
        <g transform="translate(45, 58)">
            <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
            <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
            <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
        </g>

        {/* 嘴巴 */}
        <path d="M38 68 Q40 71 42 68" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M38 68 Q40 71 42 68; M38 68 Q40 69 42 68; M38 68 Q40 71 42 68" dur="2s" repeatCount="indefinite" />
        </path>
      </>
    )}
  </svg>
);

// --- PROBIOTICS ---

const LactobacillusIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#68D391", stroke = "#38A169" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`lactoBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 细菌主体 - 脉动 */}
    <rect x="25" y="30" width="50" height="40" rx="20" fill={`url(#lactoBody-${stroke})`} stroke={stroke} strokeWidth="3">
        <animate attributeName="width" values="50;51;50" dur="3s" repeatCount="indefinite" />
    </rect>

    {/* 细胞核 */}
    <ellipse cx="50" cy="50" rx="18" ry="12" fill={stroke} opacity="0.2">
        <animate attributeName="rx" values="18;19;18" dur="4s" repeatCount="indefinite" />
    </ellipse>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="35" cy="45" r="3" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="50" cy="55" r="2.5" fill="white" opacity="0.3">
        <animate attributeName="cy" values="55;57;55" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="65" cy="45" r="3" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* 眼睛 */}
    <g transform="translate(42, 48)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>
    <g transform="translate(58, 48)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>

    {/* 嘴巴 */}
    <path d="M44 58 Q50 61 56 58" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M44 58 Q50 61 56 58; M44 58 Q50 59 56 58; M44 58 Q50 61 56 58" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
);

const BifidobacteriumIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#9F7AEA", stroke = "#805AD5" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`bifidoBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    <g transform="translate(15, 15)">
      {/* 双歧杆菌主体 - 两个椭圆相连 */}
      <ellipse cx="30" cy="35" rx="18" ry="22" fill={`url(#bifidoBody-${stroke})`} stroke={stroke} strokeWidth="3">
          <animate attributeName="rx" values="18;19;18" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="55" cy="35" rx="18" ry="22" fill={`url(#bifidoBody-${stroke})`} stroke={stroke} strokeWidth="3">
          <animate attributeName="rx" values="18;17;18" dur="3s" repeatCount="indefinite" />
      </ellipse>

      {/* 细胞核 */}
      <ellipse cx="30" cy="35" rx="8" ry="6" fill={stroke} opacity="0.3" />
      <ellipse cx="55" cy="35" rx="8" ry="6" fill={stroke} opacity="0.3" />

      {/* 连接细节 */}
      <path d="M22 30 Q30 25 38 30" stroke={stroke} strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M47 30 Q55 25 63 30" stroke={stroke} strokeWidth="2" fill="none" opacity="0.3" />

      {/* 内部颗粒 - 漂浮物 */}
      <circle cx="30" cy="35" r="2" fill="white" opacity="0.4">
          <animate attributeName="cy" values="35;33;35" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="55" cy="35" r="2" fill="white" opacity="0.4">
          <animate attributeName="cy" values="35;37;35" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* 眼睛 */}
      <g transform="translate(27, 33)">
          <ellipse cx="0" cy="0" rx="3.5" ry="4.5" fill="white" />
          <circle cx="0.3" cy="0" r="2" fill="#2D3748" />
          <circle cx="0.8" cy="-0.7" r="0.8" fill="white" opacity="0.9" />
      </g>
      <g transform="translate(58, 33)">
          <ellipse cx="0" cy="0" rx="3.5" ry="4.5" fill="white" />
          <circle cx="-0.3" cy="0" r="2" fill="#2D3748" />
          <circle cx="0.2" cy="-0.7" r="0.8" fill="white" opacity="0.9" />
      </g>

      {/* 嘴巴 */}
      <path d="M25 40 Q30 43 35 40" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <animate attributeName="d" values="M25 40 Q30 43 35 40; M25 40 Q30 41 35 40; M25 40 Q30 43 35 40" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M50 40 Q55 43 60 40" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <animate attributeName="d" values="M50 40 Q55 43 60 40; M50 40 Q55 41 60 40; M50 40 Q55 43 60 40" dur="2s" repeatCount="indefinite" />
      </path>
    </g>
  </svg>
);

const LactobacillusAcidophilusIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#F6E05E", stroke = "#D69E2E" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`lactoAcidoBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 细菌主体 - 脉动 */}
    <rect x="20" y="25" width="60" height="50" rx="25" fill={`url(#lactoAcidoBody-${stroke})`} stroke={stroke} strokeWidth="3">
        <animate attributeName="width" values="60;61;60" dur="3s" repeatCount="indefinite" />
    </rect>

    {/* 细胞核 */}
    <ellipse cx="50" cy="50" rx="22" ry="15" fill={stroke} opacity="0.2">
        <animate attributeName="rx" values="22;23;22" dur="4s" repeatCount="indefinite" />
    </ellipse>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="35" cy="45" r="4" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="50" cy="55" r="3" fill="white" opacity="0.3">
        <animate attributeName="cy" values="55;57;55" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="65" cy="45" r="4" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* 眼睛 */}
    <g transform="translate(42, 48)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>
    <g transform="translate(58, 48)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>

    {/* 嘴巴 */}
    <path d="M44 58 Q50 62 56 58" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M44 58 Q50 62 56 58; M44 58 Q50 60 56 58; M44 58 Q50 62 56 58" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
);

const LactobacillusRhamnosusIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#4FD1C5", stroke = "#319795" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`lactoRhamnoBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 不规则长条形状 - 脉动 */}
    <path d="M25 30 C20 30 15 40 20 50 C15 60 20 70 25 70 L75 70 C80 70 85 60 80 50 C85 40 80 30 75 30 Z" fill={`url(#lactoRhamnoBody-${stroke})`} stroke={stroke} strokeWidth="3">
        <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M25 30 C20 30 15 40 20 50 C15 60 20 70 25 70 L75 70 C80 70 85 60 80 50 C85 40 80 30 75 30 Z;
                  M23 28 C18 28 13 38 18 50 C13 62 18 72 23 72 L77 72 C82 72 87 62 82 50 C87 38 82 28 77 28 Z;
                  M25 30 C20 30 15 40 20 50 C15 60 20 70 25 70 L75 70 C80 70 85 60 80 50 C85 40 80 30 75 30 Z" />
    </path>

    {/* 细胞核 */}
    <ellipse cx="50" cy="50" rx="20" ry="12" fill={stroke} opacity="0.2">
        <animate attributeName="rx" values="20;21;20" dur="4s" repeatCount="indefinite" />
    </ellipse>

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="35" cy="45" r="3" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="50" cy="55" r="2.5" fill="white" opacity="0.3">
        <animate attributeName="cy" values="55;57;55" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="65" cy="45" r="3" fill="white" opacity="0.3">
        <animate attributeName="cy" values="45;43;45" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* 眼睛 */}
    <g transform="translate(42, 48)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>
    <g transform="translate(58, 48)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>

    {/* 嘴巴 */}
    <path d="M44 58 Q50 61 56 58" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M44 58 Q50 61 56 58; M44 58 Q50 59 56 58; M44 58 Q50 61 56 58" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
);

const SaccharomycesIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%", color = "#F687B3", stroke = "#D53F8C" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`yeastBody-${stroke}`} cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={stroke} />
      </radialGradient>
    </defs>

    {/* 主酵母细胞 - 脉动 */}
    <ellipse cx="50" cy="50" rx="30" ry="25" fill={`url(#yeastBody-${stroke})`} stroke={stroke} strokeWidth="3">
        <animate attributeName="rx" values="30;31;30" dur="3s" repeatCount="indefinite" />
    </ellipse>

    {/* 细胞核 */}
    <ellipse cx="50" cy="50" rx="12" ry="10" fill={stroke} opacity="0.3">
        <animate attributeName="rx" values="12;13;12" dur="4s" repeatCount="indefinite" />
    </ellipse>

    {/* 芽生效果 - 小酵母细胞 */}
    <ellipse cx="35" cy="35" rx="8" fill={`url(#yeastBody-${stroke})`} stroke={stroke} strokeWidth="2" opacity="0.7">
        <animate attributeName="rx" values="8;9;8" dur="3s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="68" cy="55" rx="6" fill={`url(#yeastBody-${stroke})`} stroke={stroke} strokeWidth="2" opacity="0.7">
        <animate attributeName="rx" values="6;7;6" dur="3s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="35" cy="65" rx="5" fill={`url(#yeastBody-${stroke})`} stroke={stroke} strokeWidth="2" opacity="0.7">
        <animate attributeName="rx" values="5;6;5" dur="3s" repeatCount="indefinite" />
    </ellipse>

    {/* 芽生连接 */}
    <path d="M40 42 Q45 38 42 35" stroke={stroke} strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M60 53 Q65 55 68 55" stroke={stroke} strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M45 58 Q40 62 35 65" stroke={stroke} strokeWidth="2" fill="none" opacity="0.5" />

    {/* 内部颗粒 - 漂浮物 */}
    <circle cx="50" cy="50" r="2" fill="white" opacity="0.4">
        <animate attributeName="cy" values="50;48;50" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* 眼睛 */}
    <g transform="translate(42, 48)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="1.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>
    <g transform="translate(58, 48)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="white" />
        <circle cx="-0.5" cy="0" r="2" fill="#2D3748" />
        <circle cx="0.2" cy="-0.8" r="1" fill="white" opacity="0.9" />
    </g>

    {/* 嘴巴 */}
    <path d="M45 58 Q50 62 55 58" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M45 58 Q50 62 55 58; M45 58 Q50 60 55 58; M45 58 Q50 62 55 58" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
);

// --- OTHERS ---

export const AllyIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#4FD1C5" opacity="0.2" />
    <rect x="42" y="20" width="16" height="60" rx="2" fill="#38B2AC" />
    <rect x="20" y="42" width="60" height="16" rx="2" fill="#38B2AC" />
    <circle cx="50" cy="50" r="45" stroke="#38B2AC" strokeWidth="2" strokeDasharray="5 5">
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export const ExitIcon: React.FC<IconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="10" width="70" height="80" fill="#92400E" stroke="#78350F" strokeWidth="4" />
    <rect x="20" y="15" width="60" height="70" fill="#D97706" />
    <rect x="20" y="15" width="25" height="35" fill="#B45309" />
    <circle cx="65" cy="50" r="5" fill="#FCD34D" stroke="#B45309" strokeWidth="2" />
    <path d="M65 50 L65 45" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 85 L80 85 L90 95 L10 95 Z" fill="#78350F" />
    <rect x="15" y="10" width="70" height="80" stroke="#FCD34D" strokeWidth="3" opacity="0.5" />
    <text x="50" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#FEF3C7">EXIT</text>
  </svg>
);

export const getCharacterIcon = (type: string, subtype?: string, props: IconProps = {}) => {
  // Immune Cells
  if (type === 'macrophage') return <MacrophageIcon {...props} />;
  if (type === 'neutrophil') return <NeutrophilIcon {...props} />;
  if (type === 'tcell') return <TCellIcon {...props} />;
  if (type === 'bcell') return <BCellIcon {...props} />;
  if (type === 'nkcell') return <NKCellIcon {...props} />;

  // Probiotics
  if (type === 'probiotic') {
    switch (subtype) {
      case 'lactobacillus': return <LactobacillusIcon {...props} color="#68D391" stroke="#38A169" />;
      case 'bifidobacterium': return <BifidobacteriumIcon {...props} color="#9F7AEA" stroke="#805AD5" />;
      case 'lactobacillus_acidophilus': return <LactobacillusAcidophilusIcon {...props} color="#F6E05E" stroke="#D69E2E" />;
      case 'lactobacillus_rhamnosus': return <LactobacillusRhamnosusIcon {...props} color="#4FD1C5" stroke="#319795" />;
      case 'saccharomyces': return <SaccharomycesIcon {...props} color="#F687B3" stroke="#D53F8C" />;
      default: return <LactobacillusIcon {...props} />;
    }
  }

  // Pathogens
  if (type === 'bacteria') {
    switch (subtype) {
      case 'e_coli': return <RodBacteriaIcon {...props} color="#48BB78" stroke="#2F855A" />;
      case 'staph_epidermidis': return <CocciBacteriaIcon {...props} color="#D6BCFA" stroke="#9F7AEA" />;
      case 'strep_pneumoniae': return <CocciBacteriaIcon {...props} color="#63B3ED" stroke="#3182CE" />;
      case 'candida_albicans': return <FungusIcon {...props} color="#FFF5F5" stroke="#E2E8F0" />;
      case 'yeast': return <FungusIcon {...props} color="#F6E05E" stroke="#D69E2E" />;
      case 'haemophilus': return <RodBacteriaIcon {...props} color="#FC8181" stroke="#E53E3E" />;
      case 'moraxella': return <CocciBacteriaIcon {...props} color="#FBD38D" stroke="#DD6B20" />;
      case 'enterococcus': return <CocciBacteriaIcon {...props} color="#4299E1" stroke="#2B6CB0" />;
      case 'proteus': return <RodBacteriaIcon {...props} color="#B7791F" stroke="#975A16" />;
      case 'salmonella': return <RodBacteriaIcon {...props} color="#F687B3" stroke="#D53F8C" />;
      case 'h_pylori': return <SpiralBacteriaIcon {...props} color="#FAF089" stroke="#D69E2E" />;
      case 'pertussis': return <RodBacteriaIcon {...props} color="#4FD1C5" stroke="#319795" />;
      case 'tetanus': return <RodBacteriaIcon {...props} color="#C05621" stroke="#9C4221" />;
      case 'pseudomonas': return <RodBacteriaIcon {...props} color="#38B2AC" stroke="#2C7A7B" />;
      case 'golden_staph': return <CocciBacteriaIcon {...props} color="#F6E05E" stroke="#B7791F" />;
      case 'shigella': return <RodBacteriaIcon {...props} color="#9B2C2C" stroke="#742A2A" />;
      case 'typhoid': return <RodBacteriaIcon {...props} color="#805AD5" stroke="#553C9A" />;
      case 'cholera': return <SpiralBacteriaIcon {...props} color="#63B3ED" stroke="#2B6CB0" />;
      case 'klebsiella': return <RodBacteriaIcon {...props} color="#68D391" stroke="#2F855A" />;
      case 'chlamydia': return <CocciBacteriaIcon {...props} color="#FBB6CE" stroke="#D53F8C" />;
      case 'leptospira_mild': return <SpiralBacteriaIcon {...props} color="#9AE6B4" stroke="#48BB78" />;
      case 'candida_invasive': return <FungusIcon {...props} color="#FEB2B2" stroke="#E53E3E" />;
      case 'legionella': return <RodBacteriaIcon {...props} color="#CBD5E0" stroke="#718096" />;
      case 'tuberculosis': return <RodBacteriaIcon {...props} color="#F6E05E" stroke="#D69E2E" />;
      case 'mrsa': return <CocciBacteriaIcon {...props} color="#D69E2E" stroke="#744210" />;
      case 'cre': return <RodBacteriaIcon {...props} color="#2F855A" stroke="#22543D" />;
      case 'anthrax': return <RodBacteriaIcon {...props} color="#4A5568" stroke="#1A202C" />;
      default: return <RodBacteriaIcon {...props} />;
    }
  }

  if (type === 'virus') {
    switch (subtype) {
      case 'rhinovirus': return <GeometricVirusIcon {...props} color="#68D391" stroke="#2F855A" />;
      case 'adenovirus': return <GeometricVirusIcon {...props} color="#F687B3" stroke="#D53F8C" />;
      case 'parainfluenza': return <SpikyVirusIcon {...props} color="#90CDF4" stroke="#4299E1" />;
      case 'influenza': return <SpikyVirusIcon {...props} color="#A0AEC0" stroke="#4A5568" />;
      case 'measles': return <SpikyVirusIcon {...props} color="#FC8181" stroke="#C53030" />;
      case 'varicella': return <SpikyVirusIcon {...props} color="#D6BCFA" stroke="#805AD5" />;
      case 'rsv': return <SpikyVirusIcon {...props} color="#FBD38D" stroke="#DD6B20" />;
      case 'mumps': return <SpikyVirusIcon {...props} color="#63B3ED" stroke="#3182CE" />;
      case 'hepatitis': return <GeometricVirusIcon {...props} color="#F6E05E" stroke="#D69E2E" />;
      case 'influenza_b': return <SpikyVirusIcon {...props} color="#4299E1" stroke="#2B6CB0" />;
      case 'polio': return <GeometricVirusIcon {...props} color="#CBD5E0" stroke="#718096" />;
      case 'marburg': return <FiloVirusIcon {...props} color="#805AD5" stroke="#553C9A" />;
      case 'smallpox': return <GeometricVirusIcon {...props} color="#C53030" stroke="#9B2C2C" />;
      case 'rabies': return <BulletVirusIcon {...props} color="#2D3748" stroke="#1A202C" />;
      case 'dengue': return <GeometricVirusIcon {...props} color="#ED8936" stroke="#C05621" />;
      case 'west_nile': return <GeometricVirusIcon {...props} color="#4299E1" stroke="#2C5282" />;
      case 'yellow_fever': return <GeometricVirusIcon {...props} color="#ECC94B" stroke="#B7791F" />;
      case 'sars': return <SpikyVirusIcon {...props} color="#FAF089" stroke="#D69E2E" />;
      case 'mers': return <SpikyVirusIcon {...props} color="#E2E8F0" stroke="#A0AEC0" />;
      case 'zika_virus': return <GeometricVirusIcon {...props} color="#48BB78" stroke="#276749" />;
      case 'chikungunya': return <GeometricVirusIcon {...props} color="#F56565" stroke="#C53030" />;
      case 'hiv': return <SpikyVirusIcon {...props} color="#9B2C2C" stroke="#742A2A" />;
      case 'ebola': return <FiloVirusIcon {...props} color="#E53E3E" stroke="#742A2A" />;
      case 'lassa_fever': return <GeometricVirusIcon {...props} color="#B7791F" stroke="#744210" />;
      case 'nipah_virus': return <SpikyVirusIcon {...props} color="#2D3748" stroke="#000000" />;
      case 'hantavirus': return <GeometricVirusIcon {...props} color="#718096" stroke="#4A5568" />;
      default: return <SpikyVirusIcon {...props} />;
    }
  }

  if (type === 'parasite') {
    switch (subtype) {
      case 'roundworm': return <WormParasiteIcon {...props} color="#F687B3" stroke="#D53F8C" />;
      case 'hookworm': return <WormParasiteIcon {...props} color="#FC8181" stroke="#E53E3E" />;
      case 'filarial_worm': return <WormParasiteIcon {...props} color="#EDF2F7" stroke="#A0AEC0" />;
      case 'tapeworm': return <TapewormIcon {...props} color="#F6E05E" stroke="#D69E2E" />;
      case 'malaria': return <ProtozoaIcon {...props} color="#9F7AEA" stroke="#6B46C1" />;
      case 'trypanosome': return <ProtozoaIcon {...props} color="#63B3ED" stroke="#3182CE" />;
      case 'leishmania': return <ProtozoaIcon {...props} color="#FBD38D" stroke="#DD6B20" />;
      case 'schistosoma': return <WormParasiteIcon {...props} color="#C53030" stroke="#742A2A" />;
      case 'cysticercosis': return <TapewormIcon {...props} color="#EDF2F7" stroke="#CBD5E0" />;
      case 'trichinella': return <WormParasiteIcon {...props} color="#D6BCFA" stroke="#805AD5" />;
      default: return <WormParasiteIcon {...props} />;
    }
  }

  return <div>❓</div>;
};
