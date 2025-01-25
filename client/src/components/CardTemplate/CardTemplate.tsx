import { FC } from "react";
import PostCard from "@/components/PostCard/PostCard.tsx";
import { Post } from "@/typespaces/interfaces/post.interface.ts";
import { TemplatePostCard } from "@/typespaces/enums/templatePostCard.enum.ts";

interface Props {
    data: Post;
    template: TemplatePostCard;
}

const CardTemplate: FC<Props> = ({ data, template }) => {
    switch (template) {
        case TemplatePostCard.CLASSIC:
            return <PostCard post={data} />;
        case TemplatePostCard.HOVER:
            return <PostCard post={data} isHover />;
        default:
            return <div>Template not found</div>;
    }
};

export default CardTemplate;
