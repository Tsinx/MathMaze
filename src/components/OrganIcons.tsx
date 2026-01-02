import React from 'react';

interface OrganIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

// 通用渐变定义组件，防止重复定义ID冲突（虽然SVG局部ID在React中可能冲突，尽量用唯一ID）
// 这里每个组件内部定义自己的 defs 比较安全，或者使用 uuid。为了简单，手动加前缀。

// 1. 口腔 (Mouth)
export const MouthIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mouthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9A9E" />
        <stop offset="100%" stopColor="#F6416C" />
      </linearGradient>
    </defs>
    {/* 嘴唇 */}
    <path 
      d="M20,50 Q50,80 80,50 Q50,90 20,50 Z" 
      fill="url(#mouthGradient)" 
      stroke="#D93654" 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
    <path 
      d="M20,50 Q50,20 80,50 Q50,40 20,50 Z" 
      fill="#FFB7B2" 
      stroke="#D93654" 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
    {/* 牙齿暗示 */}
    <path d="M35,50 L40,55 M45,50 L50,55 M55,50 L60,55 M65,50 L70,55" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 2. 鼻腔 (Nose)
export const NoseIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="noseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD1FF" />
        <stop offset="100%" stopColor="#FAD0C4" />
      </linearGradient>
    </defs>
    <path 
      d="M50,20 C40,20 35,50 25,60 C20,65 20,75 30,80 C40,85 60,85 70,80 C80,75 80,65 75,60 C65,50 60,20 50,20 Z" 
      fill="url(#noseGradient)" 
      stroke="#E0A69D" 
      strokeWidth="2"
    />
    {/* 鼻孔 */}
    <ellipse cx="40" cy="70" rx="4" ry="6" fill="#CC8888" opacity="0.6" />
    <ellipse cx="60" cy="70" rx="4" ry="6" fill="#CC8888" opacity="0.6" />
  </svg>
);

// 3. 皮肤 (Skin)
export const SkinIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE5D9" />
        <stop offset="100%" stopColor="#FFD7BA" />
      </linearGradient>
    </defs>
    {/* 皮肤层 */}
    <rect x="20" y="40" width="60" height="40" rx="5" fill="url(#skinGradient)" stroke="#E8C3B0" strokeWidth="2" />
    {/* 毛发 */}
    <path d="M30,40 Q25,20 35,15" fill="none" stroke="#8D6E63" strokeWidth="2" />
    <path d="M50,40 Q55,25 45,20" fill="none" stroke="#8D6E63" strokeWidth="2" />
    <path d="M70,40 Q75,20 80,15" fill="none" stroke="#8D6E63" strokeWidth="2" />
  </svg>
);

// 4. 耳朵 (Ear)
export const EarIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="earGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE0D0" />
        <stop offset="100%" stopColor="#FFCCB0" />
      </linearGradient>
    </defs>
    <path 
      d="M40,20 C20,20 20,70 40,85 C50,92 70,80 70,60 C70,40 80,30 70,20 C60,10 50,20 40,20 Z" 
      fill="url(#earGradient)" 
      stroke="#E0A69D" 
      strokeWidth="2"
    />
    {/* 耳廓内部 */}
    <path d="M45,35 C35,35 35,65 45,70 C55,75 60,60 55,50" fill="none" stroke="#D6968B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 5. 胃部 (Stomach)
export const StomachIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stomachGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff9a9e" />
        <stop offset="100%" stopColor="#fecfef" />
      </linearGradient>
      <filter id="glowStomach" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* 食管入口 */}
    <path d="M55,5 L55,20" stroke="#ff9a9e" strokeWidth="8" strokeLinecap="round" />

    {/* 胃主体 (J形结构) */}
    <path 
      d="M52,20 
         C40,15 20,25 20,50 
         C20,80 40,95 70,90 
         C85,88 90,80 90,70 
         L90,60 
         C80,60 70,55 65,40 
         C62,30 60,25 58,20 Z" 
      fill="url(#stomachGradient)" 
      stroke="#ff758c" 
      strokeWidth="2"
      filter="url(#glowStomach)"
    />
    
    {/* 胃皱襞 (Rugae) - 内部纹理 */}
    <path d="M35,40 Q40,50 35,60" fill="none" stroke="#e68a8f" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M45,35 Q50,55 45,75" fill="none" stroke="#e68a8f" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M55,40 Q60,60 55,80" fill="none" stroke="#e68a8f" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    
    {/* 高光 */}
    <path d="M30,35 Q40,30 45,40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <circle cx="75" cy="75" r="4" fill="white" opacity="0.3" />
  </svg>
);

