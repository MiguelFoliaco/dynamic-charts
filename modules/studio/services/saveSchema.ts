import { createClient } from "@/utils/supabase/client"

export const saveSchema = async (idDataset: string, schemaProperties: Record<string, string>, name: string) => {
    const supabase = createClient()
    const schema = await supabase.from('schemas').insert({
        code: name.toUpperCase().replaceAll(' ', '_'),
        name_schema: name.replaceAll(' ', '_'),
        description: '',
    }).select('id')
    if (schema.data) {
        const keys = Object.keys(schemaProperties)
        const properties = await supabase.from('properties').insert(
            keys.map(e => ({ column_name: e, column_type: schemaProperties[e], schema_id: schema.data[0].id, }))
        )
        if (!properties.error) {
            await supabase.from('datasets').update({
                schema_id: schema.data[0].id,
                id: idDataset
            });

            return {
                data: 'File save successfully'
            }

        } else {
            supabase.from('schemas').delete().eq('id', schema.data[0].id)
            return {
                error: 'Error on create properties'
            }
        }
    }
    else {
        return {
            error: 'Error on create schema'
        }
    }
}