import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

type Props = {
    open: boolean
    onClose: () => void
    title: string
    description: string
    onConfirm: () => void
}

export function ConfirmationDialog({ open, onClose, title, description, onConfirm }: Props) {

    const handleConfirmation = async () => {
        onConfirm()
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto flex-1 pr-2">
                    {description}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="cursor-pointer" variant="outline" onClick={onClose}>Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleConfirmation} className="cursor-pointer" type="submit">Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
