'use client'
import { Trash2Icon } from "lucide-react"
import { useRouter } from 'next/navigation'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Job } from "../dashboard/recruiter/jobs/page"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"

export function DeleteJobDialog({ job }: { job: Job }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        const res = await deleteJob(job._id)
        console.log(res);
        if (res.deletedCount) {
            setOpen(false)
        }
        toast.add({
            title: `${job.title} deleted`,
            description: "The job has deleted",
        })
        router.refresh()
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={<Button variant="destructive"> <Trash2Icon /></Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>

                    {/* <AlertDialogTitle>Delete?</AlertDialogTitle> */}
                    <AlertDialogDescription>
                        This will permanently delete this chat conversation.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
