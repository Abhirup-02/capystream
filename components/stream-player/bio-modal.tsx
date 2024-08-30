import React, { ElementRef, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
    initialValue: string | null;
}

export function BioModal({ initialValue }: BioModalProps) {

    const [value, setValue] = useState(initialValue || '')
    const [isPending, startTransition] = useTransition()
    const closeRef = useRef<ElementRef<"button">>(null)

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        startTransition(() => {
            updateUser({ bio: value.trim() })
                .then(() => {
                    toast.success('User bio updated')
                    closeRef.current?.click()
                })
                .catch(() => toast.error('Something went wrong'))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit user bio</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="User bio"
                        value={value}
                        disabled={isPending}
                        className="resize-none"
                    />
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="primary"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