// 6. 肠道 (Intestine) - 已有
export const IntestineIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="intestineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBC2EB" />
        <stop offset="100%" stopColor="#A6C1EE" />
      </linearGradient>
    </defs>
    <path 
      d="M25,75 C15,75 15,35 25,35 C25,25 75,25 75,35 C85,35 85,75 75,75" 
      fill="none" 
      stroke="#F687B3" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M35,45 C30,55 40,65 50,55 C60,45 70,55 65,65 C60,75 40,75 35,65" 
      fill="none" 
      stroke="url(#intestineGradient)" 
      strokeWidth="8" 
      strokeLinecap="round"
    />
    <path d="M25,35 C25,28 75,28 75,35" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
  </svg>
);

// 7. 咽喉 (Throat)
export const ThroatIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="throatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFC3A0" />
        <stop offset="100%" stopColor="#FFAFBD" />
      </linearGradient>
    </defs>
    {/* 脖子轮廓 */}
    <path 
      d="M30,20 L30,80 C30,90 70,90 70,80 L70,20" 
      fill="url(#throatGradient)" 
      stroke="#FF9A9E" 
      strokeWidth="2"
    />
    {/* 声带/喉结示意 */}
    <path d="M40,40 Q50,50 60,40" fill="none" stroke="#D67B7B" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    <path d="M30,80 Q50,95 70,80" fill="none" stroke="#D67B7B" strokeWidth="2" opacity="0.3" />
  </svg>
);

// 8. 肺部 (Lung)
export const LungIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lungGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0C3FC" />
        <stop offset="100%" stopColor="#8EC5FC" />
      </linearGradient>
    </defs>
    {/* 气管 */}
    <path d="M50,15 L50,35" stroke="#A9A9A9" strokeWidth="6" strokeLinecap="round" />
    {/* 左肺 */}
    <path 
      d="M50,35 Q20,30 15,60 Q10,85 45,85 Q50,85 50,35 Z" 
      fill="url(#lungGradient)" 
      stroke="#88A0D0" 
      strokeWidth="1"
    />
    {/* 右肺 */}
    <path 
      d="M50,35 Q80,30 85,60 Q90,85 55,85 Q50,85 50,35 Z" 
      fill="url(#lungGradient)" 
      stroke="#88A0D0" 
      strokeWidth="1"
    />
    {/* 肺泡纹理 */}
    <circle cx="30" cy="55" r="2" fill="white" opacity="0.4" />
    <circle cx="70" cy="55" r="2" fill="white" opacity="0.4" />
    <circle cx="35" cy="70" r="2" fill="white" opacity="0.4" />
  </svg>
);

// 9. 肝脏 (Liver)
export const LiverIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="liverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d95757" />
        <stop offset="100%" stopColor="#9c2a2a" />
      </linearGradient>
    </defs>
    
    {/* 肝右叶 (Right Lobe) - 大而圆润 */}
    <path 
      d="M45,20 
         C70,15 90,30 95,50 
         C98,70 90,85 55,85 
         L50,85 
         L45,20 Z" 
      fill="url(#liverGradient)" 
      stroke="#7b1e1e" 
      strokeWidth="2"
    />
    
    {/* 肝左叶 (Left Lobe) - 较小，延伸至左侧 */}
    <path 
      d="M45,20 
         L50,85 
         C30,80 15,65 10,50 
         C10,35 25,25 45,20 Z" 
      fill="url(#liverGradient)" 
      stroke="#7b1e1e" 
      strokeWidth="2"
    />

    {/* 镰状韧带 (Falciform Ligament) - 分隔左右叶 */}
    <path d="M45,20 L50,60" fill="none" stroke="#7b1e1e" strokeWidth="2" strokeOpacity="0.5" />

    {/* 胆囊 (Gallbladder) - 露出一点绿色 */}
    <path 
      d="M55,85 C60,95 70,92 65,85" 
      fill="#4caf50" 
      stroke="#2e7d32" 
      strokeWidth="1"
    />
    
    {/* 光影细节 */}
    <ellipse cx="70" cy="40" rx="15" ry="8" fill="white" opacity="0.15" transform="rotate(-15 70 40)" />
    <path d="M25,40 Q35,35 40,40" fill="none" stroke="white" opacity="0.15" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 10. 血管/血液 (Blood)
export const BloodIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bloodGradient" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FF512F" />
        <stop offset="100%" stopColor="#DD2476" />
      </radialGradient>
    </defs>
    {/* 血滴形状 */}
    <path 
      d="M50,15 Q80,50 80,70 C80,86 66,100 50,100 C34,100 20,86 20,70 Q20,50 50,15 Z" 
      fill="url(#bloodGradient)" 
      stroke="#900C3F" 
      strokeWidth="1"
    />
    {/* 高光 */}
    <ellipse cx="35" cy="50" rx="5" ry="10" fill="white" opacity="0.4" transform="rotate(20 35 50)" />
  </svg>
);

