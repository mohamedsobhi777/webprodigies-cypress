
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import clsx from "clsx";

interface CustomDialogTriggerProps {
    header?: string;
    content?: React.ReactNode;
    children: React.ReactNode;
    description?: string;
    className?: string;
}


const CustomDialogTrigger = ({ header, content, description, className, children }: CustomDialogTriggerProps) => {
    return (
        <Dialog>
            <DialogTrigger className={clsx('', className)}>{children}</DialogTrigger>
            <DialogContent
                className="h-screen
            block
            sm:h-[440px]
            overflow-scroll
            w-full
          "
            >
                <DialogHeader>
                    <DialogTitle>{header}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    );
}

export default CustomDialogTrigger