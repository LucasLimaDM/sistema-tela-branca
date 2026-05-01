DO $$
BEGIN
  -- Data Remediation: Clean up distorted JIDs/LIDs saved as phone_number in whatsapp_contacts
  UPDATE public.whatsapp_contacts
  SET phone_number = NULL
  WHERE length(regexp_replace(phone_number, '\D', '', 'g')) > 15;
  
  -- Also clean up contact_identity table canonical_phone
  UPDATE public.contact_identity
  SET canonical_phone = NULL
  WHERE length(regexp_replace(canonical_phone, '\D', '', 'g')) > 15;
END $$;
