import { Navigation } from "../enums/navigation.enum.ts";
import { TemplatePostCard } from "../enums/templatePostCard.enum.ts";
import { CurrentLayout } from "../enums/currentLayout.enum.ts";

export interface Settings {
    layout: Layout;
    template: TemplatePostCard;
    navigation: Navigation;
}

export interface Layout {
    current: CurrentLayout;
    params: Params;
}

export interface Params {
    grid: Grid;
    masonry: Grid;
}

export interface Grid {
    columns: number;
    rows: number;
}
