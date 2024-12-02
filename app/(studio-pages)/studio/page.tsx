import { validateSession } from '@/utils/validateSession'
import React from 'react'
import { FileIcon } from 'lucide-react';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { uploadCVSAction } from '@/app/(actions)/studio/uploadCVS';
import { Label } from '@/components/ui/label';

const Page = async () => {
    await validateSession()
    return (
        <div className='p-3'>
            <div className='flex gap-2 mx-auto max-w-2xl mb-4'>
                <h2 className='font-bold'>Step 1</h2>
                <p className='text-gray-400'>Upload file [cvs]</p>
            </div>

            <div className='mt-3'>
                <form className='flex flex-col gap-2 mx-auto max-w-2xl'>
                    <Label htmlFor="file" className='my-2 mt-4'>Name</Label>
                    <Input type="text" required name="name" placeholder='Report name' />

                    <Label htmlFor="file" className='my-2 mt-4'>File</Label>
                    <Input type="text" required name="file" />

                    <Label htmlFor="delimited" className='my-2 mt-4 flex align-center'>Delimited <p className='ml-2 text-xs text-gray-400'>[default: , t \n]</p></Label>
                    <Input className='mb-5' type="text" placeholder='Delimited' defaultValue={','} required name="delimited" />
                    <SubmitButton
                        formAction={uploadCVSAction}
                        pendingText='Loading...'
                        className='hover:bg-blue-500 hover:text-white'>
                        Upload File
                        <FileIcon size={15} className='ml-1' />
                    </SubmitButton>
                </form>
            </div>
        </div>
    )
}

export default Page