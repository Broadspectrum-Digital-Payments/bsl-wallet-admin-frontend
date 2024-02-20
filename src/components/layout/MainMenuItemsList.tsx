"use client"
import React from "react";
import {useDashboardStore} from "@/store/DashboardStore";
import MenuItem from "@/components/layout/MenuItem";

const MainMenuItemsList: React.FC = () => {
    const {mainMenuItemsList, bottomMenuItemsList} = useDashboardStore()

    return (
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <div className="">
                        <ul role="list" className="-mx-2 mt-2 space-y-2">
                            {mainMenuItemsList.map((item) => (
                                <MenuItem key={item.name} menuItem={item}/>
                            ))}
                        </ul>
                    </div>
                </li>
                <li className="mt-auto">
                    <ul role="list" className="-mx-2 mt-2 space-y-2">
                        {bottomMenuItemsList.map((menu) => (
                            <MenuItem key={menu.name} menuItem={menu}/>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default MainMenuItemsList