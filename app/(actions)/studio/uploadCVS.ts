'use server';

export const uploadCVSAction = async (formData: FormData) => {
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

    console.log(dataParse)
}