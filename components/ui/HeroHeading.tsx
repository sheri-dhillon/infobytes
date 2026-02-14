import React from 'react';

type Align = 'left' | 'center';

type HeroHeadingProps = {
  pre?: React.ReactNode;
  main: React.ReactNode;
  align?: Align;
  className?: string;
  preClassName?: string;
  mainClassName?: string;
};

export const HeroHeading: React.FC<HeroHeadingProps> = ({
  pre,
  main,
  align = 'left',
  className = '',
  preClassName = '',
  mainClassName = '',
}) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <h1 className={`${alignClass} ${className}`.trim()}>
      {pre ? (
        <span
          className={
            `block text-[clamp(2.1rem,4vw,4.8rem)] leading-[0.95] font-serif italic text-white mb-3 ${preClassName}`.trim()
          }
        >
          {pre}
        </span>
      ) : null}
      <span
        className={
          `block text-[clamp(3.1rem,6.8vw,6.9rem)] leading-[0.86] md:leading-[0.84] font-black tracking-tighter text-white mix-blend-overlay opacity-90 ${mainClassName}`.trim()
        }
      >
        {main}
      </span>
    </h1>
  );
};
