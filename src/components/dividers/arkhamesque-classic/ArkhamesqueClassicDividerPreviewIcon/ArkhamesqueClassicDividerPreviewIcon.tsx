import { PropsWithClassName } from '@/types/util';
import S from './ArkhamesqueClassicDividerPreviewIcon.module.scss';
import { ImageAreaIcon } from '@/components';
import { ImageAreaContainer } from '@/components/ui/icons/ImageAreaIcon/ImageAreaIcon';
import { ArkhamesqueClassicDividerAreaIcon as Icon } from '../ArkhamesqueClassicDividerAreaIcon/ArkhamesqueClassicDividerAreaIcon';

export type ArkhamesqueClassicDividerPreviewIconProps = PropsWithClassName & {
  icon: string
}

export const ArkhamesqueClassicDividerPreviewIcon = ({
  className,
  icon
}: ArkhamesqueClassicDividerPreviewIconProps) => {
  const container: ImageAreaContainer = {
    x: 118,
    y: 67,
    width: 104,
    height: 104,
    alignX: 'center',
    alignY: 'center'
  }

  return (
    <Icon
      className={className}
      size={92}
      container={container}
      icon={icon}
    />
  );
}