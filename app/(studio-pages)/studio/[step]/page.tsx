import { CustomAlert } from "@/components/alert";
import { Page } from "@/interfaces/page";
import { Step1 } from "@/modules/studio/components/step1";
import { createClient } from "@/utils/supabase/server";
import { validateSession } from "@/utils/validateSession";

const getFile = async (bucketId: string, path: string) => {
    const supabase = await createClient();
    console.log(bucketId, path)
    const file = await supabase.storage.from(bucketId).download(path);
    console.log(file)
    if (file.data) {
        const jsonStr = await file.data.text()
        return {
            data: JSON.parse(jsonStr),
        }
    }
    return {
        data: null,
        error: file.error
    }
}
export default async function StepPage({ searchParams, params }: Readonly<Page<Promise<{ step: string }>, Promise<{ readonly error?: string, file_path: string, file_id: string }>>>) {
    await validateSession()
    const { file_path, file_id } = await searchParams;
    const { step } = await params;
    const file = await getFile('data_sets', file_path)
    
    return <div
        className="flex p-3 flex-col"
    >
        {
            file.error &&
            <div className='mx-auto max-w-2xl mb-4'>
                <CustomAlert
                    message={file?.error?.message}
                    severity='error'
                    title='Error when read file'
                />
            </div>
        }
        <p className="font-bold block">
            Step Page
        </p>
        {
            step === '1' && <Step1 data={file.data} fileId={file_id} />
        }
    </div>
}