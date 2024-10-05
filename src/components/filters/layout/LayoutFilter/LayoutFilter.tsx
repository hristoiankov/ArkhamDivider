import S from './LayoutFilter.module.scss';

import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCategoryId, selectLayout, selectType } from '@/store/features/layout/layout';
import { getLayouts } from '@/util/layouts';
import { isNotNil, prop, uniq } from 'ramda';
import { LayoutColorToggle } from '../LayoutColorToggle/LayoutColorToggle';
import { LayoutOrientationToggle } from '../LayoutOrientationToggle/LayoutOrientationToggle';
import { LayoutCategorySelect } from '../LayoutCategorySelect/LayoutCategorySelect';
import { LayoutSelect } from '../LayoutSelect/LayoutSelect';

export const LayoutFilter = () => {
  const layout = useAppSelector(selectLayout);
  
  const {
    color,
    orientation,
  } = layout;

  const type = useAppSelector(selectType);
  const categoryId = useAppSelector(selectCategoryId);

  const cateogoryLayouts = getLayouts({
    criteria: {
      categoryId,
      type,
      orientation,
      color
    }
  })
  
  const colorLayouts = getLayouts({ 
    criteria: {
      categoryId,
      orientation
    }
  });

  const orientationLayouts = getLayouts({ 
    criteria: {
      categoryId,
      color,
      type
    }
  });

  const haveColor = uniq(
    colorLayouts
      .map(prop('color'))
      .filter(isNotNil)
  ).length > 1;

  const haveOrientation = uniq(
    orientationLayouts
      .map(prop('orientation'))
      .filter(isNotNil)
  ).length > 1;

  return (
    <div className={S.container}>
      <LayoutCategorySelect className={S.select}/>
      {categoryId && (
        <>
          {haveOrientation && (
            <LayoutOrientationToggle data={orientationLayouts}/>
          )}
          {haveColor && (
            <LayoutColorToggle 
              className={S.color}
              data={colorLayouts}
            />
          )}
          {cateogoryLayouts.length > 1 && (
            <LayoutSelect 
              className={S.select}
              data={cateogoryLayouts}
            />
          )}
        </>
      )}
    </div>
  );
}