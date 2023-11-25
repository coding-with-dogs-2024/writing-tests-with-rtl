import type { Post } from '../../services/jsonapi/types';
import { Card } from '../UI/Card';
import classes from './PostCard.module.scss';
import { useGetUserById } from '../../services/jsonapi/api';
import { EllipsisSpinner } from '../UI/Spinner/Ellipsis';
import { Link } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { Button } from '../UI/Button';
import { PostComments } from './PostComments';

type Props = Readonly<{
	post: Post;
}>;

const PostTitle = (props: Props) => {
	const { isLoading, data } = useGetUserById(props.post.userId);
	return (
		<div className={classes.postTitle}>
			<div className={classes.postTitleContent}>
				{props.post.id} - {props.post.title}
			</div>
			<div className={classes.postTitleUser}>
				{isLoading && <EllipsisSpinner />}
				<Link to={`/user/${props.post.userId}`}>
					{data && data.name}
				</Link>
			</div>
		</div>
	);
};

type PostBodyState = Readonly<{
	showComments: boolean;
}>;

const PostBody = (props: Props) => {
	const [state, setState] = useImmer<PostBodyState>({
		showComments: false
	});
	const toggleShowComments = () =>
		setState((draft) => {
			draft.showComments = !draft.showComments;
		});

	const commentsPrefix = state.showComments ? 'Hide' : 'Show';

	return (
		<div className={classes.postBody}>
			<div>{props.post.body}</div>
			<div className={classes.commentButtonWrapper}>
				<Button size="small" onClick={toggleShowComments}>
					{`${commentsPrefix} Comments`}
				</Button>
			</div>
			{state.showComments && <PostComments postId={props.post.id} />}
		</div>
	);
};

export const PostCard = (props: Props) => (
	<Card
		title={<PostTitle post={props.post} />}
		body={<PostBody post={props.post} />}
	/>
);
