import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => (
  <img 
    src="https://lh3.googleusercontent.com/pw/AP1GczMy7wJgP62gL5nbdl9EWG4LJVgV571bKzwNkFJKmtAEzqNcx8DdoDls6SupQYADTc_EiMvxq6Tog1tgxVPnG7QSTUypv22FlcWlvrUQJPZG0ZBZmPcR-U75oBt8FE9mUy92xiEA1a34sISllhRCOj0k=w1080-h324-s-no-gm"
    alt="INFOBYTES"
    className={`${className} object-contain`}
  />
);