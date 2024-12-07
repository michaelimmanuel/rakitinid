
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PrebuiltItem {
    isOpen: boolean;
    onClose: () => void;
    item: any;
}

export default function PrebuiltDetails({isOpen, onClose, item} : PrebuiltItem  ) {
    

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogHeader>
                <DialogTitle>{item? item.name : "Loading"}</DialogTitle>
            </DialogHeader>
            <DialogContent className="bg-white text-black max-h-[90%] max-w-[90%] overflow-y-auto">
                <h1 className="text-2xl font-bold">{item?.name}</h1>
            </DialogContent>
        </Dialog>

    )
}