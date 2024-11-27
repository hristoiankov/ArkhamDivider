import { useTranslation } from 'react-i18next';
import S from './AppSettings.module.scss';
import { LayoutFilter, LanguageSelect, PrintSettings, Row, Button, Icon, LayoutZoom } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectDividers } from '@/store/features/dividers/dividers';
import { AdditionalSettings } from '../AdditionalSettings/AdditionalSettings';
import classNames from 'classnames';


export const AppSettings = () => {
  const { t } = useTranslation();
  const print = () => window.print();
  const dividers = useAppSelector(selectDividers);

  return (
    <div className={S.container}>
      <Row wrap className={S.row} gap={'responsive'}>
        <Row wrap className={classNames(S.row, S.layoutRow)} gap={'responsive'}>
          <div className={S.languageSelect}>
            <LanguageSelect/>
          </div>
          
          <div className={S.dividerFilter}>
            <LayoutFilter/>
          </div>
        </Row>
        <div className={S.print}>
          <Row gap={'responsive'} wrap className={classNames(S.row, S.printRow)}>
            <div className={S.additional}>
              <AdditionalSettings/>
            </div>
            <Row className={classNames(S.row, S.mainRow)} gap={'responsive'}>
              <div className={S.zoom}>
                <LayoutZoom/>
              </div>
              <div className={S.printSettings}>
                <PrintSettings/>
              </div>
              {dividers.length > 0 && (
                <>
                  <Button 
                    onClick={print} 
                    className={S.printButton}
                  >
                    <Icon icon="printer"/>{t('Print')} /
                    <Icon icon="download"/> PDF
                  </Button>
                </>
              )}
            </Row>
          </Row>
        </div>
      </Row>
    </div>
  );
}