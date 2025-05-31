"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export async function createCompanion(formData: CreateCompanion) {
  // you need to get the user creating the companion to insert it to the table in supabase
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companion")
    .insert({ ...formData, author })
    .select();

  // throwing a new error stops the excution , while loging it continues the execution
  if (error || !data) {
    throw new Error(error?.message || "failed to create a new companion ");
  }
  return data[0];
}
// edge functions need to create supabase clients each time
export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('companion').select();

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if(error) throw new Error(error.message);

    return companions;
}
