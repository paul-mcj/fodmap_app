import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { formatPostDate } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const CardTemplate = ({
	author,
	title,
	description,
	type,
	foods,
	created_at
}) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{author}</CardDescription>
				<Badge>{type}</Badge>
				{/* <CardAction>Card Action</CardAction> */}
			</CardHeader>
			<CardContent>
				<p>{description}</p>
			</CardContent>
			<CardFooter>
				<ul>
					{foods.map((food) => (
						<li key={food.id}>
							<Badge
								asChild
								variant="secondary">
								{/* TODO: link to page with results that filter for recipes/discussions of the specific tag! */}
								<Link to="/">{food.name}</Link>
							</Badge>
						</li>
					))}
				</ul>
				<p>{formatPostDate(created_at)}</p>
			</CardFooter>
		</Card>
	);
};

export default CardTemplate;