// 11. 肾脏 (Kidney) - 已有
export const KidneyIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kidneyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C06C84" />
        <stop offset="100%" stopColor="#6C5B7B" />
      </linearGradient>
    </defs>
    <path 
      d="M30,30 C10,30 10,70 30,70 C40,70 40,60 40,50 C40,40 40,30 30,30 Z" 
      fill="url(#kidneyGradient)" 
      stroke="#355C7D" 
      strokeWidth="1"
    />
    <path 
      d="M70,30 C90,30 90,70 70,70 C60,70 60,60 60,50 C60,40 60,30 70,30 Z" 
      fill="url(#kidneyGradient)" 
      stroke="#355C7D" 
      strokeWidth="1"
    />
    <path d="M40,50 L50,60 L60,50" fill="none" stroke="#F8B195" strokeWidth="3" strokeLinecap="round" />
    <circle cx="25" cy="40" r="3" fill="white" opacity="0.3" />
    <circle cx="75" cy="40" r="3" fill="white" opacity="0.3" />
  </svg>
);

// 12. 心脏 (Heart)
export const HeartIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF416C" />
        <stop offset="100%" stopColor="#FF4B2B" />
      </linearGradient>
    </defs>
    {/* 解剖心脏简化 */}
    <path 
      d="M50,30 C70,10 90,30 90,50 C90,75 50,95 50,95 C50,95 10,75 10,50 C10,30 30,10 50,30 Z" 
      fill="url(#heartGradient)" 
      stroke="#C70039" 
      strokeWidth="1"
    />
    {/* 血管 */}
    <path d="M35,30 L35,15" stroke="#900C3F" strokeWidth="4" />
    <path d="M65,30 L65,15" stroke="#900C3F" strokeWidth="4" />
    <path d="M30,40 Q50,50 70,40" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
  </svg>
);

// 13. 大脑 (Brain)
export const BrainIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff9a9e" />
        <stop offset="100%" stopColor="#fecfef" />
      </linearGradient>
      <linearGradient id="cerebellumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eeb8c3" />
        <stop offset="100%" stopColor="#f7dbe0" />
      </linearGradient>
    </defs>
    
    {/* 脑干 (Brainstem) - 更细小，位置微调 */}
    <path 
      d="M48,70 Q48,85 46,95 L56,95 Q54,85 54,70" 
      fill="#eacacb" 
      stroke="#c0848e" 
      strokeWidth="2"
    />

    {/* 小脑 (Cerebellum) - 显著缩小，藏在后下方 */}
    <path 
      d="M56,72 C60,68 80,70 82,80 C83,86 75,90 65,88 C58,86 56,80 56,72 Z" 
      fill="url(#cerebellumGradient)" 
      stroke="#c0848e" 
      strokeWidth="2"
    />
    {/* 小脑纹理 */}
    <path d="M59,78 Q68,76 75,80" fill="none" stroke="#c0848e" strokeWidth="1" />
    <path d="M61,83 Q70,81 72,85" fill="none" stroke="#c0848e" strokeWidth="1" />

    {/* 大脑 (Cerebrum) - 保持主体，覆盖连接处 */}
    <path 
      d="M20,65 C10,45 20,15 50,15 C75,15 92,30 92,55 C92,66 82,68 75,66 C68,64 60,65 55,65 C50,65 40,70 20,65 Z" 
      fill="url(#brainGradient)" 
      stroke="#d97b8b" 
      strokeWidth="2"
    />
    
    {/* 脑回 (Gyri/Sulci) */}
    {/* 额叶 */}
    <path d="M25,55 C20,40 30,25 45,30 C50,32 50,40 45,45" fill="none" stroke="#d97b8b" strokeWidth="2" strokeLinecap="round" />
    {/* 顶叶 */}
    <path d="M50,25 C60,20 75,20 80,35" fill="none" stroke="#d97b8b" strokeWidth="2" strokeLinecap="round" />
    {/* 枕叶 */}
    <path d="M80,40 C85,50 85,58 78,62" fill="none" stroke="#d97b8b" strokeWidth="2" strokeLinecap="round" />
    {/* 颞叶 */}
    <path d="M30,65 C40,60 55,60 60,65" fill="none" stroke="#d97b8b" strokeWidth="2" strokeLinecap="round" />
    {/* 中央区域 */}
    <path d="M50,45 C55,40 65,40 70,50" fill="none" stroke="#d97b8b" strokeWidth="2" strokeLinecap="round" />
    <path d="M45,30 L45,20" fill="none" stroke="#d97b8b" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 14. 心血管 (Cardiovascular)
