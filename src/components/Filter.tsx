import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import type { Department } from "../types/department";
import type { FilterModel } from "../types/filter";

export default function Filter({ departments, isLoadingDepartments, filters, onChange }: FilterProps) {
    const [keyword, setKeyword] = useState(filters.keyword);

    const debouncedKeyword = useDebounce(keyword, 500);

    // Send to parent after debounce
    useEffect(() => {
        if (debouncedKeyword !== filters.keyword) {
            onChange({ ...filters, keyword: debouncedKeyword });
        }
    }, [debouncedKeyword, filters, onChange]);

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search artworks..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full md:flex-1 min-w-0 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                {/* Department */}
                <select
                    className={`border px-4 py-2 rounded-lg w-full md:w-[300px] ${isLoadingDepartments ? "opacity-60" : ""
                        }`}
                    value={filters.departmentId}
                    onChange={(e) =>
                        onChange({ ...filters, departmentId: e.target.value })
                    }
                    disabled={isLoadingDepartments}
                >
                    <option value="">
                        {isLoadingDepartments
                            ? "Loading departments..."
                            : "All Departments"}
                    </option>

                    {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                            {department.name}
                        </option>
                    ))}
                </select>

                {/* Date + Sort */}
                <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    {/* Date Range */}
                    <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap items-center gap-2 border px-3 py-2 rounded-lg">
                        {/* From */}
                        <input
                            type="number"
                            placeholder="From"
                            value={filters.dateBegin ?? ""}
                            onChange={(e) =>
                                onChange({ ...filters, dateBegin: e.target.value })
                            }
                            className="w-20 outline-none bg-transparent"
                        />

                        <select
                            value={filters.dateBeginEra}
                            onChange={(e) =>
                                onChange({
                                    ...filters,
                                    dateBeginEra: e.target.value as "BC" | "AD",
                                })
                            }
                            className="outline-none bg-transparent"
                        >
                            <option value="BC">B.C.</option>
                            <option value="AD">A.D.</option>
                        </select>

                        <span className="text-gray-400">—</span>

                        {/* To */}
                        <input
                            type="number"
                            placeholder="To"
                            value={filters.dateEnd ?? ""}
                            onChange={(e) =>
                                onChange({ ...filters, dateEnd: e.target.value })
                            }
                            className="w-20 outline-none bg-transparent"
                        />

                        <select
                            value={filters.dateEndEra}
                            onChange={(e) =>
                                onChange({
                                    ...filters,
                                    dateEndEra: e.target.value as "BC" | "AD",
                                })
                            }
                            className="outline-none bg-transparent"
                        >
                            <option value="BC">B.C.</option>
                            <option value="AD">A.D.</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <select
                        value={filters.sortByDate}
                        onChange={(e) =>
                            onChange({
                                ...filters,
                                sortByDate: e.target.value as "Newest_First" | "Oldest_First",
                            })
                        }
                        className="w-full md:w-[180px] min-w-0 border px-3 py-2 rounded-lg bg-transparent"
                    >
                        <option value="Newest_First">Newest first</option>
                        <option value="Oldest_First">Oldest first</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setKeyword("");

                        onChange({
                            departmentId: "",
                            dateBegin: "",
                            dateEnd: "",
                            dateBeginEra: "AD",
                            dateEndEra: "AD",
                            sortByDate: "Newest_First",
                        });
                    }}
                    className="text-gray-500 hover:text-black transition"
                >
                    Reset
                </button>

            </div>
        </div>
    );
}

type FilterProps = {
    departments: Department[];
    isLoadingDepartments: boolean;
    filters: FilterModel;
    onChange: (filters: FilterModel) => void;
}