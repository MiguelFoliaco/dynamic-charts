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
    const fileSaved = await supabase.storage.from('data_sets').upload(`${name}_cvs.json`, textFile, {
        contentType: 'application/json'
    });

    if (fileSaved.data) {
        const path = fileSaved.data.path
        await supabase.from('datasets').insert({
            name_file: name,
            file_id: fileSaved.data.id,
            user_id: userId,
            id: fileSaved.data.id
        })

        return encodedRedirect("success", `/studio/1?file_path=${path}&file_id=${fileSaved.data.id}`, "File uploaded successfully")
    }
    if (fileSaved.error) {
        return encodedRedirect("error", "/studio", fileSaved.error.message)
    }

}