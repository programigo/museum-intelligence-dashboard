export type FilterModel = {
    keyword?: string;
    departmentId?: string;
    dateBegin?: string;
    dateEnd?: string;
    dateBeginEra?: "BC" | "AD";
    dateEndEra?: "BC" | "AD";
    sortByDate: "Newest_First" | "Oldest_First";
};