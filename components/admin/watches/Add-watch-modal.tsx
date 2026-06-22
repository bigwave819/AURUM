'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Brand {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    _count: { watches: number };
}

interface BrandsProps {
    brands: Brand[];
}

type CloudinarySignature = {
    signature: string;
    timestamp: number;
    apiKey: string;
};

async function getCloudinarySignature(): Promise<CloudinarySignature> {
        const timestamp = Math.round(Date.now() / 1000);

        const res = await fetch("/api/cloudinary/signature", {
            method: "POST",
            body: JSON.stringify({ timestamp }),
        });

        if (!res.ok) throw new Error("Failed to get signature");

        return res.json();
    }


function AddWatchModal({ brands }: BrandsProps) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ ADD NEW WATCH</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new Watch</DialogTitle>
                </DialogHeader>

                <form >
                    <div>
                        <Label>Watch Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter watch name"
                            required
                        />
                    </div>
                    <div>
                        <Label>Price</Label>
                        <Input
                            id="name"
                            placeholder="Enter watch name"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="watch-brand">Brand</Label>
                        <select
                            id="watch-brand"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                            required
                            defaultValue=""
                        >
                            <option value="" disabled>Select a brand</option>
                            {brands.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            id="name"
                            placeholder="Enter watch name"
                            required
                        />
                    </div>
                     {/* Image */}
                    <div className="space-y-1">
                        <Label className="text-sm font-medium">Car Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm"
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddWatchModal;