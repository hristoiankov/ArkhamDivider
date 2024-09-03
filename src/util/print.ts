import { IPage, PageSide } from "@/types/print";
import { splitIntoGroups } from "./common";

export type SplitIntoPagesOptions = {
  groupSize: number
  rowSize: number
  doubleSidedPrint?: boolean
}

export const splittIntoPages = <T>(data: T[], options: SplitIntoPagesOptions): IPage<T>[] => {
  const {
    doubleSidedPrint = false,
    groupSize,
    rowSize
  } = options;
  const groups = splitIntoGroups(data, groupSize);
  const pages = groups.map((items, index) => ({
    pageNumber: index + 1,
    side: PageSide.FRONT,
    rows: splitIntoGroups(items, rowSize)
  }));

  if (!doubleSidedPrint) {
    return pages;
  }

  return  createDoubleSidedPages(pages, {
    groupSize,
    rowSize
  });
}

export const getPageSize = <T>(group: T[][]) => group.reduce((total, group) => total + group.length, 0);

export const canFitDoubleSide = <T>(group: T[][], groupSize: number) => {
  const size = getPageSize(group);
  const halfSize = Math.floor(groupSize / 2);

  return size <= halfSize;
};

export type CreateDoubleSidedPagesOptions = {
  groupSize: number
  rowSize: number
}

const cloneItems = <T>(rows: T[][], isLandscape: boolean) => {
  if (isLandscape) {
    return [
      ...rows,
      ...rows.toReversed()
    ]
  }

  return rows.reduce((target, row) => {
    return [
      ...target,
      ...row.map(item => ([item, item]))
    ];
  }, [] as T[][]);
}

export const createDoubleSidedPages = <T>(pages: IPage<T>[], options: CreateDoubleSidedPagesOptions) => pages.reduce((target, page, index): IPage<T>[] => {
  const isLastGroup = index === pages.length - 1;
  const { rowSize, groupSize } = options;
  const colSize = groupSize / rowSize;
  const isLandscape = rowSize > colSize;

  if (isLastGroup && canFitDoubleSide(page.rows, groupSize)) {
    const rows = cloneItems(page.rows, isLandscape);

    return [
      ...target,
      {
        pageNumber: page.pageNumber + 1,
        side: PageSide.FRONT,
        merged: true,
        rows
      }
    ]
  }

  const rows = page.rows.map(group => group.toReversed());

  return [
    ...target,
    page,
    {
      pageNumber: page.pageNumber,
      side: PageSide.BACK,
      rows
    }
  ];
}, [] as IPage<T>[]);