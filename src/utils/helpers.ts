// @vsc repo:vsc-project-169-frontend file:src/utils/helpers.ts task:f9-src-utils-helpers-ts module:frontend session:169
export function formatNumberFa(num: number): string {
  return num.toString().replace(/\d/g, d => ('۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]));
}

export function formatDateFa(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const formatter = new Intl.DateTimeFormat('fa', { year: 'numeric', month: 'long', day: 'numeric' });
  const formatted = formatter.format(d);
  return formatNumberFa(formatted);
}

export function toggleRtlClass(baseClass: string, rtlClass: string): string {
  return document.dir === 'rtl' ? rtlClass : baseClass;
}