export const CardioIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="arteryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff416c" />
        <stop offset="100%" stopColor="#ff4b2b" />
      </linearGradient>
      <linearGradient id="veinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
    </defs>
    
    {/* 身体轮廓暗示 */}
    <path 
      d="M30,10 C10,30 10,70 30,90 C50,100 70,90 70,90" 
      fill="none" 
      stroke="#ffe5d9" 
      strokeWidth="2" 
      strokeDasharray="4 4"
      opacity="0.3"
    />

    {/* 心脏主体 (简化解剖形) */}
    <path 
      d="M50,40 C65,30 75,40 75,55 C75,70 50,85 50,85 C50,85 25,70 25,55 C25,40 35,30 50,40 Z" 
      fill="url(#arteryGradient)" 
      stroke="#c70039" 
      strokeWidth="1"
    />
    
    {/* 动脉系统 (红色 - 离开心脏) */}
    {/* 主动脉弓 */}
    <path d="M50,40 C50,25 60,20 65,25" fill="none" stroke="#ff4b2b" strokeWidth="4" strokeLinecap="round" />
    {/* 上行分支 */}
    <path d="M55,25 L55,15" fill="none" stroke="#ff4b2b" strokeWidth="2" strokeLinecap="round" />
    <path d="M60,22 L65,15" fill="none" stroke="#ff4b2b" strokeWidth="2" strokeLinecap="round" />
    {/* 下行分支 */}
    <path d="M50,85 L50,95" fill="none" stroke="#ff4b2b" strokeWidth="3" strokeLinecap="round" />
    <path d="M50,90 L35,100" fill="none" stroke="#ff4b2b" strokeWidth="2" strokeLinecap="round" />
    <path d="M50,90 L65,100" fill="none" stroke="#ff4b2b" strokeWidth="2" strokeLinecap="round" />

    {/* 静脉系统 (蓝色 - 回到心脏) */}
    {/* 上腔静脉 */}
    <path d="M35,40 L35,20" fill="none" stroke="#4facfe" strokeWidth="3" strokeLinecap="round" />
    <path d="M35,25 L20,15" fill="none" stroke="#4facfe" strokeWidth="2" strokeLinecap="round" />
    <path d="M35,25 L50,15" fill="none" stroke="#4facfe" strokeWidth="2" strokeLinecap="round" />
    {/* 下腔静脉 */}
    <path d="M35,60 L35,90" fill="none" stroke="#4facfe" strokeWidth="3" strokeLinecap="round" />

    {/* 肺循环暗示 */}
    <path d="M25,55 L10,50" fill="none" stroke="#4facfe" strokeWidth="2" strokeDasharray="2 2" />
    <path d="M75,55 L90,50" fill="none" stroke="#ff4b2b" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);

// 15. 中枢神经 (Nervous)
export const NervousIcon: React.FC<OrganIconProps> = ({ className, width = "100%", height = "100%" }) => (
  <svg viewBox="0 0 100 100" width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nervousGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdfbfb" />
        <stop offset="100%" stopColor="#ebedee" />
      </linearGradient>
    </defs>
    {/* 神经元主体 */}
    <circle cx="50" cy="40" r="15" fill="#FFD200" stroke="#FDB931" strokeWidth="2" />
    {/* 轴突 */}
    <path d="M50,55 L50,90" stroke="#FFD200" strokeWidth="4" strokeLinecap="round" />
    {/* 树突 */}
    <path d="M50,25 L50,10" stroke="#FFD200" strokeWidth="2" strokeLinecap="round" />
    <path d="M38,32 L25,20" stroke="#FFD200" strokeWidth="2" strokeLinecap="round" />
    <path d="M62,32 L75,20" stroke="#FFD200" strokeWidth="2" strokeLinecap="round" />
    {/* 闪电信号 */}
    <path d="M60,40 L70,50 L65,60 L75,70" fill="none" stroke="#00C9FF" strokeWidth="2" />
  </svg>
);


// 获取器官图标的辅助函数
export const getOrganIcon = (organId: string, className?: string) => {
  const props = { className, width: "100%", height: "100%" };
  
  switch (organId) {
    case 'mouth': return <MouthIcon {...props} />;
    case 'nose': return <NoseIcon {...props} />;
    case 'skin': return <SkinIcon {...props} />;
    case 'ear': return <EarIcon {...props} />;
    case 'throat': return <ThroatIcon {...props} />;
    case 'stomach': return <StomachIcon {...props} />;
    case 'intestine': return <IntestineIcon {...props} />;
    case 'lung': return <LungIcon {...props} />;
    case 'liver': return <LiverIcon {...props} />;
    case 'blood': return <BloodIcon {...props} />;
    case 'kidney': return <KidneyIcon {...props} />;
    case 'heart': return <HeartIcon {...props} />;
    case 'brain': return <BrainIcon {...props} />;
    case 'cardiovascular': return <CardioIcon {...props} />;
    case 'nervous': return <NervousIcon {...props} />;
    default: return null;
  }
};
