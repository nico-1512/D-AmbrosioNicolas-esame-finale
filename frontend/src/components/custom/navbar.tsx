import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import routes from "@/routes";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <NavigationMenu className="relative bg-gray-600 max-w-[100%] flex flex-row justify-start p-5">
      <img
        src={logo}
        alt="application_logo"
        className="aspect-square w-[70px] select-none"
      />
      <NavigationMenuList className="ml-5">
        {Object.keys(routes).map((path, index) => {
          return (
            <NavigationMenuItem className="flex flex-row gap-x-2" key={path}>
              {index != 0 ? (
                <div className="w-[1px] bg-white rounded text-transparent">
                  .
                </div>
              ) : null}

              <Button
                variant="ghost"
                className="text-white text-xl"
                onClick={() => navigate(path)}
              >
                <Link to={path}>{path.split("/")[1].toUpperCase()}</Link>
              </Button>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
