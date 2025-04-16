import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center flex-col justify-center lg:flex-row py-16 px-6 md:px-24 md:py-16 lg:py-24 gap-8 lg:gap-16">
            <div className="w-full lg:w-2/5">
                <img className="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" alt="" />
                <img className="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" alt="" />
                <img className="md:hidden" src="https://i.ibb.co/8gTVH2Y/Group-198.png" alt="" />
            </div>
            <div className="w-full lg:w-3/5">
                <h1 className="py-2 text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white">Looks like you've found the doorway to the great nothing</h1>
                <p className="py-2 text-base text-gray-800 dark:text-gray-200">The content you're looking for doesn't exist. Either it was removed, or you mistyped the link.</p>
                <p className="py-2 text-base text-gray-800 dark:text-gray-200">Sorry about that! Please visit our homepage to get where you need to go.</p>
                <Button asChild className="w-full lg:w-auto my-4 px-1 sm:px-16 py-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                    <Link to="/">
                        Go back to Homepage
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;