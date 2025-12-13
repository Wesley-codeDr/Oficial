# Data Model: WellWave MVP

## Overview

Este documento define o modelo de dados para o MVP do WellWave, baseado nas entidades identificadas na especificação e nas decisões técnicas do research.md.

**Database:** PostgreSQL (via Supabase)
**ORM:** Prisma
**Versioning:** Migration-based

---

## Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────────┐       ┌─────────────────────┐
│     User        │       │      Syndrome       │       │     Checkbox        │
├─────────────────┤       ├─────────────────────┤       ├─────────────────────┤
│ id (PK)         │       │ id (PK)             │       │ id (PK)             │
│ email           │       │ name                │       │ syndrome_id (FK)    │
│ full_name       │       │ code                │       │ category            │
│ crm_number      │       │ description         │       │ display_text        │
│ crm_state       │       │ icon                │       │ narrative_text      │
│ specialty       │       │ order_index         │       │ is_required         │
│ created_at      │       │ is_active           │       │ is_red_flag         │
│ updated_at      │       │ created_at          │       │ is_negative         │
│ last_login_at   │       │ updated_at          │       │ order_index         │
└────────┬────────┘       └──────────┬──────────┘       │ created_at          │
         │                           │                  │ updated_at          │
         │                           │                  └──────────┬──────────┘
         │                           │                             │
         │                           └──────────────┬──────────────┘
         │                                          │
         │                                          │
         ▼                                          ▼
┌─────────────────────┐                ┌─────────────────────────────┐
│  AnamneseSession    │                │       RedFlagRule           │
├─────────────────────┤                ├─────────────────────────────┤
│ id (PK)             │                │ id (PK)                     │
│ user_id (FK)        │                │ syndrome_id (FK)            │
│ syndrome_id (FK)    │                │ name                        │
│ checked_items       │                │ description                 │
│ generated_text      │                │ severity (warning|critical) │
│ output_mode         │                │ condition_json              │
│ red_flags_detected  │                │ message                     │
│ was_copied          │                │ is_active                   │
│ started_at          │                │ created_at                  │
│ completed_at        │                │ updated_at                  │
│ created_at          │                └─────────────────────────────┘
└────────┬────────────┘
         │
         │
         ▼
┌─────────────────────────────┐       ┌─────────────────────────────┐
│      ChatConversation       │       │       ChatMessage           │
├─────────────────────────────┤       ├─────────────────────────────┤
│ id (PK)                     │◄──────│ id (PK)                     │
│ session_id (FK)             │       │ conversation_id (FK)        │
│ user_id (FK)                │       │ role (user|assistant)       │
│ context_snapshot            │       │ content                     │
│ created_at                  │       │ citations                   │
│ updated_at                  │       │ created_at                  │
└─────────────────────────────┘       └─────────────────────────────┘

┌─────────────────────────────┐
│        AuditLog             │
├─────────────────────────────┤
│ id (PK)                     │
│ user_id (FK)                │
│ action                      │
│ resource_type               │
│ resource_id                 │
│ metadata                    │
│ ip_address                  │
│ created_at                  │
└─────────────────────────────┘
```

---

## Entity Definitions

### 1. User

Representa um médico cadastrado no sistema.

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  fullName      String    @map("full_name")
  crmNumber     String    @map("crm_number")
  crmState      String    @map("crm_state") @db.Char(2)
  specialty     String?
  isActive      Boolean   @default(true) @map("is_active")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  lastLoginAt   DateTime? @map("last_login_at")

  // Relations
  sessions      AnamneseSession[]
  conversations ChatConversation[]
  auditLogs     AuditLog[]

  @@map("users")
  @@index([email])
  @@index([crmNumber, crmState])
}
```

**Validation Rules:**
- `email`: Valid email format, unique
- `crmNumber`: Numeric string, 4-6 digits
- `crmState`: Valid Brazilian state code (uppercase, 2 chars)
- `fullName`: 2-100 characters

**Notes:**
- Password handled by Supabase Auth (not stored here)
- `lastLoginAt` updated on each successful login

---

### 2. Syndrome

Template de síndrome clínica com seus checkboxes associados.

```prisma
model Syndrome {
  id          String    @id @default(uuid())
  name        String    @unique
  code        String    @unique
  description String?
  icon        String?
  orderIndex  Int       @map("order_index")
  isActive    Boolean   @default(true) @map("is_active")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  // Relations
  checkboxes    Checkbox[]
  redFlagRules  RedFlagRule[]
  sessions      AnamneseSession[]

  @@map("syndromes")
  @@index([code])
  @@index([orderIndex])
}
```

**Seed Data (MVP):**
| name | code | description |
|------|------|-------------|
| Dor Torácica | CHEST_PAIN | Dor torácica / Cardiovascular |
| Dispneia | DYSPNEA | Dispneia / Respiratória |
| Abdome Agudo | ACUTE_ABDOMEN | Abdome Agudo |

---

### 3. Checkbox

Item de checkbox individual associado a uma síndrome.

