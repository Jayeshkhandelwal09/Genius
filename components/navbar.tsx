
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
    const isPro = await checkSubscription();
    const  apiLimitCount = await getApiLimitCount();
    return (
        <div className="flex items-center p-4">
            <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}

export default Navbar;