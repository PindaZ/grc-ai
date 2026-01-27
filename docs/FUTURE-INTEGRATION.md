# Future Integration Guide

## Overview
This prototype uses mocks. This document explains how to replace them with real implementations.

## Adapter Boundaries

### 1. AI Service (`/services/ai/`)
**Current**: Mock responses with fake delays
**Future**: Replace with real AI API calls

```typescript
// Interface to implement
interface IAIService {
  suggest(context: AIContext): Promise<Suggestion[]>
  generate(action: string, entity: Entity): Promise<GeneratedContent>
  analyze(file: File): Promise<AnalysisResult>
  draft(type: string, data: any): Promise<DraftContent>
}

// Replace mock-ai-service.ts with real-ai-service.ts
```

### 2. Skills Service (`/services/skills/`)
**Current**: Static manifest.json loaded client-side
**Future**: API-loaded skills with dynamic invocation

```typescript
interface ISkillService {
  getManifest(): Promise<ISkillManifest>
  invoke(skillId: string, action: string, input: any): Promise<any>
}
```

### 3. Data Service (`/services/data/`)
**Current**: In-memory store with JSON fixtures
**Future**: REST/GraphQL API calls

```typescript
interface IDataService<T> {
  getAll(filters?: Filters): Promise<T[]>
  getById(id: string): Promise<T>
  create(data: Partial<T>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
}
```

### 4. Auth Service (`/services/auth/`)
**Current**: Role stored in React context
**Future**: Real auth (MSAL, Auth0, etc.)

## Integration Steps

1. **Create adapter interfaces** (already in `/types/`)
2. **Implement real adapters** in `/services/*/real-*.ts`
3. **Use environment flags** to switch implementations
4. **Add error handling** and retry logic
5. **Add loading states** (skeleton components ready)

## Non-Goals (Prototype Phase)

- Real backend API integration
- Real AI/LLM calls
- Authentication/authorization
- Data persistence
- Error recovery
- Performance optimization
- Full accessibility audit
- Mobile responsiveness
- Internationalization

## Production Checklist

- [ ] Replace mock AI service
- [ ] Replace mock data fixtures with API
- [ ] Implement real auth
- [ ] Add error boundaries
- [ ] Add analytics/telemetry
- [ ] Security review
- [ ] Performance audit
- [ ] Accessibility audit
