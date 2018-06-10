import React from "react";

export const LayoutContext = React.createContext({
    sidebarOpened: false,
    searchOpened: false,
    toggleSearch: () => {},
});