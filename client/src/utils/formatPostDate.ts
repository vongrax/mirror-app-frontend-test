import {getDeclension} from "./getDeclension.ts";

export const formatPostDate =(postDate: string): string => {
    const now = new Date();
    const post = new Date(postDate);

    const diffMs = now.getTime() - post.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
        const dayWord = getDeclension(diffDays, ["день", "дня", "дней"]);
        if (diffDays === 0) {
            return "Сегодня";
        }
        return `${dayWord} назад`;
    } else {
        const day = post.getDate().toString().padStart(2, "0");
        const month = (post.getMonth() + 1).toString().padStart(2, "0");
        const year = post.getFullYear();

        return `${day}/${month}/${year}`;
    }
}

