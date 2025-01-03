import { selectLanguage } from "@/store/features/language/language"
import { useAppSelector } from "./useAppSelector"
import { selectCategoryId, selectLayout, selectType } from "@/store/features/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import { createRoute, RouteOptions } from "@/util/routes";
import { selectStory } from "@/store/features/dividers/dividers";
import { ILayout } from "@/types/layouts";

type AppRouteOptions = RouteOptions & {
  layout?: ILayout
}

export const useAppNavigate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const language = useAppSelector(selectLanguage);
  const currentType = useAppSelector(selectType);
  const categoryId = useAppSelector(selectCategoryId);
  const { id } = useAppSelector(selectLayout);
  const story = useAppSelector(selectStory); 

  return ({ 
    layout, 
    ...options 
  }: AppRouteOptions) => {
    const layoutId = layout ? layout.id : id; 
    const type = layout && !layout.types.includes(currentType) ? 
      layout.types[0] : currentType;
    
    const routeOptions = {
      ...params,
      language,
      type,
      categoryId,
      layoutId,
      storyId: story?.code,
      ...options
    }
    const route = createRoute(routeOptions);
    navigate(route);
  };
} 