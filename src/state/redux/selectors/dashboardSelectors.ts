import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IDashboardSlice } from "../features/dashboardSlice";

const selectActiveAndExistingClients = createSelector(
    (state: RootState) => state.dashboard,
    ({ data }: IDashboardSlice) => {
        const sums = data.reduce((acc, cur) => {
            acc.totalActive += cur.isActive ? 1 : 0;
            acc.totalExisting += cur.isExistingClient ? 1 : 0;
            return acc;
        }, { totalActive: 0, totalExisting: 0 })
        return {
            activeClients: sums.totalActive,
            inactiveClients: data.length - sums.totalActive,
            existingClients: sums.totalExisting,
            nonExistentClients: data.length - sums.totalExisting,
        }
    }
)

export { selectActiveAndExistingClients }