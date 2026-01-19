# Automaker - WellWave Edition

## 🚀 Performance Optimized (3x faster)

### Quick Start
```bash
# Usar Automaker agora está 3x mais rápido
# Apenas abra a aplicação e crie features
```

### What Changed?
- ✅ Features antigas arquivadas (11 features → 0)
- ✅ Modelo padrão mudou para Haiku (3x mais rápido)
- ✅ Contexto reduzido (70% menos dados carregados)
- ✅ Workflows automáticos desabilitados (controle manual)

### File Structure
```
.automaker/
├── config.json              # Configuração otimizada
├── categories.json          # 15 categorias
├── .automakerignore         # Arquivos ignorados
│
├── features/                # (vazio - limpo)
├── archive/                 # Features antigas (3.7MB)
├── memory/                  # Learnings (52KB)
├── templates/               # Templates (20KB)
├── scripts/                 # Manutenção
│   └── cleanup.sh           # Limpeza semanal
│
├── QUICKSTART.md            # ⭐ Leia isso primeiro
├── PERFORMANCE.md           # Detalhes técnicos
├── CHANGELOG.md             # O que mudou
└── README.md                # Este arquivo
```

### Categories & Models

| Category | Model | Speed | Use For |
|----------|-------|-------|---------|
| Medical | Sonnet | Slow | CFM compliance, anamnese |
| UI/UX | Haiku | Fast | Components, design |
| API | Haiku | Fast | Endpoints |
| Bug Fix | Haiku | Fast | Quick fixes |
| Others | Haiku | Fast | General tasks |

### Performance Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Startup | 10s | 3s | **70% faster** |
| Context | 5 files | 2 files | **60% less** |
| Model | Sonnet | Haiku | **3x faster** |
| Size | 3.8MB | 72KB | **98% smaller** |

### Usage

#### Create Feature (Fast)
1. Open Automaker
2. Click "New Feature"
3. Choose category (auto-assigns model)
4. Describe task
5. Done! (3-5 seconds)

#### Weekly Maintenance
```bash
.automaker/scripts/cleanup.sh
```

### Documentation

- **QUICKSTART.md** - Start here (2 min read)
- **PERFORMANCE.md** - Technical details (5 min read)
- **CHANGELOG.md** - What changed (1 min read)

### Troubleshooting

**Still slow?**
1. Check `.automaker/features/` is empty
2. Run `cleanup.sh`
3. Restart Automaker

**Wrong model?**
- Medical category → Sonnet (accurate)
- Everything else → Haiku (fast)

**Too much context?**
- Verify `config.json` has `maxFilesPerFeature: 2`
- Check `.automakerignore` exists

---

**Version**: 2.0.0 | **Last Updated**: 2026-01-17 | **Status**: Optimized ✅
