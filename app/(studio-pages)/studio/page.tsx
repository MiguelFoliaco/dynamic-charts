import { validateSession } from '@/utils/validateSession'
import React from 'react'
import { FileIcon } from 'lucide-react';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { uploadCVSAction } from '@/app/(actions)/studio/uploadCVS';
import { Label } from '@/components/ui/label';
import { type Page } from '@/interfaces/page';
import { CustomAlert } from '@/components/alert';

export default async function Page({ searchParams }: Readonly<Page<{}, Promise<{ readonly error?: string }>>>) {
    const params = await searchParams;
    const user = await validateSession()
    const updateCVS = uploadCVSAction.bind(null, user?.id)

    return (
        <div className='p-3'>
            <div className='flex gap-2 mx-auto max-w-2xl mb-4'>
                <h2 className='font-bold'>Step 1</h2>
                <p className='text-gray-400'>Upload file [cvs]</p>
            </div>

            {
                params?.error &&
                <div className='mx-auto max-w-2xl mb-4'>
                    <CustomAlert
                        message={params.error}
                        severity='error'
                        title='Error when upload file'
                    />
                </div>
            }
            <div className='mt-3'>
                <form
                    //@ts-ignore
                    action={updateCVS}
                    className='flex flex-col gap-2 mx-auto max-w-2xl'
                >
                    <Label htmlFor="name" className='my-2 mt-4'>Name</Label>
                    <Input type="text" required name="name" placeholder='Report name' />

                    <Label htmlFor="file" className='my-2 mt-4'>File</Label>
                    <Input type="file" required name="file" />

                    <Label htmlFor="delimited" className='my-2 mt-4 flex align-center'>Delimited <p className='ml-2 text-xs text-gray-400'>[default: , t \n]</p></Label>
                    <Input className='mb-5' type="text" placeholder='Delimited' defaultValue={','} required name="delimited" />
                    <SubmitButton
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
