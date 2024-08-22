import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export function Actions() {

    return (
        <div className="flex items-center justify-end gap-x-3">
            <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
                asChild
            >
                <Link href='/'>
                    <LogOut className="w-5 h-5 mr-2" />
                    Exit
                </Link>
            </Button>
            <UserButton />
        </div>
    )
}