import {FC} from "react";
import {Card} from "antd";
import {formatPostDate} from "../../utils/formatPostDate.ts";
import {getDeclension} from "../../utils/getDeclension.ts";
import {Post} from "../../typespaces/interfaces/post.interface.ts";
import {TemplatePostCard} from "../../typespaces/enums/templatePostCard.enum.ts";
import styles from "./styles.module.scss";

interface PostCardProps {
    post: Post
    template?: TemplatePostCard
}

const PostCard: FC<PostCardProps> = ({post, template}) => {

    const {caption, user, comments, likes, date} = post;

    return (
        <Card title={user.username} hoverable={template === TemplatePostCard.HOVER} >
            <div className={styles.content}>
                <div>{caption}</div>
                <span>{formatPostDate(date)}</span>
            </div>
            <footer className={styles.footer}>
                <span>{getDeclension(likes,["лайк","лайка","лайков"])}</span>
                <span> {getDeclension(comments, ["комментарий","комментария","комментариев"])}</span>
            </footer>
        </Card>
    );
}

export default PostCard;
