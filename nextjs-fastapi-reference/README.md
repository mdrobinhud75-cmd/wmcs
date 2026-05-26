# World Music Champion System (WMCS v3.0) Solutions Architecture
#### Next.js + FastAPI Decentralized Creative Orchestrator Integration Manual

This reference directory provides the architectural foundation for running the **World Music Champion System (WMCS v3.0)** within a distributed production environment. 

The architecture implements a **Saga Workflow Engine** designed for high availability and extreme transactional safety when running long-running generative AI pipelines across multiple LLM clusters.

---

## 1. 4-Layer Memory Fabric & Storage Schema

Long-running agent states are backed by the following multi-tier hybrid telemetry and immutable backup store:

```
[ L1: Redis Session Cache ]  ---> Temporal task steps & CONTINUE_FROM snapshots (Sub-millisecond)
           |
[ L2: PostgreSQL DB Core ]   ---> Relational tracking tables, audit metrics, compliance history
           |
[ L3: Qdrant Vector DB ]     ---> Semantic embeddings of successful song briefs & lyrics benchmarks
           |
[ L4: Google Drive Archive]  ---> Finalized immutable assets (multimedia files, full pipelines logs)
```

### PostgreSQL Relational DDL Schema
These tables secure historical compliance audits and ensure pipeline state transitions follow strict monotonicity constraints.

```sql
-- Core Accounts & Authorization Tiers
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    licensing_tier VARCHAR(50) DEFAULT 'STANDARD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Immutable Song Catalog Submissions Registry
CREATE TABLE song_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    serial_number VARCHAR(100) UNIQUE NOT NULL, -- Format: WMCS-[YEAR]-[REGION]-[GENRE]-[SERIAL]
    title VARCHAR(255) NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    genre_code VARCHAR(100) NOT NULL,
    subgenre_code VARCHAR(100) NOT NULL,
    selected_emotion VARCHAR(255) NOT NULL,
    tempo_bpm INT NOT NULL,
    qa_total_score INT NOT NULL CHECK (qa_total_score >= 65),
    lyrics_payload JSONB NOT NULL,
    production_payload JSONB NOT NULL,
    platforms_publishing_urls JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Active Orchestration Pipelines (Durable state transactions)
CREATE TABLE orchestration_pipelines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_user_id UUID REFERENCES users(id),
    current_phase VARCHAR(50) NOT NULL, -- Research, Creation, QA, Complete
    current_step_index INT DEFAULT 0,
    overall_progress INT DEFAULT 0,
    locked_country_code VARCHAR(10),
    locked_genre_code VARCHAR(100),
    active_song_id UUID REFERENCES song_catalog(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Agent Runs Auditing Ledgers
CREATE TABLE agent_execution_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID REFERENCES orchestration_pipelines(id) ON DELETE CASCADE,
    agent_id VARCHAR(10) NOT NULL, -- '01' to '17'
    agent_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL, -- IDLE, ACTIVE, PASS, RETRY, BLOCK, FAIL
    task_description TEXT,
    latency_ms INT DEFAULT 0,
    output_snapshot JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. Saga Pattern & Interruption Recovery

To prevent loss of compute context on server failure, **Agent 15 (Context Recall)** operates in conjunction with an L1 Redis Hot Cache.

### Pipeline Savepoint Transaction (L1 Redis Write)
Every agent status update emitting `PASS` triggers a synchronous transaction writing the current session snapshot:

```json
// Redis Key: wmcs:session:pipe_f9024a1b
{
  "pipeline_id": "pipe_f9024a1b",
  "status": "WAITING_CREATIVE_LOCK",
  "current_step_index": 3,
  "restore_checkpoint": {
    "target_country_code": "US",
    "target_genre": "Dance Pop",
    "selected_emotion": "Confessional Nostalgia",
    "dna_brief_text": "US Dance Pop. Hook arrival < 20s. Concrete noun constraint active."
  },
  "agent_matrix": {
    "01": "PASS",
    "02": "PASS",
    "03": "PASS",
    "04": "IDLE",
    "05": "IDLE",
    "06": "IDLE"
  },
  "continue_from": "AGENT_03_COMPLETED"
}
```

### Interruption Recovery (Agent 15 Workflow)
1. On client reconnect or container boot: The orchestrator queries L1 Cache `wmcs:session:{id}`.
2. If cache exists, **Agent 15** verifies checksums against the Postgres status ledger.
3. The front-end receives a `RESTORED` snapshot with the `CONTINUE_FROM` marker.
4. The client state transitions instantly to the active step, bypassing redundant AI model queries.

---

## 3. Launching the Orchestrator

### 1. Requirements
Ensure your Python node has the appropriate packages installed:
```bash
pip install fastapi uvicorn pydantic
```

### 2. Launch FastAPI Engine
To run the server locally on port 8000:
```bash
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Verify Health check
```bash
curl http://localhost:8000/api/v1/health
```

---
**Constitutional Authority Mandate**: Any modifications to the state transition logic must maintain monotonic constraints and wait for human resolution gates regarding Type C selection items.
