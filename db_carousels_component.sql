
-- Insert Default Client Logos Config
INSERT INTO site_settings (key, value)
VALUES (
  'client_logos',
  '{
    "direction": "left",
    "speed": "normal",
    "pauseOnHover": true,
    "logos": [
      {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png", "alt": "Shopify"},
      {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/WooCommerce_logo.svg/1200px-WooCommerce_logo.svg.png", "alt": "WooCommerce"},
      {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", "alt": "React"},
      {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png", "alt": "Vue"},
      {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/2560px-Nextjs-logo.svg.png", "alt": "Next.js"},
      {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png", "alt": "Laravel"}
    ]
  }'
) ON CONFLICT (key) DO NOTHING;

-- Insert Default Email Templates Config
INSERT INTO site_settings (key, value)
VALUES (
  'email_templates',
  '{
    "direction": "right",
    "speed": "slow",
    "pauseOnHover": true,
    "images": [
      {"url": "https://cdn.dribbble.com/users/2364329/screenshots/15697240/media/790b9f029323382760775d7963d09a47.png", "alt": "Fashion Newsletter"},
      {"url": "https://cdn.dribbble.com/users/3532588/screenshots/19222383/media/4c06f3630f9a72b220300df87630733d.png", "alt": "Tech Promo"},
      {"url": "https://cdn.dribbble.com/users/6034870/screenshots/16658097/media/e24e2c94970030224676644464096009.png", "alt": "E-commerce Sale"},
      {"url": "https://cdn.dribbble.com/users/6234/screenshots/15671753/media/5e876007e003057376c72930263309a4.png", "alt": "App Launch"}
    ]
  }'
) ON CONFLICT (key) DO NOTHING;
