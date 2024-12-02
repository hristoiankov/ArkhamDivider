import { IconScale } from "@/types/icons";

export const getIconScale = ({
  scale,
  scaleBy,
  ratio,
  circled = false
}: {
  scale: IconScale, 
  ratio?: number,
  circled?: boolean,
  scaleBy?: number
}) => {
  if (!ratio) {
    return 100;
  }
  if (scale === 'circle') {
    return getCircleScale({
      ratio,
      circled,
      scaleBy
    });
  }

  return getSquareScale(ratio);
}

export const getSquareScale = (ratio: number) => {
  return ratio > 1 ? 100 / ratio : 100;
}

export const getCircleScale = ({
  ratio,
  scaleBy = 1,
  circled = false
}: {
  ratio: number
  circled?: boolean
  scaleBy?: number
}) => {
  if (circled) {
    return 100;
  }
  const angle = Math.atan(ratio);
  const height = Math.cos(angle);
  return Math.min(height * scaleBy * 100, 95);
}