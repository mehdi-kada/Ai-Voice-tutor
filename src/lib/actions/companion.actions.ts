"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { supabaseIntegration } from "@sentry/nextjs";

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
export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companion").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
};

export async function getCompanion(id: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companion")
    .select()
    .eq("id", id);
  if (error) return console.log(error);
  return data[0];
}

export async function addToSession(companionId: string) {
  const supabase = createSupabaseClient();
  // returns an object with userId, need to destructure
  const { userId } = await auth();

  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);
  return data;
}

export const getRecentSessions = async (limit = 10) => {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    // this is a join to get companions where companion_id equals the pk of companion table, you will get a companion object
    .select(`companion:companion_id(*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companion }) => companion);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companion:companion_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data.map(({ companion }) => companion);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("companion")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};
