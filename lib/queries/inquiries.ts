import { isAdminSupabaseConfigured, createAdminSupabaseClient } from "@/lib/supabase/admin";
import { runSupabaseMutation } from "@/lib/supabase/helpers";

export type ContactInquiryInsert = {
  name: string;
  email: string;
  phone?: string | null;
  topic: string;
  message: string;
};

export type RepairInquiryInsert = {
  name: string;
  email: string;
  phone?: string | null;
  piece_description: string;
  message: string;
};

export async function insertContactInquiry(payload: ContactInquiryInsert): Promise<void> {
  if (isAdminSupabaseConfigured()) {
    const admin = createAdminSupabaseClient();
    const { error } = await admin.from("contact_inquiries").insert(payload);
    if (error) throw error;
    return;
  }

  await runSupabaseMutation("contactInquiries.insert", async (supabase) =>
    supabase.from("contact_inquiries").insert(payload)
  );
}

export async function insertRepairInquiry(payload: RepairInquiryInsert): Promise<void> {
  if (isAdminSupabaseConfigured()) {
    const admin = createAdminSupabaseClient();
    const { error } = await admin.from("repair_inquiries").insert(payload);
    if (error) throw error;
    return;
  }

  await runSupabaseMutation("repairInquiries.insert", async (supabase) =>
    supabase.from("repair_inquiries").insert(payload)
  );
}
