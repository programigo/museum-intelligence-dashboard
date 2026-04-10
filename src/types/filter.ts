export type FilterModel = {
    keyword?: string;
    departmentId?: string;
    dateBegin?: string;
    dateEnd?: string;
    dateBeginEra?: "BC" | "AD";
    dateEndEra?: "BC" | "AD";
};