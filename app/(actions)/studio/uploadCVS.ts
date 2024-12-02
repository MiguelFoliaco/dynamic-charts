'use server';

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const uploadCVSAction = async (userId: string, formData: FormData,) => {
    const supabase = await createClient();
    const name = formData.get('name') as string
    const file = formData.get('file') as File
    const delimited = formData.get('delimited') as string || ','
    const data = (await file.text()).trim().split('\r\n').map(row => row.split(delimited))
    const headers = data[0];
    const dataParse: Record<string, string>[] = []
    data.forEach((e, i) => {
        if (i !== 0) {
            const tempObj: Record<string, string> = {}
            headers.forEach((header, index) => {
                if (e[index] !== undefined) {
                    tempObj[header] = e[index]
                }
            })
            dataParse.push(tempObj)
        }
    })
    const textFile = JSON.stringify(dataParse)
    const fileSaved = await supabase.storage.from('data_setes').upload(`${name}_[cvs].json`, textFile, {
        contentType: 'application/json'
    });

    if (fileSaved.data) {
        const id = fileSaved.data.id
        await supabase.from('datasets').insert({
            id,
            name_file: name,
            file_id: id,
            user_id: userId
        })

        return encodedRedirect("success", "/studio", "File uploaded successfully")
    }
    if (fileSaved.error) {
        return encodedRedirect("error", "/studio", fileSaved.error.message)
    }

}