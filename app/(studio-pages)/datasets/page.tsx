import { DataSet } from "@/modules/data/components";
import { createClient } from "@/utils/supabase/server";

const getDataSetList = async () => {
    const supabase = await createClient()
    const data = await supabase.from('datasets').select('*');
    return data.data;
}

export default async function DatasetPage() {
    const data = await getDataSetList();
    return (
        <>
            {
                data &&
                <DataSet data={data} />
            }
        </>

    );
}