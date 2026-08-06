import type { TFunction } from 'i18next';

export type CampusOption = {
  id: number;
  labelKey:
    | 'auth.campuses.hanoi'
    | 'auth.campuses.haiPhong'
    | 'auth.campuses.thaiNguyen'
    | 'auth.campuses.haNam'
    | 'auth.campuses.thanhHoa'
    | 'auth.campuses.hue'
    | 'auth.campuses.daNang'
    | 'auth.campuses.quyNhon'
    | 'auth.campuses.tayNguyen'
    | 'auth.campuses.hoChiMinh'
    | 'auth.campuses.dongNai'
    | 'auth.campuses.canTho'
    | 'auth.campuses.vinhPhuc';
};

export const CAMPUS_OPTIONS: CampusOption[] = [
  { id: 1, labelKey: 'auth.campuses.hanoi' },
  { id: 2, labelKey: 'auth.campuses.haiPhong' },
  { id: 3, labelKey: 'auth.campuses.thaiNguyen' },
  { id: 4, labelKey: 'auth.campuses.haNam' },
  { id: 5, labelKey: 'auth.campuses.thanhHoa' },
  { id: 6, labelKey: 'auth.campuses.hue' },
  { id: 7, labelKey: 'auth.campuses.daNang' },
  { id: 8, labelKey: 'auth.campuses.quyNhon' },
  { id: 9, labelKey: 'auth.campuses.tayNguyen' },
  { id: 10, labelKey: 'auth.campuses.hoChiMinh' },
  { id: 11, labelKey: 'auth.campuses.dongNai' },
  { id: 12, labelKey: 'auth.campuses.canTho' },
  { id: 13, labelKey: 'auth.campuses.vinhPhuc' },
];

export function getCampusLabel(option: CampusOption, t: TFunction): string {
  return t(option.labelKey);
}
