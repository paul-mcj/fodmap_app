import { Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

const Navbar = () => {
	return (
		<div className="top-0 fixed z-10 bg-[var(--background)] w-full p-4">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link to="/">
								<h1>FODMAP Community</h1>
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							Blogs
						</NavigationMenuTrigger>
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
												discussions with
												other members of the
												FODMAP community
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
												created by other
												users in the
												community
											</div>
										</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
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
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default Navbar;
