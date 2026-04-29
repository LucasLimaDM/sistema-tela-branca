ALTER TABLE public.ai_agents
  ADD COLUMN IF NOT EXISTS human_handoff_enabled BOOLEAN NOT NULL DEFAULT false;
