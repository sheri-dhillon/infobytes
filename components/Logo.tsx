import React, { useMemo, useState } from 'react';
import defaultLogoUrl from '../logo.svg';

type LogoProps = {
  className?: string;
  src?: string;
  alt?: string;
};

const DEFAULT_LOGO_SRC = defaultLogoUrl;

export const Logo: React.FC<LogoProps> = ({
  className = 'h-8 w-auto',
  src,
  alt = 'InfoBytes',
}) => {
  const [failed, setFailed] = useState(false);

  const effectiveSrc = useMemo(() => {
    const trimmed = (src || '').trim();
    return trimmed.length ? trimmed : DEFAULT_LOGO_SRC;
  }, [src]);

  return (
    <span className={`${className} inline-flex items-center min-w-0 max-w-full`} aria-label={alt}>
      {!failed && effectiveSrc ? (
        <img
          src={effectiveSrc}
          alt={alt}
          className="h-full w-auto max-w-full object-contain"
          loading="eager"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="h-full inline-flex items-center whitespace-nowrap font-black tracking-tight uppercase text-white">
          InfoBytes
        </span>
      )}
    </span>
  );
};