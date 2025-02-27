"use client"
import React, { FormEvent, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation } from '@tanstack/react-query'
import { addProductAction } from './actions'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

function ConfigureTab() {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const { mutate, isPending } = useMutation({
        mutationKey: ["addProduct"],
        mutationFn: async () => await addProductAction({ name, price, stock, category, description, imageUrl }),
        onSuccess: () => {
            toast("Product added to Inventory");
            setImageUrl("")
            setName("")
            setDescription("")
            setPrice("")
            setStock("")
            setCategory("")
        },
        onError: (error) => {
            toast(error.message);
        }
    })


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate();
    }

    return (

        <Card className='w-[500px] flex flex-col justify-center items-center mb-5'>
            <CardHeader className='text-center'>
                <CardTitle>Add Product</CardTitle>
                <CardDescription>Add latest Product using our Latest UI</CardDescription>
            </CardHeader>
            <CardContent className='w-full grid grid-cols-1  gap-4'>
                <div className="">
                    <label htmlFor='name'>Name:</label>
                    <Input id='name' type='text' placeholder='Ex. Analog Watch' className='w-full' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="">
                    <label htmlFor='price'>Price (in $):</label>
                    <Input id='price' type='number' placeholder='Ex. 15.00' value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="">
                    <label htmlFor='stock'>Stock:</label>
                    <Input id='stock' type='number' placeholder='Ex. 200 ' value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>
                <div className="">
                    <label htmlFor='category'>Category:</label>
                    <Select onValueChange={setCategory} value={category} required>
                        <SelectTrigger className="w-full">
                            <SelectValue id='category' placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Literature">Art & Literature</SelectItem>
                            <SelectItem value="Stationary">Stationary</SelectItem>
                            <SelectItem value="Clothing">Clothing & Footware</SelectItem>
                            <SelectItem value="Appliances">Home Appliances</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
                <div className="">
                    <label htmlFor='desc'>Description:</label>
                    <Textarea id='desc' placeholder='Ex. Stunning new Metal Frame with Silver finishing' value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                {imageUrl && (
                    <div className="flex justify-center relative w-full h-52 my-3">
                        <Image src={imageUrl} fill className='rounded-md object-contain z-10' alt='Product-Image' />
                    </div>
                )}
            </CardContent>
            <CardFooter className='relative flex flex-col gap-4 w-full h-full'>
                <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" onSuccess={(result, { widget }) => {
                    setImageUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
                    widget.close();
                }}>
                    {({ open }) => {
                        return (
                            <Button onClick={() => open()} variant={"outline"} disabled={isPending}>
                                Upload an Image
                            </Button>
                        );
                    }}
                </CldUploadWidget>

                <Button onClick={(e) => handleSubmit(e)} disabled={isPending}>
                    {isPending ?
                        <span className='flex gap-2 items-center'>
                            <Loader className='animate-spin' />
                            <p>Adding...</p>
                        </span> : "Add Product"}
                </Button>
            </CardFooter>
        </Card>

    )
}

export default ConfigureTab
