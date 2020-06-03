import Typography from 'typography';
import lincolnTheme from 'typography-theme-lincoln';

lincolnTheme.baseFontSize = '18px';
lincolnTheme.blockMarginBottom = 0.8;

const typography = new Typography(lincolnTheme);

export default typography;
export const rhythm = typography.rhythm;
