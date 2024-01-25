import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingsPage = async () => {

    const isPro = await checkSubscription();
    return ( 
        <div>
            <Heading
            title="Settings"
            description="Manage account settings."
            icon={Settings}
            iconColor="text-grey-700"
            bgColor="text-grey-700/10"
            />

            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">

                </div>
        {isPro ? "You are currently on a pro plan." : "you are currently on a free plan"}
        <div>

        <SubscriptionButton isPro={isPro}/>
        </div>
            </div>
          
            
        </div>
     );
}
 
export default SettingsPage;