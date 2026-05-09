![alt text](<screenshots/Screenshot 2026-04-26 at 11.43.40.png>)
![alt text](<screenshots/Screenshot 2026-04-26 at 11.43.48.png>)
![alt text](<screenshots/Screenshot 2026-04-26 at 11.43.56.png>)
![alt text](<screenshots/Screenshot 2026-04-26 at 11.44.03.png>)
![alt text](<screenshots/Screenshot 2026-04-26 at 11.44.14.png>)
![alt text](<screenshots/Screenshot 2026-04-26 at 11.44.25.png>)
![alt text](<screenshots/Screenshot 2026-04-26 at 11.44.36.png>)

## RollingUpdate

Kubernetes поступово оновлює pod-и:

- створює нові
- видаляє старі
- робить це частинами

Керується:

```
maxUnavailable

maxSurge
```

### Переваги

✅ майже без downtime

✅ сервіс залишається доступним під час оновлення

✅ можна гнучко контролювати швидкість rollout

✅ найкращий варіант для production

⸻

### Недоліки

❌ старі й нові версії можуть працювати одночасно

❌ можуть бути проблеми, якщо версії несумісні між собою

❌ потребує більше ресурсів при великому maxSurge

## Recreate

Kubernetes:

1. видаляє всі старі pod-и
2. потім створює нові

```
old pods → deleted
↓
downtime
↓
new pods → created
```

### Переваги

✅ проста логіка

✅ ніколи немає одночасно старої та нової версії

✅ підходить, якщо версії не сумісні

⸻

### Недоліки

❌ downtime

❌ сервіс тимчасово недоступний

❌ погано для high-availability систем

## Основна відмінність

RollingUpdate — старі + нові pod-и деякий час працюють одночасно. Без downtime.

Recreate — спочатку всі старі видаляються, потім запускаються нові. Є downtime.

## Коли використовувати

### RollingUpdate

- веб-додатки
- API
- production сервіси
- коли потрібна безперервна доступність

### Recreate

- міграції
- legacy apps
- stateful apps
- коли дві версії не можуть працювати разом

RollingUpdate використовується значно частіше, а Recreate — більш рідкісний сценарій

## P.S. Include configmap to deployment

![alt text](<screenshots/Screenshot 2026-05-09 at 11.56.59-1.png>)
