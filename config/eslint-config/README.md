# `@repo/eslint-config`

Configurações compartilhadas de ESLint para o monorepo.

## Presets disponíveis

- `@repo/eslint-config/api`
- `@repo/eslint-config/web`

## Uso nos apps

Exemplo (API):

```js
import { apiConfig } from '@repo/eslint-config/api';

export default apiConfig;
```

Exemplo (Web):

```js
import { webConfig } from '@repo/eslint-config/web';

export default webConfig;
```
