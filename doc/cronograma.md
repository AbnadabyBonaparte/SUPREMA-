mano… ficou MUITO bom. teu “plano final definitivo” tá redondo, direto e dá pra colar do jeito que está.
pra elevar de 1000 → 1200, deixo só os **complementos cirúrgicos** abaixo — tudo plug-and-play, sem desfazer nada do que já está.

---

# 1) Complementos de alto impacto (sem atrito)

1. **Segurança de Front (prod-ready)**

   * **CSP forte** (script-src ‘self’ vercel *.supabase.co genai domains; img-src blob: data:; connect-src apis).
   * **Subresource Integrity (SRI)** para libs externas.
   * **Trusted Types** (se usar HTML dinâmico de IA).
   * **XSS/CSS Injection Guard** no render de respostas de IA (sanitize + whitelist).

2. **Rate limiting & Idempotência em Edge**

   * Limite por IP/email/device para `leads-create` e uploads.
   * **Idempotency-Key** no header (POST) para evitar duplicidade de cobranças/inscrições.
   * Bucket leaky + TTL (tabela `ratelimits` simples).

3. **Hardening Supabase**

   * **RLS deny-all** + policies nomeadas por caso de uso.
   * **Audit log** por trigger (quem/quando/antes/depois).
   * **Backups + PITR** documentados e teste de restore.
   * **Chaves rotativas** (service role) + permissão mínima.

4. **Auth & RBAC**

   * Perfis: `user`, `creator`, `admin`.
   * Guards de rota + **server-side check** nas Edge Functions.
   * MFA opcional e login por magic link/OTP.

5. **Observabilidade nível produção**

   * **Sentry** (front + edge) + source maps.
   * **OpenTelemetry** (traceId/correlationId) do front → Edge → Supabase.
   * **Synthetic checks** (uptime + fluxo checkout).
   * Alertas: p95 latência, taxa de erro, custo IA por sessão.

6. **Qualidade contínua**

   * **Playwright** para E2E dos 3 fluxos críticos (lead→pago, login→checkout, IA chat).
   * **Bundle Analyzer** + **performance budget** (LCP/TBT) nos PRs.
   * **Renovate** (+ lockfile maintenance) e **CODEOWNERS** por áreas.
   * **Conventional Changelog** e **release notes** automáticas.

7. **Privacidade & LGPD**

   * Mapa de dados pessoais (onde entram/onde saem).
   * **Retenção & minimização** (job results expiram).
   * DPA/ToS/Privacy Policy simples (público).
   * Flag de **opt-in** pra analytics.

8. **Custo & FinOps**

   * Métrica “**custo por sessão IA**” e “**custo por lead pago**”.
   * Cache agressivo p/ prompts repetidos + **quota por user**.
   * Relatórios semanais (CI agenda) com gasto/rota top.

9. **CDN & mídia**

   * Transformações de imagem (Vercel/Cloudflare) + formatos modernos.
   * Upload direto pro Supabase Storage com políticas de leitura.

10. **UX Pro**

* A11y: foco visível, aria nos componentes shadcn, contrastes.
* i18n ready (en/pt) + strings centralizadas.
* Empty states + microcopy de erro da IA (amistoso e orientado a ação).

---

# 2) PRs adicionais (11 → 16) que fecham a tampa

| #  | Título (conventional + emoji)                             | O que entra                          | Impacto                     |
| -- | --------------------------------------------------------- | ------------------------------------ | --------------------------- |
| 11 | `feat(security): CSP + SRI + sanitize IA + TrustedTypes`  | headers, sanitizer, config Vercel    | XSS/CSR blindagem           |
| 12 | `feat(ratelimit): Idempotency-Key + buckets por endpoint` | tabela `ratelimits`, middleware Edge | anti-abuso & anti-duplicata |
| 13 | `feat(auth-rbac): roles + guards + MFA opcional`          | claims no token, guards server/edge  | segurança e controle        |
| 14 | `feat(obs-pro): Sentry + OTEL + synthetic checks`         | sentry/otel, monitoramento           | debugar e alertar cedo      |
| 15 | `test(e2e): Playwright fluxos críticos`                   | 3 specs end-to-end                   | confiança real de release   |
| 16 | `chore/devex: Renovate + CODEOWNERS + changelog`          | governança e releases                | manutenção previsível       |

> Mantém teus 10 PRs originais intactos. Esses 6 entram logo depois ou em paralelo (11–16).

---

# 3) Checklists incrementais (coláveis)

**CSP (vercel.json)**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://*.supabase.co https://generativelanguage.googleapis.com; frame-ancestors 'none'; base-uri 'self'" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

**Edge middleware (idempotência + rate-limit esqueleto)**

```ts
// /functions/_shared/guard.ts
export function idempotencyKey(req: Request) {
  const key = req.headers.get("Idempotency-Key");
  if (!key) return { ok:false, status:400, msg:"Idempotency-Key missing" };
  return { ok:true, key };
}
// use bucket table (ip+route+ttl); se exceder → 429
```

**Policy Supabase (modelo)**

```sql
-- deny all por padrão; exemplo de select mínimo
create policy "public_read_leads" on leads
for select to anon using (true);

-- inserts apenas via função service role (nenhuma policy de insert p/ anon/authed)
```

**Playwright smoke (exemplo)**

```ts
test('lead→checkout', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /começar/i }).click();
  await page.getByLabel(/email/i).fill('qa@example.com');
  await page.getByRole('button', { name: /enviar/i }).click();
  await expect(page.getByText(/link de pagamento enviado/i)).toBeVisible();
});
```

---

# 4) Perguntas “laser” pro CONEX/SONEX (só se quiser granulação máxima)

Não precisamos perguntar nada pra executar teus 10 PRs.
Se quiser **fechar lacunas** dos PRs 11–16, manda só essas 6 respostas rápidas:

1. **Auth**: precisamos de `admin/creator/user` já ou fica para v2?
2. **Stripe**: price IDs e produtos já criados? (se sim, me passa 2 IDs p/ testes)
3. **CSP**: há domínios externos além de Supabase e Google GenAI que o app consome?
4. **Sentry/Monitoring**: qual org DSN usar? (se não tiver, eu coloco placeholder e var ENV)
5. **LGPD**: prazo de retenção para `ai_jobs` e logs? (ex.: 7/30/90 dias)
6. **Idiomas**: manter pt-BR por enquanto ou já preparar en-US?

---

## Minha recomendação final

* **Segue com teus 10 PRs** na ordem que você definiu (perfeita).
* **Emparalha 11–16** conforme o time: segurança (11–12) vem logo após PR-4 e PR-5; E2E (15) após PR-7/8.
* Quer que eu **gere agora o PR-1 (router)** e o **PR-2 (env)** completos (arquivos, diffs, commits, descrição, QA)?
  É só dizer “manda o PR-1 e PR-2 completos” que eu já te entrego prontinho pra commitar.
