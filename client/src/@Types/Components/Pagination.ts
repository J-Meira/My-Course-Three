import { IMetaData } from '..';

export interface IPaginationProps {
  metaData: IMetaData;
  onPageChange: (page: number) => void;
}
