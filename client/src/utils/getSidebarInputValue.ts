export const getSidebarInputValue = (value?: string): string => {

    if (!value) {
        return ""
    }

    const values: Record<string, string> = {
        grid: 'Сетка',
        masonry: 'Плиточная верстка',
        classic: 'Классическая',
        hover: 'Наведения',
        'load-more': 'Кнопка "Загрузить еще"',
        pagination: 'Пагинация',
    }


    return values[value] || "";
}
