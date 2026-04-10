import { Outlet } from "react-router";
import ThePageHeader from "../components/ThePageHeader";

export default function RootLayout() {
    return (
        <>
            <ThePageHeader />
            <Outlet />
        </>
    )
}