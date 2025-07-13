import { Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport
} from "@/components/ui/navigation-menu";
import LogoutButton from "./ui/LogoutButton";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
	const { isAuthenticated } = useAuth();

	// TODO: needs to float on top when users scroll
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link to="/">
							<h1>FODMAP Community</h1>
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				{isAuthenticated && (
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							Profile
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-4">
									<NavigationMenuLink asChild>
										<Link
											to="/dashboard"
											className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md">
											<div className="mt-4 mb-2 text-lg font-medium">
												Dashboard
											</div>
											<p className="text-muted-foreground text-sm leading-tight">
												An overview of your
												personal FODMAP data
												right here
											</p>
										</Link>
									</NavigationMenuLink>
								</li>
								{/* // TODO: quick links to posts, journal, foods, etc. */}
								<ListItem
									to="/posts"
									title="Your Posts">
									View your entire post history
								</ListItem>
								<ListItem
									to="/journal"
									title="Your Journal Entries">
									Make personal journal entries and
									keep track of your FODMAP progress
								</ListItem>
								<ListItem
									to="/foods"
									title="Your Foods">
									Keep track of individual food items
									and ingredients and rate how they
									impact you
								</ListItem>
								<NavigationMenuLink asChild>
									<LogoutButton />
								</NavigationMenuLink>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				)}
				<NavigationMenuItem>
					<NavigationMenuTrigger>Blogs</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[300px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<Link to="/discussions">
										<div className="font-medium">
											Discussions
										</div>
										<div className="text-muted-foreground">
											Participate in
											discussions with other
											members of the FODMAP
											community
										</div>
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link to="/recipes">
										<div className="font-medium">
											Recipes
										</div>
										<div className="text-muted-foreground">
											View FODMAP recipes
											created by other users in
											the community
										</div>
									</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{!isAuthenticated && (
					<>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/login">Login</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/register">Signup</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</>
				)}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

function ListItem({ title, children, to, ...props }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link to={to}>
					<div className="text-sm leading-none font-medium">
						{title}
					</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}

export default Navbar;
