import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MemberAvatarProps {
    name: string;
    className?: string;
    fallbackClassName?: string;
}
 
export const MemberAvatar = ({ name, className, fallbackClassName }: MemberAvatarProps) => {
    return (
        <Avatar className={cn("size-5 transi border-neutral-300 rounded-full", className)}>
            <AvatarFallback className={cn(
                "bg-neutral-200 text-neutral-500 flex items-center justify-center",
                fallbackClassName
        )}>
            {name[0].charAt(0).toUpperCase()}
        </AvatarFallback>
        </Avatar>
    )
}