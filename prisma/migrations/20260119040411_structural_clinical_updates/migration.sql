-- CreateEnum
CREATE TYPE "checkbox_category" AS ENUM ('QP', 'HDA', 'ANTECEDENTES', 'MEDICACOES', 'ALERGIAS', 'HABITOS', 'EXAME_FISICO', 'NEGATIVAS');

-- CreateEnum
CREATE TYPE "red_flag_severity" AS ENUM ('WARNING', 'CRITICAL');

-- CreateEnum
CREATE TYPE "output_mode" AS ENUM ('SUMMARY', 'DETAILED');

-- CreateEnum
CREATE TYPE "message_role" AS ENUM ('USER', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "checkbox_section" AS ENUM ('FLASH', 'DETAILED', 'BOTH');

-- CreateEnum
CREATE TYPE "tag_category" AS ENUM ('AGE', 'SYSTEM', 'SYNDROME', 'RISK', 'CONTEXT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "crm_number" TEXT NOT NULL,
    "crm_state" CHAR(2) NOT NULL,
    "specialty" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "syndromes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "order_index" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "complexity_level" INTEGER NOT NULL DEFAULT 1,
    "suggested_differential" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "syndromes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkboxes" (
    "id" TEXT NOT NULL,
    "syndrome_id" TEXT NOT NULL,
    "category" "checkbox_category" NOT NULL,
    "display_text" TEXT NOT NULL,
    "narrative_text" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT false,
    "is_red_flag" BOOLEAN NOT NULL DEFAULT false,
    "is_negative" BOOLEAN NOT NULL DEFAULT false,
    "order_index" INTEGER NOT NULL,
    "parent_id" TEXT,
    "section" "checkbox_section" NOT NULL DEFAULT 'BOTH',
    "depends_on_id" TEXT,
    "depends_on_value" BOOLEAN,
    "triggers_calculator" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkboxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "red_flag_rules" (
    "id" TEXT NOT NULL,
    "syndrome_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "severity" "red_flag_severity" NOT NULL,
    "condition_json" JSONB NOT NULL,
    "message" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "red_flag_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anamnese_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "syndrome_id" TEXT NOT NULL,
    "checked_items" JSONB NOT NULL,
    "generated_text" TEXT,
    "output_mode" "output_mode" NOT NULL DEFAULT 'SUMMARY',
    "red_flags_detected" JSONB,
    "was_copied" BOOLEAN NOT NULL DEFAULT false,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anamnese_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_conversations" (
    "id" TEXT NOT NULL,
    "session_id" TEXT,
    "user_id" TEXT NOT NULL,
    "context_snapshot" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "role" "message_role" NOT NULL,
    "content" TEXT NOT NULL,
    "citations" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "resource_id" TEXT,
    "metadata" JSONB,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chief_complaint_groups" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name_pt" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "order_index" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chief_complaint_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chief_complaint_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "chief_complaint_id" TEXT NOT NULL,
    "patient_context" JSONB NOT NULL,
    "selected_flow" JSONB,
    "calculator_results" JSONB,
    "generated_text" TEXT,
    "red_flags_detected" JSONB,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chief_complaint_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chief_complaint_tags" (
    "id" TEXT NOT NULL,
    "complaint_id" TEXT NOT NULL,
    "category" "tag_category" NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chief_complaint_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chief_complaints" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name_pt" TEXT NOT NULL,
    "name_en" TEXT,
    "definition" TEXT,
    "synonyms" TEXT[],
    "icd10_codes" TEXT[],
    "is_time_sensitive" BOOLEAN NOT NULL DEFAULT false,
    "is_high_acuity" BOOLEAN NOT NULL DEFAULT false,
    "requires_isolation" BOOLEAN NOT NULL DEFAULT false,
    "syndrome_id" TEXT,
    "default_calculator_id" TEXT,
    "clinical_flow" JSONB,
    "additional_data" JSONB,
    "order_index" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chief_complaints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaint_search_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "search_term" TEXT NOT NULL,
    "result_count" INTEGER NOT NULL,
    "selected_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complaint_search_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source_documents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "source_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_extractions" (
    "id" TEXT NOT NULL,
    "source_document_id" TEXT NOT NULL,
    "extractedData" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_extractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "draft_syndromes" (
    "id" TEXT NOT NULL,
    "content_extraction_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "data" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "draft_syndromes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_crm_number_crm_state_idx" ON "users"("crm_number", "crm_state");

-- CreateIndex
CREATE UNIQUE INDEX "syndromes_name_key" ON "syndromes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "syndromes_code_key" ON "syndromes"("code");

-- CreateIndex
CREATE INDEX "syndromes_code_idx" ON "syndromes"("code");

-- CreateIndex
CREATE INDEX "syndromes_order_index_idx" ON "syndromes"("order_index");

-- CreateIndex
CREATE INDEX "syndromes_complexity_level_idx" ON "syndromes"("complexity_level");

-- CreateIndex
CREATE INDEX "checkboxes_syndrome_id_idx" ON "checkboxes"("syndrome_id");

-- CreateIndex
CREATE INDEX "checkboxes_category_idx" ON "checkboxes"("category");

-- CreateIndex
CREATE INDEX "checkboxes_order_index_idx" ON "checkboxes"("order_index");

-- CreateIndex
CREATE INDEX "checkboxes_parent_id_idx" ON "checkboxes"("parent_id");

-- CreateIndex
CREATE INDEX "red_flag_rules_syndrome_id_idx" ON "red_flag_rules"("syndrome_id");

-- CreateIndex
CREATE INDEX "red_flag_rules_is_active_idx" ON "red_flag_rules"("is_active");

-- CreateIndex
CREATE INDEX "red_flag_rules_syndrome_id_is_active_idx" ON "red_flag_rules"("syndrome_id", "is_active");

-- CreateIndex
CREATE INDEX "anamnese_sessions_user_id_idx" ON "anamnese_sessions"("user_id");

-- CreateIndex
CREATE INDEX "anamnese_sessions_syndrome_id_idx" ON "anamnese_sessions"("syndrome_id");

-- CreateIndex
CREATE INDEX "anamnese_sessions_started_at_idx" ON "anamnese_sessions"("started_at");

-- CreateIndex
CREATE INDEX "anamnese_sessions_created_at_idx" ON "anamnese_sessions"("created_at");

-- CreateIndex
CREATE INDEX "anamnese_sessions_user_id_created_at_idx" ON "anamnese_sessions"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "chat_conversations_session_id_key" ON "chat_conversations"("session_id");

-- CreateIndex
CREATE INDEX "chat_conversations_user_id_idx" ON "chat_conversations"("user_id");

-- CreateIndex
CREATE INDEX "chat_conversations_session_id_idx" ON "chat_conversations"("session_id");

-- CreateIndex
CREATE INDEX "chat_conversations_created_at_idx" ON "chat_conversations"("created_at");

-- CreateIndex
CREATE INDEX "chat_conversations_updated_at_idx" ON "chat_conversations"("updated_at");

-- CreateIndex
CREATE INDEX "chat_conversations_user_id_updated_at_idx" ON "chat_conversations"("user_id", "updated_at");

-- CreateIndex
CREATE INDEX "chat_messages_conversation_id_idx" ON "chat_messages"("conversation_id");

-- CreateIndex
CREATE INDEX "chat_messages_created_at_idx" ON "chat_messages"("created_at");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_resource_type_idx" ON "audit_logs"("resource_type");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "chief_complaint_groups_code_key" ON "chief_complaint_groups"("code");

-- CreateIndex
CREATE INDEX "chief_complaint_groups_code_idx" ON "chief_complaint_groups"("code");

-- CreateIndex
CREATE INDEX "chief_complaint_groups_order_index_idx" ON "chief_complaint_groups"("order_index");

-- CreateIndex
CREATE INDEX "chief_complaint_sessions_chief_complaint_id_idx" ON "chief_complaint_sessions"("chief_complaint_id");

-- CreateIndex
CREATE INDEX "chief_complaint_sessions_started_at_idx" ON "chief_complaint_sessions"("started_at");

-- CreateIndex
CREATE INDEX "chief_complaint_sessions_user_id_idx" ON "chief_complaint_sessions"("user_id");

-- CreateIndex
CREATE INDEX "chief_complaint_tags_category_idx" ON "chief_complaint_tags"("category");

-- CreateIndex
CREATE INDEX "chief_complaint_tags_complaint_id_idx" ON "chief_complaint_tags"("complaint_id");

-- CreateIndex
CREATE INDEX "chief_complaint_tags_value_idx" ON "chief_complaint_tags"("value");

-- CreateIndex
CREATE UNIQUE INDEX "chief_complaint_tags_complaint_id_category_value_key" ON "chief_complaint_tags"("complaint_id", "category", "value");

-- CreateIndex
CREATE UNIQUE INDEX "chief_complaints_code_key" ON "chief_complaints"("code");

-- CreateIndex
CREATE INDEX "chief_complaints_code_idx" ON "chief_complaints"("code");

-- CreateIndex
CREATE INDEX "chief_complaints_group_id_idx" ON "chief_complaints"("group_id");

-- CreateIndex
CREATE INDEX "chief_complaints_is_high_acuity_idx" ON "chief_complaints"("is_high_acuity");

-- CreateIndex
CREATE INDEX "chief_complaints_is_time_sensitive_idx" ON "chief_complaints"("is_time_sensitive");

-- CreateIndex
CREATE INDEX "chief_complaints_order_index_idx" ON "chief_complaints"("order_index");

-- CreateIndex
CREATE INDEX "chief_complaints_syndrome_id_idx" ON "chief_complaints"("syndrome_id");

-- CreateIndex
CREATE INDEX "complaint_search_logs_user_id_idx" ON "complaint_search_logs"("user_id");

-- CreateIndex
CREATE INDEX "complaint_search_logs_search_term_idx" ON "complaint_search_logs"("search_term");

-- CreateIndex
CREATE INDEX "complaint_search_logs_created_at_idx" ON "complaint_search_logs"("created_at");

-- CreateIndex
CREATE INDEX "content_extractions_source_document_id_idx" ON "content_extractions"("source_document_id");

-- CreateIndex
CREATE UNIQUE INDEX "draft_syndromes_content_extraction_id_key" ON "draft_syndromes"("content_extraction_id");

-- AddForeignKey
ALTER TABLE "checkboxes" ADD CONSTRAINT "checkboxes_syndrome_id_fkey" FOREIGN KEY ("syndrome_id") REFERENCES "syndromes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkboxes" ADD CONSTRAINT "checkboxes_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "checkboxes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "red_flag_rules" ADD CONSTRAINT "red_flag_rules_syndrome_id_fkey" FOREIGN KEY ("syndrome_id") REFERENCES "syndromes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anamnese_sessions" ADD CONSTRAINT "anamnese_sessions_syndrome_id_fkey" FOREIGN KEY ("syndrome_id") REFERENCES "syndromes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anamnese_sessions" ADD CONSTRAINT "anamnese_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_conversations" ADD CONSTRAINT "chat_conversations_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "anamnese_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_conversations" ADD CONSTRAINT "chat_conversations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "chat_conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chief_complaint_sessions" ADD CONSTRAINT "chief_complaint_sessions_chief_complaint_id_fkey" FOREIGN KEY ("chief_complaint_id") REFERENCES "chief_complaints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chief_complaint_sessions" ADD CONSTRAINT "chief_complaint_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chief_complaint_tags" ADD CONSTRAINT "chief_complaint_tags_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "chief_complaints"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chief_complaints" ADD CONSTRAINT "chief_complaints_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "chief_complaint_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chief_complaints" ADD CONSTRAINT "chief_complaints_syndrome_id_fkey" FOREIGN KEY ("syndrome_id") REFERENCES "syndromes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint_search_logs" ADD CONSTRAINT "complaint_search_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_extractions" ADD CONSTRAINT "content_extractions_source_document_id_fkey" FOREIGN KEY ("source_document_id") REFERENCES "source_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draft_syndromes" ADD CONSTRAINT "draft_syndromes_content_extraction_id_fkey" FOREIGN KEY ("content_extraction_id") REFERENCES "content_extractions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
