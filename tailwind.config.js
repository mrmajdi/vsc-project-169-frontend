// @vsc repo:vsc-project-169-frontend file:tailwind.config.js task:f1-tailwind-config-js module:frontend session:169
/* تنظیمات Tailwind CSS با پشتیبانی از RTL و توکن‌های طراحی */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1976D2',
        'primary-50': '#E3F2FD',
        'primary-100': '#BBDEFB',
        'primary-200': '#90CAF9',
        'primary-300': '#64B5F6',
        'primary-4xx' : '',
      },
    },
  },
  plugins: [],
};
