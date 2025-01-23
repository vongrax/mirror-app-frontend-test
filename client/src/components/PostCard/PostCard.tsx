import {FC} from "react";
import {Card} from "antd";
import {Post} from "../../typespaces/interfaces/post.interface.ts";

interface PostCardProps {
    post: Post
}

const PostCard: FC<PostCardProps> = (props) => {

    const {caption, user, comments, likes, date} = props.post;

    return (
        <Card title={user.username}>
            <div>
                <span>{caption}</span>
                <span>{date}</span>
            </div>
            <footer>
                <span>{likes} лайков</span>
                <span> {comments} комментариев</span>
            </footer>
        </Card>
    );
}

export default PostCard;
