"use client";

import useDynamicIcon from '../../components/DynamicIcons'

export default function Category({
    id,
    categoryName,
    iconName,
}: {
    id: string;
    categoryName: string;
    iconName: string;
}) {
    const IconComponent = useDynamicIcon(iconName);

    return (
        <>
            <label>
                <input id={id} type="checkbox" className="peer sr-only" value={categoryName} />
                <div className="border-slate-200 dark:bg-slate-200/5 dark:border-slate-200/10 text-sm cursor-pointer transition-colors hover hover:bg-blue-100 dark:hover:bg-blue-500/30 peer-checked:text-white peer-checked:bg-blue-500 flex items-center gap-1 px-2 py-1 text-slate-900 dark:text-white rounded-md border">
                    <span className="[&amp;>svg]:w-4 [&amp;>svg]:h-4">
                        {IconComponent ? <IconComponent /> : ""}
                    </span>{categoryName}</div>
            </label>
        </>
    );
}