```prisma
model Checkbox {
  id            String   @id @default(uuid())
  syndromeId    String   @map("syndrome_id")
  category      CheckboxCategory
  displayText   String   @map("display_text")
  narrativeText String   @map("narrative_text")
  isRequired    Boolean  @default(false) @map("is_required")
  isRedFlag     Boolean  @default(false) @map("is_red_flag")
  isNegative    Boolean  @default(false) @map("is_negative")
  orderIndex    Int      @map("order_index")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  // Relations
  syndrome      Syndrome @relation(fields: [syndromeId], references: [id])

  @@map("checkboxes")
  @@index([syndromeId])
  @@index([category])
  @@index([orderIndex])
}

enum CheckboxCategory {
  QP              // Queixa Principal
  HDA             // História da Doença Atual
  ANTECEDENTES    // Antecedentes Pessoais
  MEDICACOES      // Medicações em Uso
  ALERGIAS        // Alergias
  HABITOS         // Hábitos
  EXAME_FISICO    // Exame Físico
  NEGATIVAS       // Negativas Importantes

  @@map("checkbox_category")
}
```

**Validation Rules:**
- `displayText`: 1-200 characters (shown in UI)
- `narrativeText`: 1-500 characters (inserted in generated text)
- `orderIndex`: Unique within syndrome+category combination

**Examples:**
| displayText | narrativeText | category | isRedFlag | isNegative |
|-------------|---------------|----------|-----------|------------|
| Dor precordial em aperto | Paciente refere dor precordial de caráter constritivo | QP | false | false |
| Síncope | associada a síncope | QP | true | false |
| Nega dispneia | Nega dispneia | NEGATIVAS | false | true |

---

### 4. RedFlagRule

Regras para detecção automática de sinais de alarme.

```prisma
model RedFlagRule {
  id            String        @id @default(uuid())
  syndromeId    String        @map("syndrome_id")
  name          String
  description   String?
  severity      RedFlagSeverity
  conditionJson Json          @map("condition_json")
  message       String
  isActive      Boolean       @default(true) @map("is_active")
  createdAt     DateTime      @default(now()) @map("created_at")
  updatedAt     DateTime      @updatedAt @map("updated_at")

  // Relations
  syndrome      Syndrome      @relation(fields: [syndromeId], references: [id])

  @@map("red_flag_rules")
  @@index([syndromeId])
}

enum RedFlagSeverity {
  WARNING
  CRITICAL

  @@map("red_flag_severity")
}
```

**Condition JSON Format:**
```json
{
  "type": "AND",
  "conditions": [
    { "type": "checkbox", "id": "uuid-dor-tipica", "value": true },
    { "type": "OR", "conditions": [
      { "type": "checkbox", "id": "uuid-has", "value": true },
      { "type": "checkbox", "id": "uuid-dm", "value": true },
      { "type": "checkbox", "id": "uuid-tabagismo", "value": true }
    ]}
  ]
}
```

**Example Rules:**
| name | severity | message |
|------|----------|---------|
| SCA Alto Risco | CRITICAL | Dor torácica típica com fatores de risco cardiovascular |
| Abdome Agudo Cirúrgico | CRITICAL | Sinais sugestivos de abdome agudo cirúrgico |
| Dispneia Grave | WARNING | Uso de musculatura acessória identificado |

---

### 5. AnamneseSession

Sessão de preenchimento de anamnese.

```prisma
model AnamneseSession {
  id               String    @id @default(uuid())
  userId           String    @map("user_id")
  syndromeId       String    @map("syndrome_id")
  checkedItems     Json      @map("checked_items") // Array of checkbox IDs
  generatedText    String?   @map("generated_text") @db.Text
  outputMode       OutputMode @default(SUMMARY) @map("output_mode")
  redFlagsDetected Json?     @map("red_flags_detected") // Array of RedFlagRule IDs
  wasCopied        Boolean   @default(false) @map("was_copied")
  startedAt        DateTime  @default(now()) @map("started_at")
  completedAt      DateTime? @map("completed_at")
  createdAt        DateTime  @default(now()) @map("created_at")

  // Relations
  user          User         @relation(fields: [userId], references: [id])
  syndrome      Syndrome     @relation(fields: [syndromeId], references: [id])
  conversation  ChatConversation?

  @@map("anamnese_sessions")
  @@index([userId])
  @@index([syndromeId])
  @@index([startedAt])
}

enum OutputMode {
  SUMMARY   // Modo resumido (PS)
  DETAILED  // Modo expandido (internação)

  @@map("output_mode")
}
```

**Checked Items JSON Format:**
```json
[
  "uuid-checkbox-1",
  "uuid-checkbox-2",
  "uuid-checkbox-3"
]
```

**Notes:**
- `generatedText` armazenado para auditoria
- `wasCopied` usado para métricas de engajamento
- RLS: Usuário só acessa próprias sessões

---

### 6. ChatConversation

Conversa com o ChatWell associada a uma sessão.

