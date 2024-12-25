import S from './CornerRadiusSettings.module.scss';
import icon from './images/icon.svg'
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Checkbox } from '@/components/forms/Checkbox/Checkbox';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCornerRadius, setCornerRadius } from '@/store/features/print/print';
import { selectExport } from '@/store/features/app/app';

export type CornerRadiusSettingsProps = {

}

export const CornerRadiusSettings = ({}: CornerRadiusSettingsProps) => {
  
  const dispatch = useAppDispatch();
  const cornerRadius = useAppSelector(selectCornerRadius);
  const isExport = useAppSelector(selectExport);
  const onCheck = () => dispatch(setCornerRadius(!cornerRadius));

  return (
    <div className={S.container}>
      <Checkbox 
        checked={cornerRadius} 
        onChange={onCheck}
        disabled={isExport}
      >
        <img className={S.icon} src={icon}/>
      </Checkbox>
    </div>
  );
}