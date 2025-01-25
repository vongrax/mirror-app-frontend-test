import { FC, ReactNode } from "react";
import GridLayout from "@/components/Layouts/GridLayout/GridLayout.tsx";
import { Params } from "@/typespaces/interfaces/settings.interface.ts";
import { CurrentLayout } from "@/typespaces/enums/currentLayout.enum.ts";

interface Props {
    currentLayout: CurrentLayout;
    params: Params;
    children?: ReactNode;
}

const LayoutRender: FC<Props> = ({ currentLayout, params, children }) => {
    switch (currentLayout) {
        case CurrentLayout.GRID:
        case CurrentLayout.MASONRY:
            return <GridLayout grid={params[currentLayout]}>{children}</GridLayout>;

        default:
            return (
                <div>
                    <h1>Layout not found</h1>
                    {children}
                </div>
            );
    }
};

export default LayoutRender;