```prisma
model ChatConversation {
  id              String    @id @default(uuid())
  sessionId       String?   @unique @map("session_id")
  userId          String    @map("user_id")
  contextSnapshot Json?     @map("context_snapshot") // Snapshot of anamnese at conversation start
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")

  // Relations
  session         AnamneseSession? @relation(fields: [sessionId], references: [id])
  user            User             @relation(fields: [userId], references: [id])
  messages        ChatMessage[]

  @@map("chat_conversations")
  @@index([userId])
  @@index([sessionId])
}
```

---

### 7. ChatMessage

Mensagem individual em uma conversa de chat.

```prisma
model ChatMessage {
  id             String    @id @default(uuid())
  conversationId String    @map("conversation_id")
  role           MessageRole
  content        String    @db.Text
  citations      Json?     // Array of citation objects
  createdAt      DateTime  @default(now()) @map("created_at")

  // Relations
  conversation   ChatConversation @relation(fields: [conversationId], references: [id])

  @@map("chat_messages")
  @@index([conversationId])
  @@index([createdAt])
}

enum MessageRole {
  USER
  ASSISTANT

  @@map("message_role")
}
```

**Citations JSON Format:**
```json
[
  {
    "author": "Thygesen K et al.",
    "title": "Fourth Universal Definition of Myocardial Infarction",
    "journal": "European Heart Journal",
    "year": 2018,
    "pmid": "30165617",
    "doi": "10.1093/eurheartj/ehy462"
  }
]
```

---

### 8. AuditLog

Log de auditoria para compliance.

```prisma
model AuditLog {
  id           String   @id @default(uuid())
  userId       String?  @map("user_id")
  action       String
  resourceType String   @map("resource_type")
  resourceId   String?  @map("resource_id")
  metadata     Json?
  ipAddress    String?  @map("ip_address")
  createdAt    DateTime @default(now()) @map("created_at")

  // Relations
  user         User?    @relation(fields: [userId], references: [id])

  @@map("audit_logs")
  @@index([userId])
  @@index([action])
  @@index([resourceType])
  @@index([createdAt])
}
```

**Actions:**
| action | resourceType | description |
|--------|--------------|-------------|
| LOGIN | USER | User logged in |
| LOGOUT | USER | User logged out |
| SESSION_START | ANAMNESE_SESSION | Started filling anamnese |
| SESSION_COMPLETE | ANAMNESE_SESSION | Completed anamnese |
| TEXT_COPIED | ANAMNESE_SESSION | Copied generated text |
| CHAT_MESSAGE | CHAT_CONVERSATION | Sent message to EBM chat |

**Notes:**
- NO PHI in metadata (compliance requirement)
- IP address stored for security auditing
- Retained per LGPD requirements

---

## Row Level Security (RLS)

Todas as tabelas com dados de usuário devem ter RLS habilitado:

```sql
-- Users: can only read/update own profile
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- AnamneseSession: user can only access own sessions
ALTER TABLE anamnese_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can access own sessions" ON anamnese_sessions
  FOR ALL USING (auth.uid()::text = user_id);

-- ChatConversation: user can only access own conversations
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can access own conversations" ON chat_conversations
  FOR ALL USING (auth.uid()::text = user_id);

-- ChatMessage: via conversation relationship
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can access own messages" ON chat_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE chat_conversations.id = chat_messages.conversation_id
      AND auth.uid()::text = chat_conversations.user_id
    )
  );

-- Syndromes/Checkboxes: public read
ALTER TABLE syndromes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read syndromes" ON syndromes
  FOR SELECT USING (true);

ALTER TABLE checkboxes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read checkboxes" ON checkboxes
  FOR SELECT USING (true);

ALTER TABLE red_flag_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read red flag rules" ON red_flag_rules
  FOR SELECT USING (true);
```

---

## Indexes

Já definidos nas annotations `@@index` acima. Principais para performance:

| Table | Index | Purpose |
|-------|-------|---------|
| users | email | Login lookup |
| users | crmNumber, crmState | CRM validation |
| checkboxes | syndromeId | Load checkboxes by syndrome |
| anamnese_sessions | userId | User's session history |
| anamnese_sessions | startedAt | Recent sessions |
| audit_logs | createdAt | Time-based queries |

---

## Migration Strategy

1. **Initial Migration**: Create all tables with base structure
2. **Seed Migration**: Populate syndromes, checkboxes, red flag rules for MVP
3. **RLS Migration**: Enable RLS and create policies

```bash
# Development workflow
npx prisma migrate dev --name init
npx prisma db seed

# Production
npx prisma migrate deploy
```

---

## Data Retention

Per LGPD and Constitution requirements:

| Data Type | Retention | Notes |
|-----------|-----------|-------|
| User profile | Account lifetime + 30 days | Deleted on account deletion |
| Anamnese sessions | 5 years | CFM audit requirement |
| Chat conversations | 5 years | Part of clinical record |
| Audit logs | 5 years | Compliance requirement |

---

## References

- Spec: `/specs/1-wellwave-mvp/spec.md`
- Research: `/specs/1-wellwave-mvp/research.md`
- Constitution: `/memory/constitution.md`
- Prisma Documentation: https://www.prisma.io/docs
- Supabase RLS: https://supabase.com/docs/guides/auth/row-level-security
