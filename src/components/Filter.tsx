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
                    className="flex-1 min-w-[200px] border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
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

                {/* Date Range */}
                <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">

                    {/* From */}
                    <input
                        type="number"
                        placeholder="From"
                        value={filters.dateBegin ?? ""}
                        onChange={(e) =>
                            onChange({ ...filters, dateBegin: e.target.value })
                        }
                        className="w-20 outline-none"
                    />

                    <select
                        value={filters.dateBeginEra}
                        onChange={(e) =>
                            onChange({
                                ...filters,
                                dateBeginEra: e.target.value as "BC" | "AD",
                            })
                        }
                        className="outline-none"
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
                        className="w-20 outline-none"
                    />

                    <select
                        value={filters.dateEndEra}
                        onChange={(e) =>
                            onChange({
                                ...filters,
                                dateEndEra: e.target.value as "BC" | "AD",
                            })
                        }
                        className="outline-none"
                    >
                        <option value="BC">B.C.</option>
                        <option value="AD">A.D.</option>
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
                        })
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